// components/QuestionAnswer.tsx
'use client';

import { useState } from 'react';
import { askQuestion } from '@/lib/api';

export function QuestionAnswer({ meetingId }: { meetingId: string | null }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!meetingId || !question) return;

    setIsLoading(true);
    try {
      const response = await askQuestion(meetingId, question);
      setAnswer(response.answer);
    } catch (error) {
      console.error('Failed to get answer:', error);
    }
    setIsLoading(false);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Ask Questions</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Ask a question about the meeting..."
        />
        <button
          type="submit"
          disabled={!meetingId || isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Loading...' : 'Ask'}
        </button>
      </form>
      {answer && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h3 className="font-bold mb-2">Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}