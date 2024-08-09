import React, { useState, useEffect } from 'react';
import { SearchTable, Footer, Sidebar } from '../components';
import { styles } from '../style';
import { useNavigate } from 'react-router-dom';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';
import { TextField, MenuItem, Button, Tabs, Tab } from '@mui/material';
import { states } from '../data/tools-pages';
import SearchIcon from '@mui/icons-material/Search';
import CurrentLocationButton from '../components/Tools/EmailFinder/CurrentLocationButton';

const EmailFinderPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [locationState, setLocationState] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [address, setAddress] = useState('');
    const [radius, setRadius] = useState('10');

    useBodyBackgroundColor('#f6f8fe');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddressFound = (newAddress) => {
        setAddress(newAddress);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleLocationChange = (e) => {
        setLocationState(e.target.value);
    };

    const fetchData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!locationState && !city && !street) {
                throw new Error('Fill out at least one filter (including state)');
            }

            if (!locationState) {
                throw new Error('You must specify a state');
            }

            if (zipCode && !/^\d{5}$/.test(zipCode)) {
                throw new Error('Zip code must be exactly 5 digits long');
            }

            const response = await fetch(`/api/data?city=${city}&locationState=${locationState}&street=${street}&zipCode=${zipCode}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An error occurred while fetching data');
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddressData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!address) {
                throw new Error('Please enter an address');
            }

            const geocodeResponse = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
            const geocodeData = await geocodeResponse.json();

            if (!geocodeResponse.ok) {
                throw new Error(geocodeData.error || 'An error occurred while geocoding');
            }

            const { lat, lng } = geocodeData;

            const response = await fetch(`/api/coords?latitude=${lat}&longitude=${lng}&radius=${radius}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An error occurred while fetching data');
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Full error object:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex'>
            <Sidebar structure='bg-[#f9f9fa] basis-[18%]' />
            <div className={`${styles.boxWidth} m-auto basis-[82%] z-50`}>
                <div className={`py-[5rem] px-[3rem] min-h-[100vh] flex flex-col items-center m-auto`}>
                    <Tabs value={tabValue} onChange={handleTabChange} className="mb-[2rem]">
                        <Tab label="Email Finder" />
                        <Tab label="Address Search" />
                    </Tabs>

                    <div className="w-full" style={{ minHeight: '600px' }}>
                        <div style={{ minHeight: '200px' }}>
                            {tabValue === 0 && (
                                <form onSubmit={fetchData} className="school-inputs flex flex-wrap justify-center items-center mb-[3rem] gap-y-[2rem] px-[2rem] py-[2rem] w-full shadow-sm">
                                    <TextField
                                        select
                                        label="State"
                                        value={locationState}
                                        onChange={handleLocationChange}
                                        helperText='Required'
                                        error={!locationState}
                                        SelectProps={{
                                            MenuProps: {
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 170,
                                                        overflow: 'auto',
                                                    },
                                                },
                                            },
                                        }}
                                        sx={{
                                            width: '10rem', borderRadius: 1, bgcolor: 'white', borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                            '& fieldset': {
                                                borderTopRightRadius: 0,
                                                borderBottomRightRadius: 0,
                                            },
                                            '& .MuiFormHelperText-root': {
                                                position: 'absolute',
                                                bottom: '-1.5rem',
                                                left: '-1rem',
                                                padding: '0 0.5rem',
                                            },
                                        }} className='lightest-box-shadow'
                                    >
                                        {states.map((state) => (
                                            <MenuItem key={state.id} value={state.value}>
                                                {state.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        label="City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        sx={{ bgcolor: 'white', borderRadius: 0 }}
                                        className='lightest-box-shadow'
                                    />
                                    <TextField
                                        label="Street"
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        sx={{ bgcolor: 'white', borderRadius: 0 }}
                                        className='lightest-box-shadow'
                                    />
                                    <TextField
                                        label="Zip Code"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        sx={{ bgcolor: 'white', borderRadius: 0 }}
                                        className='lightest-box-shadow max-w-[7rem]'
                                    />
                                    <div className="w-full flex justify-center mt-4">
                                        <Button
                                            variant='contained'
                                            startIcon={<SearchIcon />}
                                            type='submit'
                                            className='lightest-box-shadow'
                                        >
                                            Fetch Data
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {tabValue === 1 && (
                                <form onSubmit={fetchAddressData} className="school-inputs flex flex-wrap justify-center items-center mb-[3rem] gap-y-[2rem] px-[2rem] py-[2rem] w-full shadow-sm">
                                    <TextField
                                        label="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        sx={{ bgcolor: 'white', borderRadius: 0, width: '300px' }}
                                        className='lightest-box-shadow'
                                    />
                                    <TextField
                                        label="Radius (miles)"
                                        value={radius}
                                        onChange={(e) => setRadius(e.target.value)}
                                        sx={{ bgcolor: 'white', borderRadius: 0, width: '150px' }}
                                        className='lightest-box-shadow'
                                    />
                                    <div className="w-full flex justify-center gap-4 mt-4">
                                        <CurrentLocationButton onAddressFound={handleAddressFound} />
                                        <Button
                                            variant='contained'
                                            startIcon={<SearchIcon />}
                                            type='submit'
                                            className='lightest-box-shadow'
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {loading && <p className='mb-[2rem]'>Loading...</p>}

                        {error && (
                            <div className="red-text soft-red-bg border dark-border rounded py-[0.25rem] px-[1rem] mb-[3rem]">
                                <p>Error: {error}</p>
                                <p>Please check the console for more detailed error information.</p>
                            </div>
                        )}

                        <div className="w-full">
                            <SearchTable data={data} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default EmailFinderPage;