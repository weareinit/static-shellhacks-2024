import { ApplicantFilters } from "@/app/schemas/applicantSchemas";
import { Hacker_Applications } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface HackerApplicationAdminResponse extends Hacker_Applications {
  user: {
    discordUsername: string;
  };
}

export interface ApplicantsInfiniteQueryResponse {
  data: Array<HackerApplicationAdminResponse>;
  nextCursor: number;
}

interface ApplicantsInfiniteQueryProps {
  filters: ApplicantFilters;
  searchParams?: string;
}

export default function useApplicantsInfiniteQuery({
  filters,
  searchParams,
}: ApplicantsInfiniteQueryProps) {
  const fetchApplicants = async (pageParam: number) => {
    //do something with filters here...
    const urlOptions = new URLSearchParams();
    for (const key in filters) {
      if (filters[key as keyof ApplicantFilters]) {
        urlOptions.append(
          key,
          filters[key as keyof ApplicantFilters] as string,
        );
      }
    }

    urlOptions.append("cursor", pageParam.toString());
    urlOptions.append("searchParams", searchParams || "");
    urlOptions.append("format", "json");

    const res = await fetch("/api/admin/hackers?" + urlOptions.toString());
    return await res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ApplicantsInfiniteQueryResponse>({
    queryKey: ["applicants", filters, searchParams],
    queryFn: ({ pageParam }) => fetchApplicants(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
}
