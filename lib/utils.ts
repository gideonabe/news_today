import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cleanText(text: string): string {
  if (!text) return "";

  return text
    // Remove HTML tags
    .replace(/<[^>]+>/g, " ")
    // Remove "[+xxxx chars]" or similar patterns
    .replace(/\[\+\d+\s*chars\]/gi, "")
    // Remove "Read more" phrases or URLs if present
    .replace(/(Read more|Click here|Continue reading)[\s\S]*$/i, "")
    // Replace multiple spaces/newlines with a single space
    .replace(/\s+/g, " ")
    // Trim extra spaces
    .trim();
}