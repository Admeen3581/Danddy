import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Message
{
  id: string,
  text: string,
  sentOn: {toDate: () => Date}
}
