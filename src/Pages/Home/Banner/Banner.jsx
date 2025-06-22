import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../../../assets/banner/banner1.png";
import image2 from "../../../assets/banner/banner2.png";
import image3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <div className="pt-8">
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
        <div>
          <img src={image1} />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={image2} />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={image3} />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
