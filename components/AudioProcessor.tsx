// components/AudioProcessor.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { startMeeting, updateTranscript } from '@/lib/api';

export function AudioProcessor({
  onMeetingStart,
  isExtensionActive
}: {
  onMeetingStart: (id: string) => void;
  isExtensionActive: boolean;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [meetingId, setMeetingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isExtensionActive) {
      stopRecording();
    }
  }, [isExtensionActive]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const meeting = await startMeeting();
      setMeetingId(meeting.id);
      onMeetingStart(meeting.id);

      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = async (event) => {
        if (event.data.size > 0 && meetingId) {
          await updateTranscript(meetingId, event.data);
        }
      };

      mediaRecorder.current.start(10000); // Capture every 10 seconds
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  }

  function stopRecording() {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={!isExtensionActive}
        className={`px-4 py-2 rounded ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}