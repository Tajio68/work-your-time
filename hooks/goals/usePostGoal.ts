import { useMutation } from "@tanstack/react-query";

export const usePostGoal = async (
  userId: string,
  duration: number,
  actual: string
) => {
  return useMutation({
    mutationKey: ["goal"],
    mutationFn: async () => {
      await fetch("http://localhost:3000/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          duration: duration,
          actual: actual,
        }),
      });
    },
  });
};
