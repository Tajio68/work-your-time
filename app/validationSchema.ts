import { z } from "zod";

const validUser = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
  confirmPassword: z.string().min(8).max(16),
  authMethod: z.union([z.literal("GOOGLE"), z.literal("CREDENTIALS")]),
});

export { validUser };
