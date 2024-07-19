import { useMutation } from "@tanstack/react-query";

export const useDeleteUser = async (id: string) => {
  return useMutation({
    mutationKey: ["users"],
    mutationFn: async () => {
      await fetch("http://localhost:3000/api/users", {
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
