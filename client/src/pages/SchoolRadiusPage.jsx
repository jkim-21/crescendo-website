import React, { useState, useEffect } from 'react';
import { SearchTable, Footer, Sidebar } from '../components';
import { styles } from '../style';
import { useNavigate } from 'react-router-dom';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';

const SchoolRadiusPage = () => {
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [radius, setRadius] = useState("10"); //miles
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [schools, setSchools] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate()
    useBodyBackgroundColor('#f6f8fe');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddressLookup = async () => {
        setError("");
        setLoading(true);
        const encodedAddress = encodeURIComponent(address);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.length > 0) {
                setLatitude(data[0].lat);
                setLongitude(data[0].lon);
            } else {
                setError("Couldn't find coordinates for this address.");
            }
        } catch (err) {
            setError("Error looking up address: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGetCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude.toString());
                    setLongitude(position.coords.longitude.toString());
                    setError("");
                },
                (err) => {
                    setError("Error getting location: " + err.message);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser");
        }
    };

    const handleClick = async () => {
        if (Math.abs(parseFloat(latitude)) > 90 || Math.abs(parseFloat(longitude)) > 180) {
            setError("Invalid Coordinates");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`/api/coords?latitude=${latitude}&longitude=${longitude}&radius=${radius}`);
            if (!response.ok) {
                throw new Error('Response not ok');
            }
            const data = await response.json();
            setSchools(data);
            setCurrentPage(1);
        } catch (err) {
            setError("Error fetching schools: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(schools.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentData = schools.slice(startIdx, endIdx);

    return (
        <div className='flex'>
            <Sidebar structure='light-blue-bg basis-[18%] z-[1]' />
            <div className={`${styles.boxWidth} m-auto basis-[82%] z-50 border-l-2`}>
                <div className={`flex flex-col items-center m-auto pt-[5rem] pb-[2rem] px-[3rem] mx-auto min-h-[100vh]`}>
                    <div className="mb-[2rem] flex flex-col gap-[1rem]">
                        <div className="flex gap-[1rem]">
                            <input
                                type="text"
                                className="p-2 border border-[#9ca3af] rounded flex-grow"
                                placeholder="Enter an address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <button
                                className="p-2 border-2 border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition"
                                onClick={handleAddressLookup}>
                                Lookup Address
                            </button>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input
                                type="text"
                                className="p-2 border border-[#9ca3af] rounded"
                                placeholder="Longitude"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                            />
                            <input
                                type="text"
                                className="p-2 border border-[#9ca3af] rounded"
                                placeholder="Latitude"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                            />
                            <input
                                type="text"
                                className="p-2 border border-[#9ca3af] rounded"
                                placeholder="Radius (miles)"
                                value={radius}
                                onChange={(e) => setRadius(e.target.value)}
                            />
                            <button
                                className="search-button bg-white sea-blue-border sea-blue-text p-2 border-2 rounded transition"
                                onClick={handleClick}>
                                Find Schools
                            </button>
                            <button
                                className="border-2 border-green-500 text-green-500 p-2 rounded hover:bg-green-500 transition hover:text-white"
                                onClick={handleGetCurrentLocation}>
                                Use Current Location
                            </button>
                        </div>
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
                        <SearchTable data={schools} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default SchoolRadiusPage;