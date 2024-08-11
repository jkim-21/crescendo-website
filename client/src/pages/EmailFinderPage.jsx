import React, { useState, useEffect } from 'react';
import { SearchTable, Footer, Sidebar } from '../components';
import { styles } from '../style'
import { useNavigate } from 'react-router-dom'
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';
import { TextField, MenuItem, Button } from '@mui/material';
import { states, miles } from '../data/tools-pages'
import SearchIcon from '@mui/icons-material/Search';
import CurrentLocationButton from '../components/Tools/EmailFinder/CurrentLocationButton';
import ClearIcon from '@mui/icons-material/Clear';
import InfoPopUp from '../components/Tools/EmailFinder/InfoPopUp';

const EmailFinderPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [locationState, setLocationState] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [mileRadius, setMileRadius] = useState('N/A');
    const [stateIncluded, setStateIncluded] = useState(true);
    useBodyBackgroundColor('#f6f8fe');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddressFound = (newAddress) => {
        try {
            const addressParts = newAddress.split(',');
            if (addressParts.length >= 3) {
                const stateZip = addressParts[2].trim().split(' ');
                if (stateZip.length >= 2) {
                    const stateAbbreviation = stateZip[0];
                    if (['IL', 'MA', 'ME'].includes(stateAbbreviation)) {
                        setStreet(addressParts[0].trim());
                        setCity(addressParts[1].trim());
                        setZipCode(stateZip[1]);
                        
                        switch (stateAbbreviation) {
                            case 'ME':
                                setLocationState('Maine');
                                break;
                            case 'IL':
                                setLocationState('Illinois');
                                break;
                            case 'MA':
                                setLocationState('Massachusetts');
                                break;
                        }
                    } else {
                        throw new Error("Your state is not yet supported for this feature");
                    }
                } else {
                    throw new Error("Invalid address format");
                }
            } else {
                throw new Error("Invalid address format");
            }
        } catch (error) {
            console.error("Current location error:", error);
            setError(error.message);
        }
    };

    const handleLocationChange = (e) => {
        setLocationState(e.target.value)
        setStateIncluded(true)
    }

    const handleClear = () => {
        setLocationState("");
        setZipCode("");
        setMileRadius("N/A");
        setStreet("");
        setCity("");
    }

    const fetchData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!locationState && !city && !street && !zipCode) {
                throw new Error('Fill out at least one filter (including state)');
            }

            if (!locationState) {
                setStateIncluded(false)
                throw new Error('You must specify a state');
            }

            if (zipCode && !/^\d{5}$/.test(zipCode)) {
                throw new Error('Zip code must be exactly 5 digits long');
            }

            let response;

            if (mileRadius !== 'N/A') {
                if (!(zipCode && street && city && locationState)){
                    throw new Error('All fields are required when searching by radius');
                }
                const address = `${street}, ${city}, ${locationState} ${zipCode}`;
                const geocodeResponse = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
                const geocodeData = await geocodeResponse.json();

                if (!geocodeResponse.ok) {
                    throw new Error(geocodeData.error || 'An error occurred while geocoding');
                }

                const { lat, lng } = geocodeData;
                response = await fetch(`/api/coords?latitude=${lat}&longitude=${lng}&radius=${mileRadius}`);
            } else {
                response = await fetch(`/api/data?city=${city}&locationState=${locationState}&street=${street}&zipCode=${zipCode}`);
            }

            if (!response.ok) {
                setStateIncluded(true)
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            let result = await response.json();
            
            setData(result);
        } catch (error) {
            console.error("Full error object:", error);
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div className='flex'>
            <Sidebar
                structure='basis-[18%]'/>
            <div className={`${styles.boxWidth} m-auto basis-[82%] z-50`}>
                <div className={`py-[5rem] px-[3rem] min-h-[100vh] flex flex-col items-center m-auto`}>
                    <form
                        onSubmit={fetchData}
                        className="school-inputs flex flex-wrap justify-center items-center mb-[3rem] gap-y-[2rem] px-[2rem] py-[2rem] w-full shadow-sm"
                    >
                        <TextField
                            id='outlined-select-currency'
                            select
                            label="State"
                            value={locationState}
                            onChange={handleLocationChange}
                            helperText='Required'
                            {...stateIncluded ? {} : {error:true}}
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
                            sx={{width: '10rem', borderRadius:1, bgcolor:'white', borderTopRightRadius: 0,
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
                            }}
                            className='lightest-box-shadow'
                        >
                            {states.map((state) => (
                                <MenuItem
                                    key={state.id}
                                    value={state.value}
                                >
                                    {state.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            sx={{bgcolor:'white', borderRadius: 0,
                                '& fieldset': {
                                    borderRadius: 0
                                },
                            }}
                            className='lightest-box-shadow'
                        />
                        <TextField
                            label="Street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            sx={{bgcolor:'white', borderRadius: 0,
                                '& fieldset': {
                                    borderRadius: 0
                                },
                            }}
                            className='lightest-box-shadow'
                        />
                        <TextField
                            label="Zip Code"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            sx={{bgcolor:'white', borderRadius: 0,
                                '& fieldset': {
                                    borderRadius: 0
                                },
                            }}
                            className='lightest-box-shadow max-w-[7rem]'
                        />

                        <TextField
                            id='outlined-select-mile-radius'
                            select
                            value={mileRadius}
                            label='Mile Radius'
                            onChange={(e) => setMileRadius(e.target.value) }
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
                            sx={{borderRadius:1, bgcolor:'white', width:'6rem', borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                '& fieldset': {
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                },
                            }}
                            className='lightest-box-shadow'
                        >
                            {miles.map((mile) => (
                                <MenuItem
                                    key={mile.id}
                                    value={mile.value}
                                >
                                    {mile.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div className="flex gap-2 mt-4">
                            <CurrentLocationButton onAddressFound={handleAddressFound} />
                            <Button
                                variant='contained'
                                startIcon={<SearchIcon />}
                                type='submit'
                                className='lightest-box-shadow'
                            >
                                Fetch Data
                            </Button>
                            <Button
                                variant='outlined'
                                startIcon={<ClearIcon />}
                                onClick={handleClear}
                                className='lightest-box-shadow'
                            >
                                Clear
                            </Button>
                            <InfoPopUp/>
                        </div>
                    </form>
                    
                    {loading && <p className='mb-[2rem]'>Loading...</p>}
                    
                    {error && (
                        <p className="red-text soft-red-bg border dark-border rounded py-[0.25rem] px-[1rem] mb-[3rem]">
                            Error: {error}
                        </p>
                    )}
                    <div className="w-full">
                        <SearchTable data={data} />
                    </div>
                </div>
                <Footer/>
            </div>
        </div>  
    )}; 

export default EmailFinderPage;