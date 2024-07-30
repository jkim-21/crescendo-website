import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Navbar, AnimationLayout} from '../components';
import DataFetchingComponent from '../components/(damien testing)/TestMysql';
import Display from '../components/(damien testing)/Display'

const EmailFinderPage = () => {
    return (
        <AnimationLayout>
            <div className>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<DataFetchingComponent/>} />
                    <Route path="display/:schoolName" element={<Display/>}/>
                </Routes>
            </div>
        </AnimationLayout>
    );
}

export default EmailFinderPage;