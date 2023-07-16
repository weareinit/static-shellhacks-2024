import React, { useState } from "react";
import FillImage from "../FillImage";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [showItem, setShowItem] = useState(false);

  const toggleItem = () => {
    setShowItem((prev) => !prev);
  };

  return (
    <div className="rounded-pixel bg-cyan_blue h-fit w-full relative">
      <h3
        onClick={toggleItem}
        className={`p-2 font-console text-tan text-center hover:text-pink md:text-2xl decoration-blue transition ease-in-out hover:cursor-pointer ${showItem ? "bg-pink hover:text-tan" : ""}`}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <span>{question}</span>
        {/* <svg className={`transform fill-pink transition-transform ${showItem ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg> */}
      </h3>
      {showItem && <p className="font-inter bg-navbar_background p-4 transition ease-in-out delay-150">{answer}</p>}
    </div>
  ); 
}  

function FAQ() {
  return (
    <section className="flex flex-col md:flex-row m-2 p-4 w-full justify-center items-center min-h-screen">
      <article className="space-y-2 w-full p-2 rounded-pixel max-w-[900px]">
        <h2 className="text-center font-console font-bold text-4xl lg:text-5xl text-crate_brown mb-2">FAQs</h2>
        <FAQItem question="What is a hackathon?" answer="A hackathon is a weekend-long event where students come together to learn the latest technologies and build innovatitve projects." />
        <FAQItem
          question="How long is it?"
          answer="ShellHacks is a 36-hour hackathon, beginning at 4pm on Friday and ending at 3pm on Sunday. We encourage you to work on your project for as long as you can during this time."
        />
        <FAQItem
          question="Who can come?"
          answer="If you're currently a college student or have graduated in the past year, you're more than welcome to attend! Not a student? No problem! You can attend as a mentor and help our students! Mentor applications will be available soon!"
        />
        <FAQItem
          question="Will there be transportation aid provided?"
          answer="If you are an FIU students there will be busses transporting hackers from MMC to BBC throughout the weekend. If you are a student at a university/college in Florida, ShellHacks will send busses to those schools if sign ups and confirmations are significantly high, so tell your friends and classmates to sign up to hopefully have shuttles go to your school."
        />
        <FAQItem
          question="How much experience do I need?"
          answer="None! We welcome students from all academic backgrounds and skill levels, so don’t be afraid to come and join us! We’ll have introductory workshops for you to learn new skills, industry mentors to help you out, and great tools to build your projects. Whether you’ve never coded before or have lots of experience, there’s a place for you at ShellHacks!"
        />
        <FAQItem
          question="Do I need to have a group?"
          answer="Not at all! You can be a lone wolf, come with a team (no more than four people), or join some teams at ShellHacks. We’ll also have team building activities to help you find the right teammates!"
        />
        <FAQItem
          question="How much does it cost?"
          answer="Nothing! That’s right, ShellHacks is entirely free (even the food!) for all attendees to participate. All you need to worry about is learning new skills, developing cool projects, and having fun!"
        />
      </article>
      {/* <div className="relative min-w-[300px] m-2">
        <FillImage src="/assets/hackers_pic.jpeg" alt="Image of hackers at ShellHacks 2023 waiting for the hackathon to start." className=" w-92 h-52 rounded-pixel top-0 left-0" />
        <FillImage src="/assets/hackers_pic.jpeg" alt="Image of hackers at ShellHacks 2023 waiting for the hackathon to start." className=" w-64 h-52 rounded-pixel top-0 left-0" />
      </div> */}
    </section>
  );
}

export default FAQ;
