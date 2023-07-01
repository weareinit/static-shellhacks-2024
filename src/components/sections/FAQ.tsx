import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="bg-white p-2 rounded-pixel h-fit max-w-[600px]">
      <h3
        onClick={() => {
          setShowItem((prev) => !prev);
        }}
        className="font-inter font-bold text-lg decoration-blue hover:underline hover:cursor-pointer"
      >
        {question}
      </h3>
      {showItem && <p className="font-inter">{answer}</p>}
    </div>
  );
}

function FAQ() {
  return (
    <section className="flex flex-col md:flex-row m-2 p-4 max-w-[600px] lg:max-w-[900px] w-full">
      <article className="space-y-2 w-full">
        <h2 className=" font-pixel text-2xl text-deep_blue mb-2">FAQ</h2>
        <FAQItem question="What is a hackathon?" answer="A hackathon is a weekend-long event where students come together to learn the latest technologies and build innovatitve projects." />
        <FAQItem
          question="How long is it?"
          answer="ShellHacks is a 36-hour hackathon, beginning at 4pm on Friday and ending at 3pm on Sunday. We encourage you to work on your project for as long as you can during this time."
        />
        <FAQItem
          question="Who can come?"
          answer="If you're currently a college student or have graduated in the past year, you're mroe than welcome to attend! Not a student? No problem! You can attend as a mentor and help our students! Mentor applications will be available soon!"
        />
        <FAQItem
          question="Will there be any transportation aid provided?"
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
    </section>
  );
}

export default FAQ;
