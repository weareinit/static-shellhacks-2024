"use client";

import FiltersButton from "./ApplicantSearch/FiltersButton";
import SearchBar from "./ApplicantSearch/SearchBar";
import { useEffect, useRef, useState } from "react";
import useApplicantsInfiniteQuery from "@/app/hooks/useApplicantsInfiniteQuery";
import ApplicantCell from "./ApplicantSearch/ApplicantCell";
import { useAppStatusMutation } from "@/app/hooks/ApplicationStatusMutation";
import FiltersModal from "./ApplicantSearch/FiltersModal";
import LoadingSpinner from "@/app/components/misc/LoadingSpinner";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";

export default function ApplicantSearchView() {
  const [searchVal, setSearchVal] = useState<string>("");
  const [filters, setFilters] = useState({});
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
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
        <FiltersButton handleClicked={toggleFiltersModal} />
        <SearchBar
          value={searchVal}
          onChange={handleSearchChange}
          onSearch={handleSearchSubmit}
        />
      </div>

      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Applicant rows */}
      {error ? (
        <p>Error: {error?.message}</p>
      ) : isFetching || !data ? (
        <div className="flex w-full justify-center">
          <LoadingSpinner size="large" />
        </div>
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
      <div ref={loadMoreRef} className="min-h-[5px]"></div>
    </div>
  );
}
