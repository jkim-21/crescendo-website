import React, { useState, useEffect } from 'react';
import {SearchTable, Footer, Sidebar} from '../components';
import {styles} from '../style'
import {useNavigate} from 'react-router-dom'
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';
import { TextField, MenuItem, Button} from '@mui/material';
import {states, miles} from '../data/tools-pages'
import SearchIcon from '@mui/icons-material/Search';


  
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

    const handleLocationChange = (e) => {
        setLocationState(e.target.value)
        setStateIncluded(true)
    }

    const fetchData = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        try {
            if (!locationState && !city && !street) {
                setStateIncluded(false)
                throw new Error('Fill out at least one filter (including state)');
            }

            if (!locationState) {
                setStateIncluded(false)
                throw new Error('You must specify a state');
            }
            if (zipCode) {
                for (let i = 0; i < zipCode.length; i++) {
                    if (zipCode[i] < '0' || zipCode[i] > '9') {
                        throw new Error('Zip code must contain only digits');
                    }
                }
                if (zipCode.length !== 5) {
                    throw new Error('Zip code must be exactly 5 integers long');
                  }
            }
            
            const response = await fetch(`/api/data?city=${city}&locationState=${locationState}&street=${street}&zipCode=${zipCode}`);

            if (!response.ok) {
                setStateIncluded(true)
                const errorData = await response.json();
                throw new Error(errorData.error);
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
                        <Button
                            variant='contained'
                            startIcon={<SearchIcon />}
                            type='submit'
                            sx={{ml:'3rem'}}
                            className='lightest-box-shadow self-stretch'
                        >
                            Fetch Data
                        </Button>
                    </form>
                    <button
                        className="p-1 border-2 border-green-500 text-green-500 rounded bg-white hover:bg-green-500 hover:text-white transition mb-[2rem]"
                        onClick={() => navigate('/school-finder')}
                    >
                            Search by coordinates
                        </button>
                    {loading ?
                        <p className='mb-[2rem]'>
                            Loading...
                        </p> : null}
                    
                    {error ?
                        <p className="red-text soft-red-bg border dark-border rounded py-[0.25rem] px-[1rem] mb-[3rem]">
                            Error: {error}
                        </p> : null}
                    <div className="w-full">
                        <SearchTable
                            data = {data}
                        />
                    </div>
                </div>
                <Footer/>
            </div>
        </div>  
    )}; 

export default EmailFinderPage;