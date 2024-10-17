import openaiClient from '@/utils/openAi';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const chatCompletion = await openaiClient.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-3.5-turbo',
          });
        res.status(200).json(chatCompletion)
    }catch(e){
        res.status(400).json(e)
    }   
   
}