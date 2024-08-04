import React, { useState, useEffect } from 'react';
import {SearchTable, Footer, Sidebar} from '../components';
import {styles} from '../style'
import {useNavigate} from 'react-router-dom'
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';

const EmailFinderPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [locationState, setLocationState] = useState(''); //cant just do state because state is another real command
    useBodyBackgroundColor('#f6f8fe');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!locationState && !city && !street) {
                throw new Error('Give at least one arguement');
            }
            const response = await fetch(`/api/data?city=${city}&locationState=${locationState}&street=${street}`);
            if (!response.ok) {
                throw new Error('response not ok !');
            }
            const result = await response.json();
            setData(result);
        }
        catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div className='flex'>
            <Sidebar
            structure='light-blue-bg basis-[18%] z-[1]'/>
            <div className={`${styles.boxWidth} m-auto basis-[82%] z-50 border-l-2`}>
                <div className={`flex flex-col items-center  m-auto pt-[5rem] pb-[2rem] px-[3rem] mx-auto min-h-[100vh]`}>
                    <div className="mb-[2rem] flex gap-[1rem]">
                        <button
                            className="p-2 border-2 border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition"
                            onClick={() => navigate('/saved-schools')}>
                            View Saved Schools
                        </button>
                        <button
                            className="p-2 border-2 border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition"
                            onClick={() => navigate('/school-finder')}>
                            Search by coordinates
                        </button>
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="p-2 border border-[#9ca3af] rounded"/>
                        <input
                            type="text"
                            placeholder="State"
                            value={locationState}
                            onChange={(e) => setLocationState(e.target.value)}
                            className="p-2 border border-gray-400 rounded"/>
                        <input
                            type="text"
                            placeholder="Street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="p-2 border border-gray-400 rounded"/>
                        <button 
                            className="search-button bg-white sea-blue-border sea-blue-text p-2 border-2 rounded transition"
                            onClick={fetchData}>
                                Fetch Data
                        </button>
                    </div>

                    {loading ? 
                        <p className='mb-[2rem]'> 
                            Loading... 
                        </p> : null}
                    
                    {error ? 
                        <p className="red-text soft-red-bg border dark-border rounded py-[0.25rem] px-[1rem] mb-[2rem]"> 
                            Error: {error} 
                        </p> : null}

                    <div className="w-full">
                        <SearchTable
                            data = {data} />
                    </div>
                </div>
                <Footer/>
            </div>
        </div>  
    )}; 

export default EmailFinderPage;