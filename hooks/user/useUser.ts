import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useUsers = async () => {
  const { data } = await useSession();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      fetch(`api/users?userMail=${data?.user?.email}`, {
        method: "GET",
      });
    },
  });
};
