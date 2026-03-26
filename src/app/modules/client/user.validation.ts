import { z } from "zod";

export const userEntryZodSchema = z.object({
  username: z.string().min(4, "Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  // ✅ phone ফিল্ডটি এখানে যোগ করা হয়েছে
  phone: z.string().min(11, "Phone must be 11 digits").max(11, "Phone must be 11 digits"),
  category: z.string().min(1, "Category is required"),
  sitename: z.string().min(1, "Sitename is required"),
});

export const userUpdateZodSchema = z
  .object({
    username: z.string().min(4).optional(),
    password: z
      .string()
      .min(6)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .optional(),
    // ✅ আপডেট স্কিমাতেও phone ফিল্ডটি যোগ করা হয়েছে
    phone: z.string().min(11).max(11).optional(),
    category: z.string().min(1).optional(),
    sitename: z.string().min(1).optional(),
  })
  .refine(
    (data) =>
      !data.username || !data.password || data.username !== data.password,
    {
      message: "Username and password cannot be the same",
      path: ["password"],
    }
  );

export const userValidationByZod = {
  userEntryZodSchema,
  userUpdateZodSchema,
};