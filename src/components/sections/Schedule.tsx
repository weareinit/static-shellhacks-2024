import Image from "next/image";

function ScheduleReminder() {
  return (
    <div className="w-[200px] h-[250px] lg:max-w-none lg:w-full border-black border-2 p-2 flex flex-col lg:flex-row justify-center items-center lg:col-span-4 lg:h-fit text-center">
      <Image src="/assets/decorations/pink_shell.svg" height={75} width={75} alt="Pink Shell" className="p-2" />
      <p className="font-pixel uppercase font-thin text-center text-crate_brown text-xs m-2">For our full schedule including workshops and activities, check out the hacker guide in your dashboard!</p>
    </div>
  );
}

function ScheduleCard({ weekDay, scheduleItems, className }: { weekDay: String; scheduleItems: String[]; className?: String }) {
  return (
    <div className={`flex flex-col bg-caramel_brown min-w-[200px] h-[250px] lg:min-w-[250px] lg:h-[300px] ${className}`}>
      <h2 className="font-pixel py-1 text-lg text-center w-full bg-deep_blue text-white">{weekDay}</h2>
      <ul className="p-4">
        {scheduleItems.map((item, index) => (
          <li className="m-2 font-pixel text-xs text-crate_brown lg:text-base" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Schedule() {
  return (
    <section className="mt-36">
      <h1 className="mb-12 text-4xl text-crate_brown text-center">Schedule</h1>
      <div className="grid grid-cols-2 gap-5 lg:gap-y-6 lg:grid-cols-3 w-fit justify-items-center items-center justify-center content-center place-items-center">
        <ScheduleCard
          className=" justify-self-start"
          weekDay="Friday"
          scheduleItems={["4 PM : Check In", "5 PM : Dinner", "6 PM : Opening Ceremony", "7 PM : Sponsor Fair", "8 PM : Hacking Starts", "9 PM : Team Building"]}
        />
        <ScheduleCard weekDay="Saturday" scheduleItems={["4 PM : Check In", "5 PM : Dinner", "6 PM : Opening Ceremony", "7 PM : Sponsor Fair", "8 PM : Hacking Starts", "9 PM : Team Building"]} />
        <ScheduleCard
          className=" justify-self-end"
          weekDay="Sunday"
          scheduleItems={["4 PM : Check In", "5 PM : Dinner", "6 PM : Opening Ceremony", "7 PM : Sponsor Fair", "8 PM : Hacking Starts", "9 PM : Team Building"]}
        />
        <ScheduleReminder />
      </div>
    </section>
  );
}

export default Schedule;
