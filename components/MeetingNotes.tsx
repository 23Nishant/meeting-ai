// components/MeetingNotes.tsx
'use client';

import { useEffect, useState } from 'react';
import { getTranscript } from '@/lib/api';

export function MeetingNotes({ meetingId }: { meetingId: string | null }) {
  const [transcript, setTranscript] = useState<string>('');

  useEffect(() => {
    if (!meetingId) return;

    const fetchTranscript = async () => {
      const data = await getTranscript(meetingId);
      setTranscript(data.transcript);
    };

    fetchTranscript();
    const interval = setInterval(fetchTranscript, 5000);
    return () => clearInterval(interval);
  }, [meetingId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold mb-4">Meeting Notes</h2>
      <div className="whitespace-pre-wrap">{transcript}</div>
    </div>
  );
}