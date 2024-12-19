// pages/signout.js
import React from 'react';
import { useRouter } from 'next/router';

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    // Call sign-out API here
    const res = await fetch('/api/auth/signout', {
      method: 'POST',
    });

    if (res.ok) {
      // Redirect to the homepage (index.js) after successful sign-out
      router.push('/');
    } else {
      alert('Failed to sign out');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Sign Out</h1>
      <p>You are about to sign out of your account.</p>
      <button 
        onClick={handleSignOut} 
        style={{ padding: '10px 20px', backgroundColor: '#ff7043', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
