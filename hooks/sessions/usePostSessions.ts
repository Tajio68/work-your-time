import { useMutation } from "@tanstack/react-query";

export const usePostSession = async (
  userId: string,
  beginTime: string,
  endTime: string,
  totalTime: string,
  day: string
) => {
  return useMutation({
    mutationKey: ["session"],
    mutationFn: async () => {
      await fetch("http://localhost:3000/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          beginTime: beginTime,
          endTime: endTime,
          totalTime: totalTime,
          day: day,
        }),
      });
    },
  });
};
