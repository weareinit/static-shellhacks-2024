'use client'
import FiltersModal from "@/app/components/dashboard/Filters";
import { useEffect, useState } from "react";
import { applicantFiltersSchema } from "@/app/schemas/applicantSchemas";
import { useAppStatusMutation } from "@/app/hooks/ApplicationStatusMutation";
import { useApplicantsQuery } from "@/app/hooks/ApplicantsQuery";
import { set, z } from "zod";
import { parseCSV } from "@/app/util/parseCSV";
import ApplicantsTable from "@/app/components/dashboard/ApplicantsTable";
import { useAcceptWaveMutation } from "@/app/hooks/AcceptWaveMutation";
import Navbar from "../../app/components/dashboard/Navbar";
import { application_status_enums } from "@prisma/client";
import { useSendReminderEmailMutation } from "@/app/hooks/SendReminderEmailMutation";
import { downloadApplicantsCSV } from "@/app/util/downloadApplicantsCSV";
import PixelButton from "@/app/components/misc/PixelButton";
import { PrismaClient } from "@prisma/client";
import { getServerAuthSession } from "@/server/auth";

type ApplicantFilterType = z.infer<typeof applicantFiltersSchema>;
const DEFAULT_FILTERS: ApplicantFilterType = {
  application_status: "registered",
};

const getSchoolData = async () => {
  const schoolData: string[] = await parseCSV<string>(
    "https://raw.githubusercontent.com/quigongian/probable-octo-parakeet/main/schools.csv",
  );

  const schools = schoolData
    .map((school) => {
      return school[0];
    })
    .splice(1);

  return {
    props: {
      schools,
    },
  };
};


export default function AdminDashboard() {

    // const schools = getSchoolData() // not working

  const [showFilters, setShowFilters] = useState(false);
  const [isExportingCSV, setIsExportingCSV] = useState(false);
  const [name, setName] = useState("");
  const [filters, setFilters] = useState<ApplicantFilterType>(DEFAULT_FILTERS);
  const [selectedApplicants, setSelectedApplicants] = useState<Set<number>>(
    new Set(),
  );

  const { data, isLoading, error } = useApplicantsQuery(filters, name);
  const appStatusMutation = useAppStatusMutation({
    onSuccess: () => setSelectedApplicants(new Set()),
  });
  const acceptWaveMutation = useAcceptWaveMutation();
  const sendReminderEmailMutation = useSendReminderEmailMutation();

  useEffect(() => {
    // Reset selected applicants when filters change
    setSelectedApplicants(new Set());
  }, [filters]);

  const toggleSelectedApplicant = (hacker_id: number) => {
    if (selectedApplicants.has(hacker_id)) {
      selectedApplicants.delete(hacker_id);
    } else {
      selectedApplicants.add(hacker_id);
    }

    setSelectedApplicants(new Set(selectedApplicants));
  };

  const addSelectedToWave = async () => {
    void appStatusMutation.mutateAsync({
      ids: Array.from(selectedApplicants),
      application_status: application_status_enums.in_wave as unknown,
    });
  };

  const downloadCSV = async () => {
    setIsExportingCSV(true);
    await downloadApplicantsCSV(filters);
    setIsExportingCSV(false);
  };

  return (
    <main className="min-h-screen bg-sand p-2 md:p-8">
      <div className="pt-0">
        <Navbar />

        <div className="mb-5 flex flex-row flex-wrap items-center justify-between align-middle">
          <h2 className="text-2xl">Showing {data?.length} Applicants</h2>
          <div className="justify-left flex flex-wrap gap-3 md:justify-around">
            <input
              className="text-md border border-gray-300 py-2 pl-1 font-pixel max-md:flex-grow"
              type="text"
              placeholder="Search"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />

            <div className="justify-left flex gap-2">
              <PixelButton
                className="bg-indigo-500 hover:bg-indigo-600"
                onClick={() => setShowFilters(!showFilters)}
                text="Filters"
              />
              <PixelButton
                className="bg-green-500 hover:bg-green-600 max-sm:hidden"
                onClick={downloadCSV}
                isLoading={isExportingCSV}
                text="Export CSV"
              />

              {filters.application_status ==
                application_status_enums.registered &&
                selectedApplicants.size > 0 && (
                  <PixelButton
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={addSelectedToWave}
                    text={`Add to Wave (${selectedApplicants.size})`}
                    isLoading={appStatusMutation.isLoading}
                  />
                )}

              {filters.application_status ==
                application_status_enums.in_wave && (
                <PixelButton
                  className="bg-purple-500 hover:bg-purple-600"
                  onClick={() => acceptWaveMutation.mutate()}
                  text="Accept Wave"
                  isLoading={acceptWaveMutation.isLoading}
                />
              )}
              {filters.application_status ==
                application_status_enums.accepted && (
                <PixelButton
                  title={`Last sent: ${new Date().toLocaleDateString()}`}
                  onClick={() =>
                    sendReminderEmailMutation.mutate(
                      application_status_enums.accepted,
                    )
                  }
                  text="Send Confirmation"
                  className="bg-lime-600 hover:bg-lime-700"
                  isLoading={sendReminderEmailMutation.isLoading}
                />
              )}
            </div>
          </div>
        </div>

        {showFilters && (
          <FiltersModal
            filters={filters}
            setFilters={setFilters}
            schools={schools}
          />
        )}

        <ApplicantsTable
          handleSelectApplicant={toggleSelectedApplicant}
          selectedApplicants={selectedApplicants}
          data={data}
          isLoading={isLoading}
          error={error}
          appStatusMutation={appStatusMutation}
        />
      </div>
    </main>
  )
        };

