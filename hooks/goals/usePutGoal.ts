import { useMutation } from "@tanstack/react-query";

export const usePutGoal = async (
  id: string,
  duration: number,
  actual: string
) => {
  return useMutation({
    mutationKey: ["goal"],
    mutationFn: async () => {
      await fetch("http://localhost:3000/api/goals", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          duration: duration,
          actual: actual,
        }),
      });
    },
  });
};
