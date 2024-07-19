import { useQuery } from "@tanstack/react-query";
import { useUsers } from "../user/useUser";

export const useGoal = async () => {
  const { data } = await useUsers();

  return useQuery({
    queryKey: ["goal"],
    queryFn: async () => {
      try {
        const res = await fetch(`api/goals?goalId=${data?.id}`);
      } catch (e) {
        console.log(e);
      }
    },
  });
};
