"use client";

import React, { useEffect, useRef, useState } from "react";

const AudioRecorderWithCircle = () => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [volume, setVolume] = useState(0);

  const startRecording = async () => {
    setAudioUrl(null);
    setIsRecording(true);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    microphoneRef.current =
      audioContextRef.current.createMediaStreamSource(stream);
    microphoneRef.current.connect(analyserRef.current);

    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.start();
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };

    visualize();
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
    microphoneRef.current.disconnect();
    analyserRef.current.disconnect();
    audioContextRef.current.close();
    cancelAnimationFrame(animationRef.current);
    setVolume(0);
  };

  const visualize = () => {
    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const calculateVolume = () => {
      analyser.getByteFrequencyData(dataArray);
      let values = 0;
      const length = dataArray.length;
      for (let i = 0; i < length; i++) {
        values += dataArray[i];
      }
      const average = values / length;
      setVolume(average);
      animationRef.current = requestAnimationFrame(calculateVolume);
    };

    calculateVolume();
  };

  useEffect(() => {
    return () => {
      if (isRecording) stopRecording();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded-lg text-white ${
          isRecording ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {isRecording && (
        <div
          className="bg-green-400 rounded-full transition-transform duration-100 ease-linear"
          style={{
            width: 40 + volume + "px",
            height: 40 + volume + "px",
            opacity: 0.8,
          }}
        />
      )}

      {audioUrl && (
        <audio controls src={audioUrl} className="mt-4">
          Your browser doesn't support audio playback.
        </audio>
      )}
    </div>
  );
};

export default AudioRecorderWithCircle;
