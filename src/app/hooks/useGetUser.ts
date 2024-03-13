<<<<<<< HEAD
import { useQuery } from "react-query";

async function fetchHackerApplication() {
  try {
    const response = await fetch(
      "/api/auth/[...nextauth]/getHackerApplication",
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

export default function useGetUser() {
  return useQuery("getUser", fetchHackerApplication);
}
=======
import getHackerApplication from "../api/auth/[...nextauth]/getHackerApplication";
import { useQuery } from "react-query";

export default function useGetUser() {
    return useQuery("getUser", getHackerApplication)
}
>>>>>>> 36b072a (auth conflict)
