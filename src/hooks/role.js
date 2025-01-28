import { useQuery } from "@tanstack/react-query";
import useAuth from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading, error } = useQuery(
    [user?.email, "userRole"],
    async () => {
      if (!user?.email) return null;

      const response = await axiosSecure.get(`/users/${user.email}`);
      return response.data;
    },
    {
      enabled: !!user?.email, // Only fetch if user is authenticated
      onError: (err) => {
        console.error("Error fetching user data:", err);
      },
    }
  );

  return {
    isAdmin: userData?.role === "admin",
    isModerator: userData?.role === "moderator",
    isUser: userData?.role === "user",
    isLoading,
    error,
  };
};

export default useUserRole;
