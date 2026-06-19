import { z } from "zod/v3";

const User = z.object({
  name: z
    .string({ required_error: "Name is Required." })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(20, { message: "Name cannot be longer than 20 characters." }),

  email: z
    .string({ required_error: "Email is Required." })
    .trim()
    .email({ message: "Invalid email format." })
    .max(50, { message: "Email cannot be longer than 50 characters." }),

  password: z
    .string({ required_error: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot be longer than 100 characters." }),

  country: z
    .string({ required_error: "Country is required." })
    .min(1, { message: "Country is required." }), // must be ObjectId in string format

    city: z
    .string({ required_error: "City is required." })
    .min(1, { message: "City is required." }) // must be ObjectId in string format
});

export default User;
