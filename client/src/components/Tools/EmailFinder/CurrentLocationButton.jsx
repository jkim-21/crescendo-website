import React, { useState } from 'react';
import { Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CurrentLocationButton = ({ onAddressFound }) => {
    const [loading, setLoading] = useState(false);
    const baseURL = import.meta.env.HEROKU_BASE_URL || "";

    const handleGetCurrentLocation = () => {
        setLoading(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const response = await fetch(`${baseURL}/api/reverse-geocode?lat=${latitude}&lng=${longitude}`);
                        if (!response.ok) {
                            throw new Error('Failed to get address');
                        }
                        const data = await response.json();
                        onAddressFound(data.address);
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Failed to get current location. Please try again.');
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error('Error:', error);
                    alert('Failed to get current location. Please make sure location services are enabled.');
                    setLoading(false);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
            setLoading(false);
        }
    };

    return (
        <Button
            variant="outlined"
            startIcon={<LocationOnIcon />}
            onClick={handleGetCurrentLocation}
            disabled={loading}
        >
            {loading ? 'Getting Location...' : 'Use Current Location'}
        </Button>
    );
};

export default CurrentLocationButton;