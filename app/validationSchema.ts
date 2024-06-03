import { z } from "zod";

const validUser = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
  confirmPassword: z.string().min(8).max(16),
});

export { validUser };
