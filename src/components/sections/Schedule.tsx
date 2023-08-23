import Image from "next/image";

function ScheduleReminder() {
  return (
    <div className="w-[200px] h-full lg:max-w-none lg:w-full border-black border-2 p-2 flex flex-col lg:flex-row justify-center items-center lg:col-span-3 lg:h-fit text-center">
      <Image src="/assets/decorations/pink_shell.svg" height={75} width={75} alt="Pink Shell" className="p-2" />
      <p className="font-pixel uppercase font-thin text-center text-crate_brown text-xs m-2">For our full schedule including workshops and activities, check out the hacker guide in your dashboard!</p>
    </div>
  );
}

function ScheduleCard({ weekDay, scheduleItems, className }: { weekDay: String; scheduleItems: String[]; className?: String }) {
  return (
    <div className={`flex flex-col bg-caramel_brown w-[200px] h-full lg:min-w-[250px] ${className}`}>
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
    <section className="pt-36" id="schedule">
      <h1 className="mb-6 text-4xl text-crate_brown text-center">Schedule</h1>
      <div className="grid grid-cols-1 auto-rows-fr lg:auto-rows-auto gap-5 sm:grid-cols-2 lg:gap-y-6 lg:grid-cols-3 w-fit justify-items-center items-center justify-center content-center place-items-center">
        <ScheduleCard
          className=" justify-self-start"
          weekDay="Friday"
          scheduleItems={["3 PM : Check In", "6 PM : Dinner", "7 PM : Opening Ceremony", "9 PM : Sponsor Fair", "11 PM : Hacking Starts", "11 PM : Team Building", "11 PM : Snack"]}
        />
        <ScheduleCard weekDay="Saturday" scheduleItems={["8 AM : Breakfast", "12 PM : Lunch", "6 PM : Dinner", "11 PM : Snack"]} />
        <ScheduleCard
          className=" justify-self-end"
          weekDay="Sunday"
          scheduleItems={["8 AM : Breakfast", "11 AM : Hacking Ends", "11 AM : Project Submissions", "12 PM : Project Judging", "5 PM : Closing Ceremony"]}
        />
        <ScheduleReminder />
      </div>
    </section>
  );
}

export default Schedule;
