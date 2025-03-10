// "use server" - temporarily disabled for static export;

import { getAggregateHackerApplicationStats } from "@/app/api/(logic)/getAggregateHackerApplicationStats";
import { ApplicantFilters } from "@/app/schemas/applicantSchemas";

export async function getStatisticsData(filters: ApplicantFilters) {
  const stats = await getAggregateHackerApplicationStats(filters);
  return stats;
}
