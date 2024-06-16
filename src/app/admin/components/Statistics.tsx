"use server";

import { getAggregateHackerApplicationStats } from "@/app/api/(logic)/getAggregateHackerApplicationStats";
import { APPLICATION_STATUS_NAME_MAPPING } from "@/app/constants/applicationConstants";

export default async function Statistics() {
  const stats = await getAggregateHackerApplicationStats();

  const lastRegisteredFormattedData = stats.lastRegisteredDate
    ? new Date(stats.lastRegisteredDate).toLocaleString()
    : "No applications yet";

  return (
    <div className="flex flex-row justify-between">
      <div>
        <p className="font-zoonaji text-xl font-bold">Statistics</p>
        <p className="text-md font-museo">
          Total Applications: {stats.totalRegistered}
        </p>
        <p className="text-md font-museo">
          Applied Today: {stats.registeredToday}
        </p>
        <p className="text-md font-museo">
          Last Application: {lastRegisteredFormattedData}
        </p>
      </div>
      <div>
        <p className="font-zoonaji text-xl font-bold">
          Registrations by Status
        </p>
        {stats.registeredByStatus.map((cntByStatus, index) => {
          return (
            <p key={index} className="text-md font-museo">
              {APPLICATION_STATUS_NAME_MAPPING[cntByStatus.application_status]}:{" "}
              {cntByStatus._count.application_status || 0}
            </p>
          );
        })}
      </div>
    </div>
  );
}
