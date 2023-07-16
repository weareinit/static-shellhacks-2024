import React from "react";

function ScheduleCard({ weekDay, scheduleItems, className }: { weekDay: String; scheduleItems: String[]; className?: String }) {
  return (
    <div className={`flex flex-col bg-caramel_brown max-w-[300px] min-w-[250px] w-[50vw] h-[350px] ${className}`}>
      <h2 className="font-pixel text-2xl text-center w-full p-4 bg-deep_blue text-white">{weekDay}</h2>
      <ul className="p-4">
        {scheduleItems.map((item, index) => (
          <li className="m-2 font-pixel text-md text-crate_brown" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduleCard;
