// login.jsx
import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from '../assets/chapter-background.jpg'; // Adjust the path as needed

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      if (email.endsWith('@crescendoforacause.com')) {
        navigate('/'); // Redirect to home after successful login
      } else {
        await auth.signOut();
        setError('You must use an @crescendoforacause.com email to access this page.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome to Crescendo Tools!</h1>
      <p>These are only accessible by organization members. Please log in with a @crescendoforacause.com email to access these pages.</p>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      {error && <p>{error}</p>}
      <p>Not an organization member? Click <Link to="/">here</Link> to return to the main site</p>
      <style jsx>{`
        .login-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-image: url(${backgroundImage});
          background-size: cover;
          background-position: center;
          text-align: center;
          padding: 2rem;
          color: white;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }
        button {
          padding: 1rem 2rem;
          background-color: #4285F4;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
        button:hover {
          background-color: #357AE8;
        }
        p {
          margin-top: 1rem;
          color: white;
        }
        p a {
          color: #00f;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Login;
