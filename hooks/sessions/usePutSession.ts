import { useMutation } from "@tanstack/react-query";

export const usePutSession = async (
  userId: string,
  beginTime: string,
  endTime: string,
  totalTime: string,
  day: string,
  status: boolean
) => {
  return useMutation({
    mutationKey: ["session"],
    mutationFn: async () => {
      await fetch("http://localhost:3000/api/sessions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          beginTime: beginTime,
          endTime: endTime,
          totalTime: totalTime,
          day: day,
          stattus: status,
        }),
      });
    },
  });
};
