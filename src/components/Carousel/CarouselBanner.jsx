import "./CarouselBanner.scss";

import BannerHome1 from "../../assets/banner-home-1.webp";
import BannerHome2 from "../../assets/banner-home-2.webp";
import BannerHome3 from "../../assets/7915158.jpg";

import { Carousel, Image } from "antd";
import { useState } from "react";

// const bannerCarousel = [Banner1, Banner2, Banner3, Banner4];

const CarouselBanner = () => {
  const [slider, setSlider] = useState([]);

  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      <div className="carousel-container">
        <Carousel effect>
          <div className="scroll-img">
            <Image preview={false} src={BannerHome1} />
          </div>
          <div className="scroll-img">
            <Image preview={false} src={BannerHome2} />
          </div>{" "}
          {/* <div className="scroll-img">
            <Image preview={false} src={BannerHome3} />
          </div> */}
          {/* <div className="scroll-img">
            <Image preview={false} src={}></Image>
          </div>
          <div className="scroll-img">
            <Image preview={false} src={}></Image>
          </div> */}
        </Carousel>
      </div>
    </>
  );
};

export default CarouselBanner;
