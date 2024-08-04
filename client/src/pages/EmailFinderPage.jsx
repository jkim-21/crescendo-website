import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, AnimationLayout, SearchTable, Footer, Sidebar } from '../components';
import { styles } from '../style'


const EmailFinderPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [locationState, setLocationState] = useState(''); //cant just do state because state is another real command
    const itemsPerPage = 10;

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
            setCurrentPage(1); // Reset to first page when new data is fetched   
        }
        catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    //goes to the next page (the next 10 or whatever you choose for items per page)
    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    //goes back a page in the same way handlenextpage goes forward a page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    return (
        <AnimationLayout>
            <div className='flex'>
                <Sidebar
                    structure='light-blue-bg basis-[18%]' />
                <div className={`basis-[82%] flex flex-col items-center bg-white shadow-lg m-auto pt-[5rem] pb-[2rem] px-[3rem] mx-auto min-h-[100vh]`}>
                    <div className="mb-4 flex space-x-4">
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
                        <button
                            className="p-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
                            onClick={fetchData}>
                            Fetch Data
                        </button>
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="p-2 border border-gray-400 rounded" />
                        <input
                            type="text"
                            placeholder="State (not state code)"
                            value={locationState}
                            onChange={(e) => setLocationState(e.target.value)}
                            className="p-2 border border-gray-400 rounded" />
                        <input
                            type="text"
                            placeholder="Street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="p-2 border border-gray-400 rounded" />
                    </div>

                    {loading ? <p> Loading... </p> : null}

                    {error ? <p className="text-red-500 border border-black bg-red-300"> Error: {error} </p> : null}

                    <div className="w-full">
                        <SearchTable
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            data={data} />

                        <div className="flex justify-between mt-4">
                            <button
                                className="p-2 border border-gray-400 rounded disabled:opacity-50"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}>
                                Previous
                            </button>

                            <span className="p-2">Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}</span>

                            <button
                                className="p-2 border border-gray-400 rounded disabled:opacity-50"
                                onClick={handleNextPage}
                                disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </AnimationLayout>
    )
};

export default EmailFinderPage;