'use client';

import { Mic } from 'lucide-react';
import { useState } from 'react';

export default function VoiceRecognition({ onResult }) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  return (
    <button
      onClick={startListening}
      className={`p-2 rounded-full ${
        listening
          ? 'bg-red-500 text-white'
          : 'bg-blue-100 text-blue-600'
      }`}
      title="Speak"
    >
      <Mic className="w-4 h-4" />
    </button>
  );
}
