import { useQuery } from "@tanstack/react-query";
import { useUsers } from "../user/useUser";

export const useSessions = async () => {
  const { data } = await useUsers();

  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      fetch(`api/users?users?userId=${data?.id}`, {
        method: "GET",
      });
    },
  });
};
