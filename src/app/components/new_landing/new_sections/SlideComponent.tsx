import Image from "next/image";

interface SlideProps {
  title: string;
}
const SlideComponent: React.FC<SlideProps> = ({ title }) => {
  const AboutUsComponent = () => (
    <div>
      <div className="xxl:py-6 xxl:text-[80px] flex justify-center py-3 font-zoonaji text-[60px] text-white">
        About Us
      </div>
      <div className="xxl:gap-10 grid h-full grid-cols-1 justify-center gap-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="pb-full relative col-span-1 md:col-span-1 lg:col-span-2">
          <Image
            priority
            src={"/images/hackers_pic.jpg"}
            objectFit="cover"
            layout="fill"
            alt="hackers"
            className="absolute left-0 top-0 h-full w-full rounded-lg"
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <h3 className=" xxl:text-[30px] font-museo text-[20px] text-white">
            {`
    Ready to immerse yourself in the ultimate tech experience? Join us
    for ShellHacks, Florida&apos;s Largest Hackathon! Over 1,000 students
    from across the state and around the world will come together to: \n`}
          </h3>
          <ul className="xxl:pl-8 xxl:text-[30px] list-disc pl-4 font-museo text-[20px] text-white">
            <li>Build: Develop innovative projects</li>
            <li>Network: Network with top companies, and more!</li>
            <li>
              Learn: Learn the latest technologies Develop new skills by
              attending our technical workshops.
            </li>
          </ul>
          <h3 className="xxl:text-[30px] font-museo text-[20px] text-white">
            Gain experience by building hands-on projects with fellow students.
            Land your next internship or job by meeting recruiters at our career
            fair. Win amazing prizes, participate in fun activities, get tons of
            cool swag, enjoy great food, and much more - all at ShellHacks!
          </h3>
        </div>
      </div>
    </div>
  );

  const ProjectsComponent = () => (
    <div>
      <div className="xxl:py-6 xxl:text-[80px] flex justify-center py-3 font-zoonaji text-[60px] text-white">
        Projects
      </div>
      <div className="xxl:gap-10 grid h-full grid-cols-1 justify-center md:grid-cols-2 md:gap-6 lg:grid-cols-5 lg:gap-8">
        <div className="pb-full relative col-span-1 md:col-span-1 lg:col-span-2">
          <Image
            priority
            src={"/images/hackers_pic_3.jpg"}
            objectFit="cover"
            layout="fill"
            alt="hackers"
            className="absolute left-0 top-0 h-full w-full rounded-lg"
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <h3 className="xxl:text-[30px] font-museo  text-[20px] text-white">
            Get ready to unleash your creativity! At ShellHacks, you&apos;ll
            have access to a range of tools, resources, and mentors to help you
            develop and refine your project. You&apos;ll be able to collaborate
            with other students and learn new skills as you work towards a
            shared goal.
          </h3>
          <br />
          <h3 className="xxl:text-[30px] font-museo  text-[20px] text-white">
            Build your project using any technology you like! Whether
            you&apos;re interested in web development, AI/ML, hardware, or
            anything in between, there’s always something to create. As you work
            hard, you&apos;ll have the opportunity to showcase your creativity,
            problem-solving skills, and technical knowledge to top companies
            looking to hire talented students!
          </h3>
        </div>
      </div>
    </div>
  );
  const WorkshopsComponent = () => (
    <div>
      <div className="xxl:py-6 xxl:text-[80px] flex justify-center py-3 font-zoonaji text-[60px] text-white">
        Workshops
      </div>
      <div className="xxl:gap-10 grid h-full grid-cols-1 justify-center gap-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="pb-full relative col-span-1 md:col-span-1 lg:col-span-2">
          <Image
            priority
            src={"/images/hackers_pic.jpg"}
            objectFit="cover"
            layout="fill"
            alt="hackers"
            className="absolute left-0 top-0 h-full w-full rounded-lg"
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <h3 className="xxl:text-[30px] font-museo text-[20px] text-white">
            Ready to immerse yourself in the ultimate tech experience? Join us
            for ShellHacks, Florida&aposs Largest Hackathon! Over 1,000 students
            from across the state and around the world will come together to:
          </h3>
          <ul className="xxl:pl-8 xxl:text-[30px] list-disc pl-4 font-museo text-[20px] text-white">
            <li>Build: Develop innovative projects</li>
            <li>Network: Network with top companies, and more!</li>
            <li>
              Learn: Learn the latest technologies Develop new skills by
              attending our technical workshops.
            </li>
          </ul>
          <h3 className="xxl:text-[30px] font-museo  text-[20px] text-white">
            Gain experience by building hands-on projects with fellow students.
            Land your next internship or job by meeting recruiters at our career
            fair. Win amazing prizes, participate in fun activities, get tons of
            cool swag, enjoy great food, and much more - all at ShellHacks!
          </h3>
        </div>
      </div>
    </div>
  );
  const CareerFairComponent = () => (
    <div>
      <div className="xxl:py-6 xxl:text-[80px] flex justify-center py-3 font-zoonaji text-[60px] text-white">
        Career Fair
      </div>
      <div className="xxl:gap-10 grid h-full grid-cols-1 justify-center gap-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="pb-full relative col-span-1 md:col-span-1 lg:col-span-2">
          <Image
            priority
            src={"/images/networking.jpg"}
            objectFit="cover"
            layout="fill"
            alt="hackers"
            className="absolute left-0 top-0 h-full w-full rounded-lg"
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <h3 className="xxl:text-[30px] font-museo  text-[20px] text-white">
            Looking for your next internship or job opportunity? Our career fair
            is the perfect place for you to connect with recruiters and
            professionals from leading tech companies! You&apos;ll have the
            chance to learn about each company’s culture, interview process, and
            open internship and job opportunities.
          </h3>
          <br />
          <h3 className="xxl:text-[30px] font-museo  text-[20px] text-white">
            This is your chance to make connections and land interviews early in
            the recruiting season. Make sure to bring your resume, enthusiasm,
            and curiosity as you explore the diverse opportunities available at
            the career fair. For a full list of companies attending the career
            fair, be sure to check out the Hacker Guide on your Dashboard!
          </h3>
        </div>
      </div>
    </div>
  );

  const renderComponent = () => {
    switch (title) {
      case "About Us":
        return <AboutUsComponent />;
      case "Career Fair":
        return <CareerFairComponent />;
      case "Workshops":
        return <WorkshopsComponent />;
      case "Projects":
        return <ProjectsComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full w-full min-w-full items-start justify-center py-12">
      {renderComponent()}
    </div>
  );
};

export default SlideComponent;
