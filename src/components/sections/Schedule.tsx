import ScheduleCard from "../ScheduleCard";

function ScheduleReminder() {
  return (
    <div className="min-w-[250px] w-[50vw] max-w-[300px] h-[350px] md:max-w-none md:w-full border-black border-2 p-4 flex justify-center items-center md:col-span-4 md:h-24 text-center">
      <p className="font-pixel uppercase font-thin text-center text-crate_brown">For our full schedule including workshops and activities, check out the hacker guide in your dashboard!</p>
    </div>
  );
}

function Schedule() {
  return (
    <section className="mt-36">
      <h1 className=" text-4xl text-crate_brown text-center">Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 w-fit justify-items-center items-end space-y-3 md:space-y-4">
        <ScheduleCard
          className="justify-self-start"
          weekDay="Friday"
          scheduleItems={["4 PM : Check In", "5 PM : Dinner", "6 PM : Opening Ceremony", "7 PM : Sponsor Fair", "8 PM : Hacking Starts", "9 PM : Team Building"]}
        />
        <ScheduleCard weekDay="Saturday" scheduleItems={["4 PM : Check In", "5 PM : Dinner", "6 PM : Opening Ceremony", "7 PM : Sponsor Fair", "8 PM : Hacking Starts", "9 PM : Team Building"]} />
        <ScheduleCard
          className="justify-self-end"
          weekDay="Sunday"
          scheduleItems={["4 PM : Check In", "5 PM : Dinner", "6 PM : Opening Ceremony", "7 PM : Sponsor Fair", "8 PM : Hacking Starts", "9 PM : Team Building"]}
        />
        <ScheduleReminder />
      </div>
    </section>
  );
}

export default Schedule;
