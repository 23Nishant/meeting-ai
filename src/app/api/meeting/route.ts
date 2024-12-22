import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST() {
  try {
    const meeting = await prisma.meeting.create({
      data: {
        title: `Meeting ${new Date().toLocaleString()}`
      }
    });
    return NextResponse.json(meeting);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create meeting' }, { status: 500 });
  }
}
