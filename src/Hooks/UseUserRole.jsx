import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const UseUserRole = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    data: role,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading, // only run when user is loaded
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "user";
    },
  });

  return { role, isLoading, refetch };
};

export default UseUserRole;
