import React from "react";
import Slider from "react-slick";
import { slideshows } from '../data/home-page';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const Slideshow = () => {
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <ArrowForwardIosIcon fontSize="large"/>,
        prevArrow: <ArrowBackIosNewIcon fontSize="large"/>
      };

    return (
        <Slider {...settings} className="slick z-[40] rounded [aspect-ratio:1.5/1]
                                        md:[aspect-ratio:1.1/1] lg:[aspect-ratio:1.5/1]">
            {slideshows.map((slideImage, index) => (
                <img 
                src = {slideImage.picture} 
                alt = {slideImage.title} 
                key={index} 
                className={`${slideImage.name === 'C4C Donation' ? 'object-top' : ''} rounded object-cover [aspect-ratio:1.5/1]
                            md:[aspect-ratio:1.1/1] lg:[aspect-ratio:1.5/1]`}/>
            ))} 
        </Slider>
    )}

export default Slideshow;


