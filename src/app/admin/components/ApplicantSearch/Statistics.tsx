"use client";

import { APPLICATION_STATUS_NAME_MAPPING } from "@/app/constants/applicationConstants";
import { StatsData } from "../FilteredApplicantSearchView";

const Statistics = ({ stats }: { stats: StatsData | null }) => {
  if (stats) {
    const lastRegisteredFormattedData = stats.lastRegisteredDate ? new Date(stats.lastRegisteredDate).toLocaleString() : "No applications yet";

    return (
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="font-zoonaji text-xl font-bold">Statistics</p>
          <p className="text-md font-museo">Total Applications: {stats.totalRegistered}</p>
          <p className="text-md font-museo">Applied Today: {stats.registeredToday}</p>
          <p className="text-md font-museo">Last Application: {lastRegisteredFormattedData}</p>
          <p className="text-md font-museo text-darker_cyan">Total Filtered: {stats.totalFiltered}</p>
        </div>
        <div className="md:text-right">
          <p className="font-zoonaji text-xl font-bold">Registrations by Status</p>
          {stats.registeredByStatus.map((cntByStatus, index) => {
            return (
              <p key={index} className="text-md font-museo">
                {APPLICATION_STATUS_NAME_MAPPING[cntByStatus.application_status]}: {cntByStatus._count.application_status || 0}
              </p>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Statistics;
