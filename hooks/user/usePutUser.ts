import { useMutation } from "@tanstack/react-query";

export const usePutUser = async (
  id: string,
  name: string,
  password: string,
  confirmPassword: string
) => {
  return useMutation({
    mutationKey: ["users"],
    mutationFn: async () => {
      await fetch("http://localhost:3000/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: name,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });
    },
  });
};
