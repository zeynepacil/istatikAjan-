import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Agent 1: Literature Logic
export const extractLatex = (text: string): string[] => {
  // Regex to match $...$ or $$...$$
  // Note: This is a simplified regex for client-side demonstration
  const regex = /\$\$[\s\S]*?\$\$|\$[\s\S]*?\$/g;
  const matches = text.match(regex);
  return matches || [];
};

// Agent 2: Statistics Logic
export const generatePValue = (): { value: number; formatted: string } => {
  const p = Math.random() * 0.1; // Skew towards significant results for demo
  
  let formatted = "";
  if (p < 0.001) {
    formatted = "< .001";
  } else {
    // Round to 3 decimals, remove leading zero for APA style
    formatted = p.toFixed(3).replace(/^0+/, ''); 
    // Ensure it looks like .123 instead of .12
    if (!formatted.startsWith('.')) formatted = formatted.replace(/^0+/, '');
    if (formatted.startsWith("1.000")) formatted = "1.000"; // Edge case
  }
  
  return { value: p, formatted };
};

// Agent 3: Reviewer Logic
export const checkWordCount = (text: string): { count: number; valid: boolean; message: string } => {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const count = words.length;
  const valid = count >= 150 && count <= 250;
  
  let message = "Abstract passed pre-check.";
  if (count < 150) message = `Too short (${count} words). Minimum is 150.`;
  if (count > 250) message = `Too long (${count} words). Maximum is 250.`;
  
  return { count, valid, message };
};