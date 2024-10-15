import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {z} from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Message
{
  id: string,
  text: string,
  sentOn: {toDate: () => Date}
}

const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
const numbers = /^[0-9]+$/;
const alphaNumeric = /^(?=.*[a-z])|(?=.*[ABCDEFGHIJKLMNOPQRSTUVWXYZ])/;
export const authFormSchema = (type: string) => z.object({
  email: z.string().email(
      {
        message: "Not a valid email"
      }
      ),
  username: z.string().min(6,
      {
        message: "Username must be longer than 6 characters"
      }),
  password: z.string().min(10,
      {
        message: "Password must be longer than 10 characters"
      }
  ).regex(passwordPattern,
      {
        message: "Password must include at least 1 number & special character"
      }
  ),
  confirmPass: type === 'sign-in' ? z.string().optional() : z.string(),
}).superRefine(({ password, confirmPass }, context) => {
  if (password !== confirmPass && type === 'sign-up')
  {
      context.addIssue({
          path: ['password'],
          code: 'custom',
          message: 'Passwords must match'
      });
      context.addIssue({
          path: ['confirmPass'],
          code: 'custom',
          message: 'Passwords must match'
      });
  }
});
