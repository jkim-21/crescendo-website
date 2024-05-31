import React from 'react';

const YoutubeVideo = () => {
    return (
        <div className='w-full'>
            <iframe 
            width = '100%'
            height = '100%'
            src="https://www.youtube.com/embed/GCVOK_cSyPo?si=9fnsgwe6_cGEoWMr" 
            title="C4C Youtube Introduction" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className='[aspect-ratio:1.7/1]'></iframe>
        </div>
    );
};

export default YoutubeVideo;