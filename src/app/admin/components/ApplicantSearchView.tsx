"use client";

import FiltersButton from "./ApplicantSearch/FiltersButton";
import SearchBar from "./ApplicantSearch/SearchBar";
import { useEffect, useState } from "react";
import useApplicantsInfiniteQuery from "@/app/hooks/useApplicantsInfiniteQuery";
import ApplicantCell from "./ApplicantSearch/ApplicantCell";
import { useAppStatusMutation } from "@/app/hooks/ApplicationStatusMutation";

export default function ApplicantSearchView() {
  const [searchVal, setSearchVal] = useState<string>("");
  const [filters, setFilters] = useState({});
  const [selectedApplicants, setSelectedApplicants] = useState<Set<Number>>(
    new Set(),
  );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useApplicantsInfiniteQuery({ filters, searchParams: searchVal });

  const appStatusMutation = useAppStatusMutation({
    onSuccess: () => setSelectedApplicants(new Set()),
  });

  useEffect(() => {
    fetchNextPage();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchVal(e.currentTarget.value);
  };

  const handleSearchSubmit = async () => {
    console.log(searchVal);
  };

  const handleSelectApplicant = (id: number) => {
    if (selectedApplicants.has(id)) {
      selectedApplicants.delete(id);
    } else {
      selectedApplicants.add(id);
    }

    setSelectedApplicants(new Set(selectedApplicants));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <p className="flex-grow font-zoonaji text-2xl font-bold">
          Applicant Search
        </p>
        <FiltersButton />
        <SearchBar
          value={searchVal}
          onChange={handleSearchChange}
          onSearch={handleSearchSubmit}
        />
      </div>

      {/* Applicant rows */}
      {!data ? (
        <p>No data</p>
      ) : isFetching ? (
        <p>Loading...</p>
      ) : (
        data.pages.map((page) =>
          page.map((applicant) => (
            <ApplicantCell
              key={applicant.id}
              applicant={applicant}
              handleAppStatusChange={appStatusMutation}
              handleSelectApplicant={() => handleSelectApplicant(applicant.id)}
              isSelected={selectedApplicants.has(applicant.id)}
            />
          )),
        )
      )}

      {/* IntersectionObserver element to fetch more from infinite query */}
      <div></div>
    </div>
  );
}
