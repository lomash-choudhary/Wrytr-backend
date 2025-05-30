import { z } from "zod";

const userSignupSchemaValidator = z.object({
  username: z
    .string()
    .min(3, "The username must contain atleast 3 characters")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password should contain atleast minimum of 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      "Password must contain atleast one upper, one lower, one numeric and one special character"
    ),
  email: z.string().regex(/^[^@]+@[^@]+\.[^@]+$/, "Please enter a valid email"),
  fullName: z.string().min(1,"Please enter a valid Full Name").max(255, "The full name is too long please make it short")
});

export { userSignupSchemaValidator };
