import { useQuery } from "react-query";

export const useApplicationQuery = () => {
  const fetchApplication = async () => {
    try {
      const response = await fetch(
        "/api/applications/hacker",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user data");
    }
  }

  return useQuery("application", fetchApplication, {
    retry: false,
  });
}