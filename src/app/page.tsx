'use client';

import { useEffect, useState } from 'react';
import { AudioProcessor } from '@/components/AudioProcessor';
import { MeetingNotes } from '@/components/MeetingNotes';
import { QuestionAnswer } from '@/components/QuestionAnswer';
import { ExtensionCheck } from '@/components/ExtensionCheck';

export default function Home() {
  const [isExtensionActive, setIsExtensionActive] = useState(false);
  const [currentMeetingId, setCurrentMeetingId] = useState<string | null>(null);

  return (
    <main className="min-h-screen p-8">
      <ExtensionCheck onExtensionStatus={setIsExtensionActive} />
      
      {!isExtensionActive && (
        <div className="bg-yellow-100 p-4 rounded-md mb-4">
          Please enable the Hologram extension to continue
        </div>
      )}

      {isExtensionActive && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <AudioProcessor 
              onMeetingStart={setCurrentMeetingId} 
              isExtensionActive={isExtensionActive} 
            />
            <MeetingNotes meetingId={currentMeetingId} />
          </div>
          <div>
            <QuestionAnswer meetingId={currentMeetingId} />
          </div>
        </div>
      )}
    </main>
  );
}