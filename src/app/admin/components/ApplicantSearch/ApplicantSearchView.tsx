"use client";

import FiltersButton from "./FiltersButton";
import SearchBar from "./SearchBar";
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import useApplicantsInfiniteQuery, { HackerApplicationAdminResponse } from "@/app/hooks/useApplicantsInfiniteQuery";
import ApplicantCell from "./ApplicantCell";
import FiltersModal from "./FiltersModal";
import LoadingSpinner from "@/app/components/misc/LoadingSpinner";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import ApplicantSearchActions from "./ApplicantSearchActions";
import { ApplicantFilters } from "@/app/schemas/applicantSchemas";

export default function ApplicantSearchView({ filters, setFilters }: { filters: ApplicantFilters; setFilters: Dispatch<SetStateAction<ApplicantFilters>> }) {
  const [searchVal, setSearchVal] = useState<string>("");
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<Set<HackerApplicationAdminResponse>>(new Set());

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useApplicantsInfiniteQuery({ filters, searchParams: searchVal });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreApplicants = () => {
    if (!hasNextPage || isFetching || isFetchingNextPage) return;
    fetchNextPage();
  };

  useIntersectionObserver({
    ref: loadMoreRef,
    callback: fetchMoreApplicants,
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  useEffect(() => {
    fetchNextPage();
  }, []);

  useEffect(() => {
    console.log(data, hasNextPage, isFetching, isFetchingNextPage, status);
  }, [data]);

  const toggleFiltersModal = () => {
    setIsFiltersModalOpen(!isFiltersModalOpen);
  };

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchVal(e.currentTarget.value);
  };

  const handleSearchSubmit = async () => {
    console.log(searchVal);
  };

  const handleSelectApplicant = (hacker: HackerApplicationAdminResponse) => {
    if (selectedApplicants.has(hacker)) {
      selectedApplicants.delete(hacker);
    } else {
      selectedApplicants.add(hacker);
    }

    setSelectedApplicants(new Set(selectedApplicants));
  };

  const resetSelectedApplicants = () => {
    setSelectedApplicants(new Set());
  };

  return (
    <div className="w-full">
      {/* Header */}
      <ApplicantSearchActions filteredStatus={filters.application_status} selectedApplicants={selectedApplicants} resetSelectedApplicants={resetSelectedApplicants} />
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        <p className="flex-grow basis-full font-zoonaji text-2xl font-bold sm:basis-auto">Applicant Search</p>

        <FiltersButton handleClicked={toggleFiltersModal} />
        <SearchBar value={searchVal} onChange={handleSearchChange} onSearch={handleSearchSubmit} />
      </div>

      <FiltersModal isOpen={isFiltersModalOpen} onClose={() => setIsFiltersModalOpen(false)} filters={filters} setFilters={setFilters} />

      {/* Applicant rows */}
      {error ? (
        <p>Error: {error?.message}</p>
      ) : !data ? (
        <p>No data</p>
      ) : (
        <>
          {data.pages.map((page) =>
            page.data.map((applicant) => (
              <ApplicantCell key={applicant.id} applicant={applicant} handleSelectApplicant={() => handleSelectApplicant(applicant)} isSelected={selectedApplicants.has(applicant)} />
            )),
          )}

          {isFetching && (
            <div className="flex w-full justify-center">
              <LoadingSpinner size="large" />
            </div>
          )}
        </>
      )}

      {/* IntersectionObserver element to fetch more from infinite query */}
      <div ref={loadMoreRef} className="min-h-[5px]"></div>
    </div>
  );
}
