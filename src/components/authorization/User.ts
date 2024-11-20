import {z} from "zod";

export interface User {
  username: string;
  email: string;
  password: string;
  first_joined: string;
  last_login: string;
  characters: string[];
  campaigns?: string[];
}

const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

export const authFormSchema = (type: string) => z.object({
  email: z.string().email({
    message: "Must be a valid email address.",
  }),
  username: type === 'sign-in' ? z.string().optional() : z.string().min(6, {
    message: "Username must be at least 6 characters."
  }),
  password: z.string().min(10, {
    message: "Password must be at least 10 characters."
  }).regex(passwordPattern, {
    message: "Password must include at least 1 number & 1 special character."
  }),
  confirmPassword: type === 'sign-in' ? z.string().optional() : z.string().min(10, {
    message: "Password must be at least 10 characters."
  }).regex(passwordPattern, {
    message: "Password must include at least 1 number & 1 special character."
  }),
}).superRefine(({ password, confirmPassword }, context) => {
  if (password !== confirmPassword && type === 'sign-up')
  {
    context.addIssue({
      path: ['confirmPassword'],
      code: 'custom',
      message: 'Passwords must match'
    });
    context.addIssue({
      path: ['password'],
      code: 'custom',
      message: 'Passwords must match'
    });
  }
})
