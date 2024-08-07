// SavedSchoolsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar, AnimationLayout, Footer, Sidebar } from '../components';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';

const SavedSchoolsPage = () => {
    const [savedSchools, setSavedSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    useBodyBackgroundColor('#f6f8fe')

    useEffect(() => {
        const fetchSavedSchools = async () => {
            if (!user || !user.email) return;

            try {
                const response = await fetch(`/api/saved-schools?email=${encodeURIComponent(user.email)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch saved schools');
                }
                const data = await response.json();
                setSavedSchools(data);
            } catch (err) {
                console.error('Error fetching saved schools:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedSchools();
    }, [user]);

    const handleSchoolClick = (schoolName) => {
        navigate(`/school/${encodeURIComponent(schoolName)}`);
    };

    const handleBack = () => {
        navigate(`/tools/email-finder-system${location.search}`);
    };

    return (
        <AnimationLayout>
            <div className='flex'>
                <Sidebar structure='light-blue-bg basis-[18%]' />
                <div className={`basis-[82%] flex flex-col items-center bg-white shadow-lg m-auto pt-[5rem] pb-[2rem] px-[3rem] mx-auto min-h-[100vh]`}>
                    <h1 className="text-2xl font-bold mb-4">Saved Schools</h1>
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                        Back to Search
                    </button>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {!loading && !error && (
                        <ul className="w-full">
                            {savedSchools.map((school) => (
                                <li
                                    key={school.INDEX_NUMBER}
                                    className="p-4 border-b cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSchoolClick(school.SCH_NAME)}
                                >
                                    {school.SCH_NAME} (Index: {school.INDEX_NUMBER})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <Footer />
        </AnimationLayout>
    );
};

export default SavedSchoolsPage;