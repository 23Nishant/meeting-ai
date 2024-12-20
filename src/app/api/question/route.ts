// app/api/question/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
  try {
    const { meetingId, question } = await req.json();

    const transcripts = await prisma.transcript.findMany({
      where: { meetingId },
      orderBy: { timestamp: 'asc' }
    });

    const fullTranscript = transcripts.map(t => t.text).join(' ');

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a helpful meeting assistant. Answer questions based on the meeting transcript provided."
        },
        {
          role: "user",
          content: `Meeting transcript: ${fullTranscript}\n\nQuestion: ${question}`
        }
      ]
    });

    const answer = completion.choices[0].message.content;

    const savedQuestion = await prisma.question.create({
      data: {
        meetingId,
        question,
        answer
      }
    });

    return NextResponse.json(savedQuestion);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process question' }, { status: 500 });
  }
}