import React from "react";
import image from "../../../assets/location-merchant.png";

const Merchant = () => {
  return (
    <div
      data-aos="zoom-in-up"
      data-aos-delay="500"
      className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] mb-16 rounded-4xl"
    >
      <div className="hero-content flex-col lg:flex-row-reverse p-20">
        <img src={image} className="max-w-lg rounded-lg " />
        <div>
          <h1 className="text-5xl font-bold">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-[#DADADA]">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn btn-primary rounded-full text-black">
            Become a Merchant
          </button>
          <button className="btn btn-primary btn-outline ms-2 rounded-full text-primary">
            Earn with ProFast Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Merchant;
