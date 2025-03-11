import Input from "@/components/shared/input";
import React from "react";

export default function Home() {
  return (
    <>
      <section className="h-[300vh]  scrollbar-hidden">
        <div className="container">
          <h1 className="text-7xl font-semibold text-primary w-full shadow-primary"></h1>
          <Input
            label="First Name"
            placeholder="Enter your name"
            errorMessage={10}
            type="date"
          />
        </div>
      </section>
    </>
  );
}
