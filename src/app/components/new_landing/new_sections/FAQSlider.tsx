import Question from "./Question";

const FAQSlider = () => {
  const raw_faqs = `What is a hackathon?A hackathon is a weekend-long event where students come together to learn the latest technologies, build innovative projects, and network with top companies. ShellHacks is the largest hackathon in Florida, bringing thousands of students from around the world together since 2017!
  When and where is ShellHacks?ShellHacks takes place from September 15th through the 17th at the Kovens Conference Center, located at Florida International University's Biscayne Bay Campus in North Miami, Florida.
  Is ShellHacks in-person or virtual?ShellHacks will be in person only this year due to MLH's guidance on event modality for events in the 2023-2024 hackathon season. We look forward to hosting you on-site for an exciting and immersive experience!
  How long is ShellHacks?ShellHacks is a 36-hour hackathon, beginning at 4pm on Friday and ending at 3pm on Sunday. Throughout this time, you can expect key events such as our opening and closing ceremonies, career fair, and judging, as well as a variety of workshops, activities, meals, and snacks. Hacking (project-building) time begins at 10pm on Friday and ends at 8am on Sunday. We encourage you to work on a project for as long as you can during this time!
  Who can participate?Students and recent graduates (up to a year) from any college, university, or coding bootcamp can participate in ShellHacks. Not a student? You can participate as a mentor or volunteer and join the experience! Mentor and volunteer applications are coming soon!
  How much experience do I need to participate?None! We welcome students from all academic backgrounds and skill levels, and provide an inclusive environment for anyone to learn, build, and network. Whether you've never coded before or live and breathe AI/ML, there's a place for you at ShellHacks! In fact, about half of our attendees every year are first-time hackers. If you fall in this group, we'll have introductory workshops for you to learn technical skills, resources and tools to help you build a project, and industry mentors to guide you every step of the way. No matter where you are on your journey, don't be afraid to take a detour and explore the world of tech with us - you won't regret it!
  Do I need a team to work on a project?Not at all! You can choose to work on a solo project, or team up with up to three friends (four members total) or fellow students at the event. If you're looking for a team, we'll have a team-building activity as soon as hacking begins Friday evening to connect you with other solo hackers!
  Will food be provided?Yes! Food will be served daily to everyone attending ShellHacks from Friday evening to Sunday afternoon. We'll also have coffee, energy drinks, tea, and other beverages available to keep you energized!
  Will there be a place to sleep?The Kovens Conference Center will remain open for the entire event, allowing you to sleep over and not miss any of the action! We encourage you to stay for as long as possible so that you have enough time to work on your project and take advantage of all the workshops, meals, activities, and more. We recommend bringing something to sleep on such as a sleeping bag, air mattress, or inflatable pool floatie (yes we said pool floatie!). Don't forget to also bring essentials such as a laptop, charger, headphones, blanket, and toiletries to keep you refreshed over the weekend.
  Will transportation be provided?If you're an FIU student there will be buses transporting students from MMC to BBC on Friday and from BBC to MMC on Sunday. If you're a student at a college/university in Florida, ShellHacks will provide buses if enough students from your school sign up. Help us help you by telling your friends and classmates to sign up, so we can hopefully have a bus for your school!
  How much does it cost?Nothing! That's right, ShellHacks is completely free for all students accepted to the event. We provide everything you need to help you focus on learning the latest technologies, building innovative projects, and networking with top companies- all thanks to the generous donations from our sponsors!
  How can I become a sponsor?Please reach out to our team at fiu@weareinit.org and we'll get back to you promptly!
  Why "ShellHacks"?Well, it started off as a joke about what a turtle-themed hackathon would be called. Later on, we actually started thinking about organizing a hackathon, but instead of turtles, we decided to focus on diversity in Miami. Since the city has an abundance of seashells on its beaches, the name stuck! It's also a play on words about computer shells, but that's just to draw attention away from all the turtle puns.`;

  const faqs = raw_faqs.split("\n").map((line) => {
    const [Q = "", ...rest] = line.split("?");
    const A = rest.join("?");
    return { Q, A };
  });

  return (
    <div className="scrollbar-hide z-10 mx-auto mb-16 flex max-h-full w-4/5 justify-center gap-2 overflow-hidden rounded-xl bg-light_brown">
      {/* <div className="mb-2 ml-5 mr-3   mt-2 grid w-full gap-10 overflow-y-auto pl-5 pr-10 md:grid-cols-2">
        {faqs.map((faq, index) => (
          <Question key={index} Q={faq.Q} A={faq.A} />
        ))}
      </div> */}
      <div className="ml-5 mr-3 mt-2 flex flex-wrap justify-between overflow-y-auto">
        <div className="w-full space-y-4 pr-2 md:w-1/2">
          {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
            <Question key={index} Q={faq.Q} A={faq.A} />
          ))}
        </div>
        <div className="w-full space-y-4 md:w-1/2">
          {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
            <Question key={index} Q={faq.Q} A={faq.A} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSlider;
