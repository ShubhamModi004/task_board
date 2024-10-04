import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, status, assignee, priority, tags, project } = req.body;
    try {
      const task = await prisma.task.create({
        data: {
          title,
          description,
          status,
          assignee,
          priority,
          tags,
          project,
        },
      });

      res.status(200).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Error creating task' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
