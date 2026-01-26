"use client";

import { useState } from "react";

export default function VoiceRecognition() {
  const [text, setText] = useState("");

  const SpeechRecognition =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  let recognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
  }

  const startListening = () => {
    if (!recognition) {
      alert("Voice Recognition supported nahi hai");
      return;
    }

    recognition.start();

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };
  };

  return (
    <div>
      <button onClick={startListening}>
        🎤 Speak
      </button>

      <p>{text}</p>
    </div>
  );
}
