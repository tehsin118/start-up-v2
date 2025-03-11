import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import React from "react";

export default function Home() {
  return (
    <>
      <section className="h-[300vh]  scrollbar-hidden">
        <div className="container">
          <Input
            label="First Name"
            placeholder="Enter your name"
            errorMessage={10}
            type="date"
          />
          <Button text="red" className="hover:bg-red-200" />
        </div>
      </section>
    </>
  );
}
