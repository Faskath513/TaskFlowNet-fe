import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // If the user is not logged in, show a login prompt
  if (!session) {
    return (
      <div>
        <h1>Please log in to access the dashboard.</h1>
      </div>
    );
  }

  // Conditionally redirect based on role
  if (session?.user.role === 'HR') {
    // Redirect to HR Dashboard
    router.push('/hr');
  } else if (session?.user.role === 'Manager') {
    // Redirect to Manager Dashboard
    router.push('/manager');
  } else if (session?.user.role === 'Employee') {
    // Redirect to Employee Dashboard
    router.push('/employee');
  }

  // If no specific redirection (i.e., in case role doesn't match), display general dashboard info
  return (
    <div>
      <h1>Welcome, {session?.user.username}!</h1>
      <p>Your role is: {session?.user.role}</p>
      <p>Your JWT token: {session?.user.token}</p> {/* Optional, hide in production */}
    </div>
  );
};

export default Dashboard;
