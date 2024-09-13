import React, {useState} from 'react';
import { RestrictedDashboard, ErrorButton } from '../components';
import { Button} from '@mui/material';
import { auth } from '../config/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../context/AuthContext.jsx';


const RestrictedPage = () => {
    const baseURL = import.meta.env.VITE_HEROKU_BASE_URL || '';

    const { user, setUser } = useAuth();
    const [error, setError] = useState('');
    
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
    
        try {
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email;
            if (email.endsWith('@crescendoforacause.com')) {
                setUser(result.user);

                const userCheck = await fetch(`${baseURL}/api/check-user?email=${encodeURIComponent(result.user.email)}`);
                const userData = await userCheck.json();

                if (!userData.exists) {
                    const response = await fetch(`${baseURL}/api/add-user`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_id: result.user.uid,
                            email: result.user.email,
                            displayName: result.user.displayName,
                            photoUrl: result.user.photoURL
                        }),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to store user information!')
                    }
                }
                navigate('/tools');
            }
            else {
                await auth.signOut();
                setError('Invalid Gmail Account');
            }
        }  
        catch (error) {
            console.error(error.message);
        }
        };

    return (
        <div style={{ position: 'relative', overflow:'hidden' }}>
            <div style={{filter: 'blur(10px)', pointerEvents: 'none'}}>
                <RestrictedDashboard/>
            </div>
            <div className='fixed inset-0 bg-white bg-opacity-80 z-[1000] flex justify-center items-center'>
                <div className='text-center dark-gray-text'>
                    <h2>Access Restricted</h2>
                    <p className='mb-[1rem]'>
                        You need a crescendoforacause.com email address to access your dashboard and tools.
                    </p>
                    <Button
                        variant='contained'
                        onClick={handleGoogleSignIn}
                        sx={{
                            backgroundColor: 'black', color: 'white', boxShadow: 1, mb: '1rem',
                            '&:hover': {
                              color: 'white',
                              backgroundColor: 'black',
                              boxShadow: 3
                            },
                          }}
                    >
                        Login   
                    </Button>
                    {error && 
                        <ErrorButton errorMessage={error}/>
                    }
                    
                </div>
            </div>
        </div>
    )}

export default RestrictedPage;