import React from "react";
import Slider from "react-slick";
import { slideshows } from '../data/home-page'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Slideshow = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <Slider {...settings} className="container">
            {slideshows.map((slideImage, index) => (
                <div key={index} className='img-body'>
                    <img src = {slideImage.picture} alt = {""}/>
                </div>
            ))} 
        </Slider>
    )}

export default Slideshow


