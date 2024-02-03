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
    <div className="bg-cyan_blue h-fit w-full relative rounded-sm">
      <h3
        onClick={toggleItem}
        className={`relative font-pixel p-2 text-tan text-left hover:bg-pink decoration-blue transition ease-in-out flex justify-between items-center hover:cursor-pointer ${showItem && "bg-pink"}`}
      >
        {question}
        <svg
          className={`transform fill-white transition-transform ${showItem && " rotate-180 "} opacity-50 cursor-pointer select-none flex-shrink-0`}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </h3>
      {showItem && <p className={`text-crate_brown bg-navbar_background p-4 transition ease-in-out delay-150 ${showItem && " bg-caramel_brown "}`}>{answer}</p>}
    </div>
  );
}

function FAQ() {
  return (
    <section className="flex flex-col md:flex-row m-2 justify-center items-center pt-36 w-full" id="faq">
      <article className="space-y-2 w-full p-2 rounded-pixel max-w-[900px]">
        <h1 className="text-center font-console font-bold text-4xl text-crate_brown mb-6">FAQs</h1>
        <FAQItem
          question="What is a hackathon?"
          answer="A hackathon is a weekend-long event where students come together to learn the latest technologies, build innovative projects, and network with top companies. ShellHacks is the largest hackathon in Florida, bringing thousands of students from around the world together since 2017!"
        />
        <FAQItem
          question="When and where is ShellHacks?"
          answer="ShellHacks takes place from September 15th through the 17th at the Kovens Conference Center, located at Florida International University’s Biscayne Bay Campus in North Miami, Florida."
        />
        <FAQItem
          question="Is ShellHacks in-person or virtual?"
          answer="ShellHacks will be in person only this year due to MLH’s guidance on event modality for events in the 2023-2024 hackathon season. We look forward to hosting you on-site for an exciting and immersive experience!"
        />
        <FAQItem
          question="How long is ShellHacks?"
          answer="ShellHacks is a 36-hour hackathon, beginning at 4pm on Friday and ending at 3pm on Sunday. Throughout this time, you can expect key events such as our opening and closing ceremonies, career fair, and judging, as well as a variety of workshops, activities, meals, and snacks. Hacking (project-building) time begins at 10pm on Friday and ends at 8am on Sunday. We encourage you to work on a project for as long as you can during this time!"
        />
        <FAQItem
          question="Who can participate?"
          answer="Students and recent graduates (up to a year) from any college, university, or coding bootcamp can participate in ShellHacks. Not a student? You can participate as a mentor or volunteer and join the experience! Mentor and volunteer applications are coming soon!"
        />
        <FAQItem
          question="How much experience do I need to participate?"
          answer="None! We welcome students from all academic backgrounds and skill levels, and provide an inclusive environment for anyone to learn, build, and network. Whether you’ve never coded before or live and breathe AI/ML, there’s a place for you at ShellHacks! In fact, about half of our attendees every year are first-time hackers. If you fall in this group, we’ll have introductory workshops for you to learn technical skills, resources and tools to help you build a project, and industry mentors to guide you every step of the way. No matter where you are on your journey, don’t be afraid to take a detour and explore the world of tech with us - you won’t regret it!"
        />
        <FAQItem
          question="Do I need a team to work on a project?"
          answer="Not at all! You can choose to work on a solo project, or team up with up to three friends (four members total) or fellow students at the event. If you’re looking for a team, we’ll have a team-building activity as soon as hacking begins Friday evening to connect you with other solo hackers!"
        />
        <FAQItem
          question="Will food be provided?"
          answer="Yes! Food will be served daily to everyone attending ShellHacks from Friday evening to Sunday afternoon. We'll also have coffee, energy drinks, tea, and other beverages available to keep you energized!"
        />
        <FAQItem
          question="Will there be a place to sleep?"
          answer="The Kovens Conference Center will remain open for the entire event, allowing you to sleep over and not miss any of the action! We encourage you to stay for as long as possible so that you have enough time to work on your project and take advantage of all the workshops, meals, activities, and more. We recommend bringing something to sleep on such as a sleeping bag, air mattress, or inflatable pool floatie (yes we said pool floatie!). Don’t forget to also bring essentials such as a laptop, charger, headphones, blanket, and toiletries to keep you refreshed over the weekend."
        />
        <FAQItem
          question="Will transportation be provided?"
          answer="If you’re an FIU student there will be buses transporting students from MMC to BBC on Friday and from BBC to MMC on Sunday. If you’re a student at a college/university in Florida, ShellHacks will provide buses if enough students from your school sign up. Help us help you by telling your friends and classmates to sign up, so we can hopefully have a bus for your school!"
        />
        <FAQItem
          question="How much does it cost?"
          answer="Nothing! That’s right, ShellHacks is completely free for all students accepted to the event. We provide everything you need to help you focus on learning the latest technologies, building innovative projects, and networking with top companies- all thanks to the generous donations from our sponsors!"
        />
        <FAQItem question="How can I become a sponsor?" answer="Please reach out to our team at fiu@weareinit.org and we’ll get back to you promptly!" />
        <FAQItem
          question={`Why "ShellHacks"?`}
          answer="Well, it started off as a joke about what a turtle-themed hackathon would be called. Later on, we actually started thinking about organizing a hackathon, but instead of turtles, we decided to focus on diversity in Miami. Since the city has an abundance of seashells on its beaches, the name stuck! It's also a play on words about computer shells, but that’s just to draw attention away from all the turtle puns."
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
