import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "E-mail is not valid",
  }),
  password: z.string(),
  confirmPassword: z.string().optional(),
});

const validUser = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
  confirmPassword: z.string().min(8).max(16),
  authMethod: z.union([z.literal("GOOGLE"), z.literal("CREDENTIALS")]),
});

const validUpdateUser = z.object({
  id: z.string(),
  name: z.string().max(30),
  password: z.string().min(8).max(16),
  confirmPassword: z.string().min(8).max(16),
});

const validGoal = z
  .object({
    userId: z.string(),
    duration: z.number(),
    actual: z.string(),
  })
  .nullable();

const validUpdateGoal = z.object({
  id: z.string(),
  duration: z.number(),
  actual: z.string(),
});

const validUseUser = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
});

const validNewSession = z.object({
  userId: z.string(),
});

const validFullSession = z
  .object({
    beginTime: z.string(),
    endTime: z.string(),
    totalTime: z.string(),
    day: z.string(),
  })
  .partial();

const validSession = validNewSession.merge(validFullSession);

const validUpdateSession = validFullSession.merge(
  z
    .object({
      id: z.string(),
      status: z.boolean(),
    })
    .partial()
);

const validDelete = z.object({
  id: z.string(),
});

export {
  formSchema,
  validDelete,
  validFullSession,
  validGoal,
  validNewSession,
  validSession,
  validUpdateGoal,
  validUpdateSession,
  validUpdateUser,
  validUser,
  validUseUser,
};
