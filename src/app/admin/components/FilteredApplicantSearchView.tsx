"use client";

import React, { useState, useEffect } from "react";
import Statistics from "./ApplicantSearch/Statistics";
import ApplicantSearchView from "./ApplicantSearch/ApplicantSearchView";
import { ApplicantFilters } from "@/app/schemas/applicantSchemas";
import { getStatisticsData } from "@/app/api/(routes)/admin/getStatisticsData";

export interface StatsData {
  totalFiltered: number;
  totalRegistered: number;
  registeredByStatus: {
    application_status: string;
    _count: {
      application_status: number;
    };
  }[];
  registeredToday: number;
  lastRegisteredDate: Date | undefined;
}

const FilteredApplicantSearchView = () => {
  const [filters, setFilters] = useState<ApplicantFilters>({});
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getStatisticsData(filters);
      setStats(data);
    }
    void fetchData();
  }, [filters]);
  return (
    <div>
      {/* Statistics */}
      <div className="w-full">
        <Statistics stats={stats} />
      </div>

      {/* Main content */}
      <div className="my-5 w-full rounded-lg bg-white bg-opacity-50 p-2 sm:p-3">
        <ApplicantSearchView setFilters={setFilters} filters={filters} />
      </div>
    </div>
  );
};

export default FilteredApplicantSearchView;
