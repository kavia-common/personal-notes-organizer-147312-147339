import { User } from "../types";

// PUBLIC_INTERFACE
export function useUser(): User | null {
  // Placeholder: in a real app, replace with auth logic
  return {
    id: "demo-user",
    email: "demo@example.com",
    name: "Demo User",
  };
}
