import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import FiltersModal from "@/components/dashboard/Filters";
import { useEffect, useState } from "react";
import { applicantFiltersSchema } from "@/schemas/applicantSchemas";
import { useAppStatusMutation } from "@/hooks/ApplicationStatusMutation";
import { useApplicantsQuery } from "@/hooks/ApplicantsQuery";
import { z } from "zod";
import { parseCSV } from "@/util/parseCSV";
import ApplicantsTable from "@/components/dashboard/ApplicantsTable";
import { useAcceptWaveMutation } from "@/hooks/AcceptWaveMutation";
import Navbar from "../../components/dashboard/Navbar";
import { application_status_enums } from "@prisma/client";
import { useSendReminderEmailMutation } from "@/hooks/SendReminderEmailMutation";
import { downloadApplicantsCSV } from "@/util/downloadApplicantsCSV";
import PixelButton from "@/components/misc/PixelButton";

type ApplicantFilterType = z.infer<typeof applicantFiltersSchema>;
const DEFAULT_FILTERS: ApplicantFilterType = { application_status: "registered" };

export default withPageAuthRequired(function AdminDashboard({ schools }) {
  const [showFilters, setShowFilters] = useState(false);
  const [name, setName] = useState("");
  const [filters, setFilters] = useState<ApplicantFilterType>(DEFAULT_FILTERS);
  const [selectedApplicants, setSelectedApplicants] = useState<Set<number>>(new Set());

  const { data, isLoading, error } = useApplicantsQuery(filters, name);
  const appStatusMutation = useAppStatusMutation({ onSuccess: () => setSelectedApplicants(new Set()) });
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
    appStatusMutation.mutateAsync({ ids: Array.from(selectedApplicants), application_status: application_status_enums.in_wave as any });
  };

  return (
    <main className="bg-sand min-h-screen p-2 md:p-8">
      <div className="pt-0">
        <Navbar />

        <div className="flex justify-between mb-5 flex-row flex-wrap align-middle items-center">
          <h2 className="text-2xl">Showing {data?.length} Applicants</h2>
          <div className="flex flex-wrap justify-left md:justify-around gap-3">
            <input className="border border-gray-300 font-pixel text-md pl-1 max-md:flex-grow py-2" type="text" placeholder="Search" value={name} onChange={(e: any) => setName(e.target.value)} />

            <div className="flex justify-left gap-2">
              <PixelButton className="bg-indigo-500 hover:bg-indigo-600" onClick={() => setShowFilters(!showFilters)} text="Filters" />
              <PixelButton className="bg-green-500 hover:bg-green-600 max-sm:hidden" onClick={() => downloadApplicantsCSV(filters)} text="Export CSV" />

              {filters.application_status == application_status_enums.registered && selectedApplicants.size > 0 && (
                <PixelButton className="bg-purple-500 hover:bg-purple-600" onClick={addSelectedToWave} text={`Add to Wave (${selectedApplicants.size})`} isLoading={appStatusMutation.isLoading} />
              )}

              {filters.application_status == application_status_enums.in_wave && (
                <PixelButton className="bg-purple-500 hover:bg-purple-600" onClick={() => acceptWaveMutation.mutate()} text="Accept Wave" isLoading={acceptWaveMutation.isLoading} />
              )}
              {filters.application_status == application_status_enums.accepted && (
                <PixelButton
                  title={`Last sent: ${new Date().toLocaleDateString()}`}
                  onClick={() => sendReminderEmailMutation.mutate(application_status_enums.accepted)}
                  text="Send Confirmation"
                  className="bg-lime-600 hover:bg-lime-700"
                  isLoading={sendReminderEmailMutation.isLoading}
                />
              )}
            </div>
          </div>
        </div>

        {showFilters && <FiltersModal filters={filters} setFilters={setFilters} schools={schools} />}

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
  );
});

export async function getStaticProps() {
  const schoolData: string[] = await parseCSV<string>("https://raw.githubusercontent.com/quigongian/probable-octo-parakeet/main/schools.csv");

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
}
