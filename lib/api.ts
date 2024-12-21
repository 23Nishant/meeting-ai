// lib/api.ts
export async function startMeeting() {
    const response = await fetch('/api/meeting', {
      method: 'POST'
    });
    return response.json();
  }
  
  export async function updateTranscript(meetingId: string, audioBlob: Blob) {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('meetingId', meetingId);
  
    const response = await fetch('/api/transcript', {
      method: 'POST',
      body: formData
    });
    return response.json();
  }
  
  export async function getTranscript(meetingId: string) {
    const response = await fetch(`/api/transcript?meetingId=${meetingId}`);
    return response.json();
  }
  
  export async function askQuestion(meetingId: string, question: string) {
    const response = await fetch('/api/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ meetingId, question })
    });
    return response.json();
  }