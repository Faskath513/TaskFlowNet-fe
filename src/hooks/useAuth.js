import { useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session } = useSession();
  
  if (!session) {
    // Handle session not found case
    return { user: null };
  }

  return { user: session.user }; // Assuming session contains the user data
};
