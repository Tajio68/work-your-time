import { useMutation } from "@tanstack/react-query";

export const useDeleteSession = async (id: string) => {
  return useMutation({
    mutationKey: ["session"],
    mutationFn: async () => {
      await fetch("http://localhost:3000/api/session", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
    },
  });
};
