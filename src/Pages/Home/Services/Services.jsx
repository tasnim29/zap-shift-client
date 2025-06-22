import React from "react";
import {
  FaTruck,
  FaGlobeAsia,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";
import ServicesCard from "./ServicesCard";

const servicesData = [
  {
    icon: (
      <FaTruck className="text-4xl text-primary group-hover:text-secondary" />
    ),
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in major cities. Express delivery available in Dhaka within 4–6 hours.",
  },
  {
    icon: (
      <FaGlobeAsia className="text-4xl text-primary group-hover:text-secondary" />
    ),
    title: "Nationwide Delivery",
    description:
      "Home delivery in every district, ensuring your parcels reach anywhere in 48–72 hours.",
  },
  {
    icon: (
      <FaWarehouse className="text-4xl text-primary group-hover:text-secondary" />
    ),
    title: "Fulfillment Solution",
    description:
      "We offer inventory management, order processing, packaging, and after-sales support.",
  },
  {
    icon: (
      <FaMoneyBillWave className="text-4xl text-primary group-hover:text-secondary" />
    ),
    title: "Cash on Home Delivery",
    description:
      "Cash on delivery all over Bangladesh with secure handling of your product.",
  },
  {
    icon: (
      <FaBuilding className="text-4xl text-primary group-hover:text-secondary" />
    ),
    title: "Corporate Logistics",
    description:
      "Custom logistics contracts, including warehouse & inventory support for large businesses.",
  },
  {
    icon: (
      <FaUndoAlt className="text-4xl text-primary group-hover:text-secondary" />
    ),
    title: "Parcel Return",
    description:
      "Reverse logistics for returns/exchanges with smooth integration into your operations.",
  },
];

const Services = () => {
  return (
    <section className="py-16 px-24 bg-[#03373D] rounded-3xl max-w-8xl max-auto">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">Our Services</h2>
        <p className="text-[#DADADA] mb-10 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => (
            <ServicesCard key={idx} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
