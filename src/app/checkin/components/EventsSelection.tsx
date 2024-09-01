import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

interface EventsSelectionProps {
  currentSelection: string;
  setCurrentSelection: Dispatch<SetStateAction<string>>;
}

interface HackerEvent {
  id: string;
  properties: {
    "Event Name": {
      title: Array<{
        plain_text: string;
      }>;
    };
    Type: {
      select: {
        name: string;
      };
    };
    Location: {
      rich_text: Array<{
        plain_text: string;
      }>;
    };
    Duration: {
      date: {
        start: string;
        end: string;
      };
    };
    ID: {
      unique_id: {
        prefix: string;
        number: string;
      };
    };
  };
}

const EventsSelection: React.FC<EventsSelectionProps> = ({ currentSelection, setCurrentSelection }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"Meal" | "Workshop" | "Swag" | "Check In">("Check In");
  const [checkInOptions, setCheckInOptions] = useState<Map<"Meal" | "Workshop" | "Swag" | "Check In", HackerEvent[]>>(new Map());
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = (await response.json()) as Record<string, HackerEvent[]>;
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error("Invalid data format received from server");
        }

        const newCheckInOptions = new Map<"Meal" | "Workshop" | "Swag" | "Check In", HackerEvent[]>();
        newCheckInOptions.set("Check In", []); // Add empty array for Check In
        data.results.forEach((event: HackerEvent) => {
          const eventType = event.properties.Type.select.name as "Meal" | "Workshop" | "Swag";
          if (!newCheckInOptions.has(eventType)) {
            newCheckInOptions.set(eventType, []);
          }
          newCheckInOptions.get(eventType)!.push(event);
        });
        setCheckInOptions(newCheckInOptions);
      } catch (error) {
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchEvents();
  }, [setCheckInOptions]);

  useEffect(() => {
    if (selectedType === "Check In") {
      setCurrentSelection("Check In");
    } else {
      setCurrentSelection("");
    }
  }, [selectedType, setCurrentSelection]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value as "Meal" | "Workshop" | "Swag" | "Check In");
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEventId = e.target.value;
    const selectedEvent = checkInOptions.get(selectedType)?.find((event) => `${event.properties.ID.unique_id.prefix}-${event.properties.ID.unique_id.number}` === selectedEventId);
    if (selectedEvent) {
      setCurrentSelection(`${selectedEvent.properties.ID.unique_id.prefix}-${selectedEvent.properties.ID.unique_id.number}`);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className="mb-4 font-zoonaji text-2xl">Events</h2>
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="font-museo">Loading events...</span>
        </div>
      )}
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-center">
          <p className="font-museo text-sm text-red-800">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-2 rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200">
            Retry
          </button>
        </div>
      )}
      {!isLoading && !error && checkInOptions.size === 1 && (
        <div className="p-4 text-center">
          <p className="font-4xl font-museo text-sm text-yellow-800">No events found.</p>
        </div>
      )}
      {!isLoading && !error && (
        <div className="flex w-full max-w-md flex-col gap-4">
          <select value={selectedType} onChange={handleTypeChange} className="w-full rounded-md border border-gray-300 p-2 font-museo text-lg">
            <option value="Check In">General Check In</option>
            {Array.from(checkInOptions.keys())
              .filter((type) => type !== "Check In")
              .map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
          </select>

          {selectedType !== "Check In" && (
            <select value={currentSelection} onChange={handleEventChange} className="w-full rounded-md border border-gray-300 p-2 font-museo text-lg">
              <option value="">Select event</option>
              {checkInOptions.get(selectedType)?.map((event: HackerEvent) => {
                const eventId = `${event.properties.ID.unique_id.prefix}-${event.properties.ID.unique_id.number}`;
                const eventName = event.properties["Event Name"].title[0]?.plain_text ?? "Unnamed Event";
                const location = event.properties.Location.rich_text[0]?.plain_text;
                const startDate = event.properties.Duration.date?.start;

                let optionText = eventName;
                if (startDate) optionText += ` - (${new Date(startDate).toLocaleDateString()})`;
                if (location) optionText += ` 📍 ${location}`;

                return (
                  <option key={event.id} value={eventId}>
                    {optionText}
                  </option>
                );
              })}
            </select>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsSelection;
