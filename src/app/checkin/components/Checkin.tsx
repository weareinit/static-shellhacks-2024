"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../../dashboard/components/CustomButton";
import { useZxing } from "react-zxing";
import EventsSelection from "../../checkin/components/EventsSelection";
import { applicantUpdateSchemaBase } from "@/app/schemas/applicantSchemas";
import { z } from "zod";

const CheckIn = () => {
  const [result, setResult] = useState("");
  const [currentSelection, setCurrentSelection] = useState<string>("Check In");
  const [currentUser, setCurrentUser] = useState<z.infer<typeof applicantUpdateSchemaBase> | null>(null);
  // const [userEvents, setUserEvents] = useState<any[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
      setSuccess(null);
      void fetchUserData(result.getText());
    },
  });

  const fetchUserData = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userResponse = await fetch(`/api/hackers/${userId}`);
      if (!userResponse.ok) {
        const errorMessage = await userResponse.text();
        throw new Error(errorMessage ?? "Failed to fetch user data");
      }
      const userData = await userResponse.json();
      setCurrentUser(userData);

      const eventsResponse = await fetch(`/api/hackers/${userId}/events`);
      if (!eventsResponse.ok) {
        const errorMessage = await eventsResponse.text();
        throw new Error(errorMessage ?? "Failed to fetch user events");
      }
      const eventsData = await eventsResponse.json();
      // setUserEvents(eventsData);
    } catch (err) {
      setError(`${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!currentUser || !currentSelection) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`/api/hackers/${result}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: currentSelection }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage ?? "Failed to check in user");
      }

      setSuccess("Successfully checked in!");

      // Reset current user after successful check-in
      setCurrentUser(null);
      // setUserEvents([]);
    } catch (err) {
      setError(`${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 pb-24">
      <EventsSelection currentSelection={currentSelection} setCurrentSelection={setCurrentSelection} />

      <div className="flex w-full flex-col items-center justify-center">
        <div className="aspect-video min-h-[40vh] w-full overflow-hidden rounded-lg bg-gray-100">
          <video ref={ref} className="h-full w-full object-cover" />
        </div>

        {isLoading && (
          <div className="mt-2 flex items-center justify-center space-x-2 text-gray-600">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="font-museo">Loading...</span>
          </div>
        )}

        {error && (
          <div className="mt-2 flex items-center justify-center space-x-2 space-y-0 text-red-600">
            <svg className=" h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-museo text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-2 flex items-center justify-center space-x-2 text-green-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-museo">{success}</span>
          </div>
        )}

        {currentUser && (
          <div className="mt-6 w-full rounded-lg border border-gray-200 bg-white px-6 pb-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold">{currentUser.name}</h2>
            <div className="space-y-2 font-museo text-sm text-gray-700">
              <p>
                <span className="font-semibold">Name:</span> {currentUser.first_name} {currentUser.last_name}
              </p>
              <p>
                <span className="font-sm font-semibold">School:</span> {currentUser.school}
              </p>
              <p>
                <span className="font-semibold">Major:</span> {currentUser.major}
              </p>
              <p>
                <span className="font-semibold">Graduation Year:</span> {currentUser.grad_year}
              </p>
            </div>
            {/* {userEvents.length > 0 && (
              <>
                <h3 className="mb-3 mt-6 text-xl font-semibold">Events:</h3>
                <ul className="space-y-2">
                  <ul className="grid grid-cols-1 gap-4">
                    {userEvents.map((event) => (
                      <li key={event.event_id} className="flex items-center justify-between rounded bg-gray-50 p-4 shadow">
                        <span className="text-sm font-semibold">{event.event_id}</span>
                        <span className="text-sm text-gray-500">{event.timestamp}</span>
                      </li>
                    ))}
                  </ul>
                </ul>
              </>
            )} */}
          </div>
        )}
      </div>

      <div className="fixed bottom-6 left-0 flex w-full justify-center font-museo">
        <button
          title="Check In"
          className={`
        rounded-lg px-6 py-3 font-bold text-white shadow-lg transition-all
        ${currentUser ? "bg-green-500 hover:bg-green-600 active:bg-green-700" : "cursor-not-allowed bg-gray-300"}
      `}
          onClick={handleCheckIn}
          disabled={!currentUser}
        >
          {currentUser ? "Check In" : "Scan QR Code"}
        </button>
      </div>
    </div>
  );
};

export default CheckIn;
