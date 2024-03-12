import getHackerApplication from "../api/auth/[...nextauth]/getHackerApplication";
import { useQuery } from "react-query";

export default function useGetUser() {
    return useQuery("getUser", getHackerApplication)
}