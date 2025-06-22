import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import BrandSlider from "../BrandSlider/BrandSlider";
import Benefits from "../Benefits/Benefits";
import Merchant from "../Merchant/Merchant";
import WorkMethod from "../WorkMethod/WorkMethod";
import Testimonials from "../Testimonials/Testimonials";
import Faq from "../FAQ/Faq";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <WorkMethod></WorkMethod>
      <Services></Services>
      <BrandSlider></BrandSlider>
      <hr className="border-t-3 border-dotted border-gray-400 w-full my-16" />
      <Benefits></Benefits>
      <hr className="border-t-3 border-dotted border-gray-400 w-full my-16" />
      <Merchant></Merchant>
      <Testimonials></Testimonials>
      <Faq></Faq>
    </div>
  );
};

export default Home;
