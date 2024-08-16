// src/components/SpeechToText.js
import React, { useState, useEffect } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.onresult = (event) => {
        const newTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(newTranscript);
      };
      setRecognition(recognitionInstance);
    } else {
      console.warn('SpeechRecognition API not supported');
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div>
      <h1>Speech to Text</h1>
      <button onClick={startListening} type="button">Start</button>
      <button onClick={stopListening} type="button">Stop</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechToText;
