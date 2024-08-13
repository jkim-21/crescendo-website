import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
    const { user } = useAuth();
    const [shown, setShown] = useState(true);
    const [showPopUp, setShowPopUp] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [greeting, setGreeting] = useState('');
    const [error, setError] = useState('');

    const handleShow = () => {
        setShown(!shown);
    };

    const ToggleButton = ({ onClick }) => {
        return (
            <button
                className='bg-gray-300 p-2 m-1 rounded hover:bg-gray-400'
                onClick={onClick}
            >
                &#9776;
            </button>
        )
    }

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await fetch(`/api/check-user?email=${encodeURIComponent(user.email)}`);
                const data = await response.json();
                if (data.exists) {
                    setGreeting(`Yo ${data.firstName}, How you doing big Dog`);
                } else {
                    setShowPopUp(true);
                }
            } catch (error) {
                console.error('Error checking user:', error);
            }
        };

        if (user && user.email) {
            checkUser();
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (firstName.length < 1 || lastName.length < 1) {
                throw new Error("First and last name are required");
            }
            const response = await fetch(`/api/add-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    firstName,
                    lastName
                }),
            });
            const data = await response.json();
            if (data.success) {
                setShowPopUp(false);
                setGreeting(`What's good, ${data.firstName}?`);
            } else {
                throw new Error(data.error || 'Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user', error);
            setError(error);
        }
    };

    return (
        <>
            { shown ?
            (<nav className='flex flex-row items-center w-full p-4 bg-white shadow-md'>
                <ToggleButton onClick={handleShow} />
                <div className="ml-4 font-semibold">{greeting}</div>
            </nav>) : <div className='m-4'><ToggleButton onClick={handleShow}/></div>
            }
            {showPopUp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h3 className="text-2xl font-bold mb-6">Please enter your name</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Submit
                            </button>
                            {error && <div className='bg-red-400 m-3'>{error}</div>}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;