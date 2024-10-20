import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if the request is a GET request
    if (req.method === 'GET') {
      // Fetch tasks from the database
      const tasks = await prisma.task.findMany({
        select: {
          id: true,  
          title: true,
          description: true,
          status: true,
          assignee: true,
          priority: true,
          tags: true,
          project: true,
          createdAt: true,  
        },
      });

      res.status(200).json(tasks);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Unable to fetch tasks" });
  } finally {
    await prisma.$disconnect();  
  }
}