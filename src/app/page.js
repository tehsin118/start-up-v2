import React from "react";
import AudioRecorderWithWave from "./components/input";
import AudioRecorderWithCircle from "./components/audioRecorderWithCircle";

export default function Home() {
  return (
    <>
      <section className="h-[300vh] bg-red-300 scrollbar-hidden">
        <div className="container">
          <h1 className="text-7xl font-semibold text-primary bg-green-300 w-full shadow-primary">
            Hello
          </h1>
          <AudioRecorderWithWave />
          <AudioRecorderWithCircle />
        </div>
      </section>
    </>
  );
}
