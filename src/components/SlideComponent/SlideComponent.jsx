import React from "react";
import Slider from "react-slick";
import { Image } from "antd";
import "./style.css";

export default function SlideComponent({ arrImages }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // Tạo mảng mới chứa cặp ảnh liên tiếp
  const pairedImages = [];
  for (let i = 0; i < arrImages.length; i += 2) {
    pairedImages.push(arrImages.slice(i, i + 2));
  }

  return (
    <Slider {...settings}>
      {pairedImages.map((pair, index) => (
        <div className="flex gap-x-3" key={index}>
          {pair.map((image, innerIndex) => (
            <Image
              key={innerIndex}
              width="50%"
              height="50%"
              preview={false}
              src={image}
              className="gap-x-3 p-3"
              alt={`Slide ${index}-${innerIndex}`}
            />
          ))}
        </div>
      ))}
    </Slider>
  );
}
