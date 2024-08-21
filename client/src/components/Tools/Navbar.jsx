import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import RequestPopUp from './RequestPopUp.jsx';

const Navbar = () => {
    const { user } = useAuth();
    const [shown, setShown] = useState(true);
    const [showRequestModal, setShowRequestModal] = useState(false);

    const handleShow = () => {
        setShown(!shown);
    };

    const handleOpenRequestModal = () => {
        setShowRequestModal(true);
    };

    //useEffect(async () => {
    //    
    //    const personalDataResponse = await fetch(`/api/personal-info?info=${encodeURIComponent()}`);
    //    const personalData = await personalDataResponse.json();
//
    //},[])

    const handleCloseRequestModal = () => {
        setShowRequestModal(false);
    };

    const ToggleButton = ({ onClick }) => {
        return (
            <button
                className='bg-gray-300 p-2 m-1 rounded hover:bg-gray-400'
                onClick={onClick}
            >
                &#9776;
            </button>
        );
    };

    return (
        <>
            {shown ? (
                <nav className='flex flex-row items-center w-full p-4 bg-white shadow-md'>
                    <ToggleButton onClick={handleShow} />
                    <div className="ml-4 font-semibold">Hello</div>
                    <button
                        variant='contained'
                        onClick={handleOpenRequestModal}
                        className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-auto'
                    >
                        Request
                    </button>
                </nav>
            ) : (
                <div className='m-4'>
                    <ToggleButton onClick={handleShow} />
                </div>
            )}
            {showRequestModal && <RequestPopUp onClose={handleCloseRequestModal} />}
        </>
    );
};

export default Navbar;