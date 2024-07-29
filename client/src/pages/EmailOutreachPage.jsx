import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Navbar} from '../components';
import DataFetchingComponent from '../components/(damien testing)/TestMysql';
import Display from '../components/(damien testing)/Display'

const EmailOutreachPage = () => {
    return (
        <>
        <div className>
            <Navbar/>
            <Routes>
                <Route path="/" element={<DataFetchingComponent/>} />
                <Route path="display/:schoolName" element={<Display/>}/>
            </Routes>
        </div>
        </>
    );
}

export default EmailOutreachPage;