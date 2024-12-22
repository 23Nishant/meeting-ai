// app/api/transcript/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { prisma } from '../../../../lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioBlob = formData.get('audio') as Blob;
    const meetingId = formData.get('meetingId') as string;

    const transcription = await openai.audio.transcriptions.create({
      file: audioBlob,
      model: "whisper-1",
    });

    const transcript = await prisma.transcript.create({
      data: {
        meetingId,
        text: transcription.text
      }
    });

    return NextResponse.json(transcript);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process audio' }, { status: 500 });
  }
}
