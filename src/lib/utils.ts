import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string | null) {
  if (!name) return null
  const words = name.split(' ');

  const initials = words.map(word => word.charAt(0).toUpperCase());

  const firstTwoInitials = initials.slice(0, 2).join('').slice(0, 2);
  return firstTwoInitials;
}


