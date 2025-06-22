import React from "react";
import Marquee from "react-fast-marquee";
import brand1 from "../../../assets/brands/amazon.png";
import brand2 from "../../../assets/brands/amazon_vector.png";
import brand3 from "../../../assets/brands/casio.png";
import brand4 from "../../../assets/brands/moonstar.png";
import brand5 from "../../../assets/brands/randstad.png";
import brand6 from "../../../assets/brands/start.png";
import brand7 from "../../../assets/brands/start-people 1.png";

const brands = [
  { id: 1, src: brand1, alt: "Amazon" },
  { id: 2, src: brand2, alt: "Amazon Vector" },
  { id: 3, src: brand3, alt: "Casio" },
  { id: 4, src: brand4, alt: "Moonstar" },
  { id: 5, src: brand5, alt: "Randstad" },
  { id: 6, src: brand6, alt: "Start" },
  { id: 7, src: brand7, alt: "Start People" },
];

const BrandSlider = () => {
  return (
    <section className="py-16 ">
      <h2 className="text-3xl font-bold text-center text-[#03373D] mb-10">
        We've helped thousands of sales teams
      </h2>
      <Marquee gradient={true} speed={50}>
        {brands.map((brand) => (
          <img
            key={brand.id}
            src={brand.src}
            alt={brand.alt}
            className="h-6 mx-24 object-contain"
          />
        ))}
      </Marquee>
    </section>
  );
};

export default BrandSlider;
