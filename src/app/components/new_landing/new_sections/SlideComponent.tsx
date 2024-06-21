import Image from "next/image";

interface SlideProps {
  title: string;
}
const SlideComponent: React.FC<SlideProps> = ({ title }) => {
  const AboutUsComponent = () => (
    <div>
      <div
        id="about-us"
        className="flex justify-center font-zoonaji text-[60px] text-white xxs:mb-2 xxs:text-[25px] xsm:text-[40px] sm:py-3 sm:text-[40px] md:text-[50px] lg:py-4 lg:text-[45px] xlg:py-5 xlg:text-[60px] xxl:py-6 xxl:text-[80px]"
      >
        About Us
      </div>
      <div className="h-full justify-center gap-6 xxs:flex xxs:flex-col xxs:gap-y-3 sm:grid sm:grid-cols-2 sm:gap-6 md:grid-cols-2 lg:grid-cols-5 xlg:gap-8 xxl:gap-10">
        <div className="pb-full relative xxs:mx-[40px] xxs:h-[200px] xsm:mx-[80px] sm:col-span-1 sm:mx-0 sm:h-full md:col-span-1 lg:col-span-2">
          <Image
            priority
            src={"/images/hackers_pic.jpg"}
            objectFit="cover"
            layout="fill"
            alt="hackers"
            className="absolute left-0 top-0 h-full w-full rounded-lg"
          />
        </div>
        <div className="sm:col-span-1 md:col-span-1 lg:col-span-3">
          <h3 className=" font-museo text-[20px] text-white xxs:text-[13px] xsm:text-[15px] md:text-[18px] xlg:text-[25px] xxl:text-[30px]">
            Ready to immerse yourself in the ultimate tech experience? Join us
            for ShellHacks, Florida&apos;s Largest Hackathon! Over 1,200
            students from across the state and around the world will come
            together to:
          </h3>
          <br />
          <ul className="list-disc pl-4 font-museo text-[20px] text-white  xxs:text-[13px] xsm:text-[15px] sm:grid-cols-2 md:text-[18px] xlg:text-[25px] xxl:pl-8 xxl:text-[30px]">
            <li>Build: Develop innovative projects</li>
            <li>Network: Network with top companies, and more!</li>
            <li>Learn: Learn the latest technologies</li>
            <br />
          </ul>
          <h3 className="font-museo text-[20px] text-white  xxs:text-[13px] xsm:text-[15px] md:text-[18px] xlg:text-[25px]  xxl:text-[30px]">
            Develop new skills by attending our technical workshops. Gain
            experience by building hands-on projects with fellow students. Land
            your next internship or job by meeting recruiters at our career
            fair. Win amazing prizes, participate in fun activities, get tons of
            cool swag, enjoy great food, and much more - all at ShellHacks!
          </h3>
        </div>
      </div>
    </div>
  );

  const ProjectsComponent = () => (
    <div>
      <div className="flex justify-center font-zoonaji text-[60px] text-white xxs:mb-2 xxs:text-[25px] xsm:text-[40px] sm:py-3 sm:text-[40px] md:text-[50px] lg:py-4 lg:text-[45px] xlg:py-5 xlg:text-[60px] xxl:py-6 xxl:text-[80px]">
        Projects
      </div>
      <div className="h-full justify-center gap-6 xxs:flex xxs:flex-col xxs:gap-y-3 sm:grid sm:grid-cols-2 sm:gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-5 lg:gap-8 xlg:gap-8 xxl:gap-10">
        <div className="pb-full relative xxs:mx-[40px] xxs:h-[200px] xsm:mx-[80px] sm:col-span-1  sm:mx-0 sm:h-full md:col-span-1 lg:col-span-2">
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
          <h3 className="font-museo text-[20px] text-white  xxs:text-[13px] xsm:text-[15px] md:text-[18px]  xlg:text-[25px] xxl:text-[30px]">
            Get ready to unleash your creativity! At ShellHacks, you&apos;ll
            have access to a range of tools, resources, and mentors to help you
            develop and refine your project. You&apos;ll be able to collaborate
            with other students and learn new skills as you work towards a
            shared goal.
          </h3>
          <br />
          <h3 className="font-museo text-[20px] text-white  xxs:text-[13px] xsm:text-[15px] md:text-[18px]  xlg:text-[25px] xxl:text-[30px]">
            Build your project using any technology you like! Whether
            you&apos;re interested in web development, AI/ML, hardware, or
            anything in between, there&apos;s always something to create. As you
            work hard, you&apos;ll have the opportunity to showcase your
            creativity, problem-solving skills, and technical knowledge to top
            companies looking to hire talented students!
          </h3>
        </div>
      </div>
    </div>
  );
  const WorkshopsComponent = () => (
    <div>
      <div className="flex justify-center font-zoonaji text-[60px] text-white xxs:mb-2 xxs:text-[25px] xsm:text-[40px] sm:py-3 sm:text-[40px] md:text-[50px] lg:py-4 lg:text-[45px] xlg:py-6 xlg:text-[60px] xxl:py-6 xxl:text-[80px]">
        Workshops
      </div>
      <div className="h-full justify-center gap-6 xxs:flex xxs:flex-col sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xlg:gap-8 xxl:gap-10">
        <div className="pb-full relative xxs:mx-[40px] xxs:h-[200px] xsm:mx-[80px] sm:col-span-1 sm:mx-0 sm:h-full md:col-span-1 lg:col-span-2">
          <Image
            priority
            src={"/images/peeps.jpg"}
            objectFit="cover"
            layout="fill"
            alt="hackers"
            className="absolute left-0 top-0 h-full w-full rounded-lg"
          />
        </div>
        <div className="sm:col-span-1 md:col-span-1 lg:col-span-3">
          <h3 className="font-museo text-[20px] text-white xxs:text-[13px] xsm:text-[15px] md:text-[18px] xlg:text-[25px] xxl:text-[30px]">
            ShellHacks offers a variety of workshop tracks to introduce you to
            the world of technology and careers in the field! These workshops
            are beginner friendly and open to all.
          </h3>
          <br />
          <ul className="list-disc pl-4 font-museo text-[20px] text-white xxs:text-[13px] xsm:text-[15px] md:text-[18px] xlg:text-[25px] xxl:pl-8 xxl:text-[30px]">
            <li>Mobile Development</li>
            <li>Career Development</li>
            <li>AI/Machine Learning</li>
            <li>Game Development</li>
            <li>IT & Cybersecurity</li>
            <li>Web Development</li>
            <li>Design & Product</li>
            <li>Hardware</li>
          </ul>
        </div>
      </div>
    </div>
  );
  const CareerFairComponent = () => (
    <div>
      <div className="flex justify-center font-zoonaji text-[60px] text-white xxs:mb-2 xxs:text-[25px] xsm:text-[40px] sm:grid-cols-2 sm:py-3 sm:text-[40px] md:text-[50px] lg:py-4 lg:text-[45px] xlg:py-5 xlg:text-[60px] xxl:py-6 xxl:text-[80px]">
        Career Fair
      </div>
      <div className="h-full justify-center gap-6 xxs:flex xxs:flex-col xxs:gap-y-3 sm:grid sm:grid-cols-2 sm:gap-6 md:grid-cols-2 lg:grid-cols-5  xlg:gap-8 xxl:gap-10">
        <div className="pb-full relative xxs:mx-[40px] xxs:h-[200px] xsm:mx-[80px] sm:col-span-1 sm:mx-0 sm:h-full md:col-span-1 lg:col-span-2">
          <Image
            priority
            src={"/images/networking.jpg"}
            objectFit="cover"
            layout="fill"
            alt="hackers"
            className="absolute left-0 top-0 h-full w-full rounded-lg sm:px-0"
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <h3 className="font-museo text-[20px] text-white xxs:text-[13px] xsm:text-[15px] md:text-[18px]  xlg:text-[25px] xxl:text-[30px]">
            Looking for your next internship or job opportunity? Our career fair
            is the perfect place for you to connect with recruiters and
            professionals from leading tech companies! You&apos;ll have the
            chance to learn about each company&apos;s culture, interview
            process, and open internship and job opportunities.
          </h3>
          <br />
          <h3 className="font-museo text-[20px] text-white  xxs:text-[13px] xsm:text-[15px] md:text-[18px]  xlg:text-[25px] xxl:text-[30px]">
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
    <div className="flex h-full w-full min-w-full items-start justify-center xxs:py-3 xsm:py-12">
      {renderComponent()}
    </div>
  );
};

export default SlideComponent;
