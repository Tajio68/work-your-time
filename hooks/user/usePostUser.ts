import { useMutation } from "@tanstack/react-query";

export const usePostUser = async (
  email: string,
  password: string,
  confirmPassword: string,
  authMethod: "CREDENTIALS" | "GOOGLE"
) => {
  return useMutation({
    mutationKey: ["users"],
    mutationFn: async () => {
      await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          authMethod: authMethod,
        }),
      });
    },
  });
};
