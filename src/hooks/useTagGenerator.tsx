import { useState, useCallback, useEffect } from "react";
import { OpenAI } from "openai";
import { debounce } from "lodash";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const useTagGenerator = (
  taskTitle: string,
  taskDescription: string,
  delay: number = 2000
) => {
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounced function that only runs after user stops typing for the delay period
  const generateTags = useCallback(
    debounce(async (title: string, description: string) => {
      if (!title || !description || title == "Task Title") return;

      const prompt = `
      Generate a list of max up to 2 and minimum 1 concise and relevant one word tags with First character as Capital (as keywords) based on the following task details: 
      Title: ${title}
      Description: ${description}
      The task is related to building software products such as websites or mobile applications. Tags should be close to Blocked, Customer Request, Tech Debt, Frontend, Backend, QA, UI, Pending.
      Ensure the tags are highly relevant to software development processes, project management, and product building.
    `;

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        });

        const tags = response.choices[0]?.message?.content || "";
        const formattedTags = tags
          .split(",")
          .map((tag) => tag.trim())
        setGeneratedTags(formattedTags);
      } catch (error) {
        console.error("Error generating tags:", error);
      } finally {
        setLoading(false);
      }
    }, delay),
    [delay]
  );

  useEffect(() => {
    if (taskTitle && taskDescription) {
      setLoading(true);
      generateTags.cancel();
      generateTags(taskTitle, taskDescription);
    }
    return () => {
      generateTags.cancel();
    };
  }, [taskTitle, taskDescription, generateTags]);

  return { generatedTags, loading };
};
