// pages/api/auth/signout.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Here you can clear the authentication token from the client's cookies or session
      // Example: Clearing the token from cookies
      res.setHeader('Set-Cookie', 'authToken=; Max-Age=0; path=/; HttpOnly; SameSite=Strict');
  
      // Respond with success message
      return res.status(200).json({ message: 'Signed out successfully' });
    }
  
    // If not POST request
    res.status(405).json({ message: 'Method Not Allowed' });
  }
  