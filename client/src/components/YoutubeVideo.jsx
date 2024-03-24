import React from 'react';
import { orgIntroduction } from '../assets';

const YoutubeVideo = () => {
    return (
        <div>
            <video
            controls
            controlsList='nodownload'
            >
                <source src={orgIntroduction} type='video/mp4'/>
            </video>
        </div>
    );
};

export default YoutubeVideo;