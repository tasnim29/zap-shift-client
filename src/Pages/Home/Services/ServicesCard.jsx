import React from "react";

const ServicesCard = ({ service }) => {
  return (
    <div className="card bg-base-200 rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:bg-[#CAEB66]  group p-6 cursor-pointer">
      <div className="flex justify-center mb-4   transition duration-300">
        {service.icon}
      </div>
      <h3 className="text-xl font-semibold text-primary group-hover:text-secondary mb-2 text-center">
        {service.title}
      </h3>
      <p className="text-gray-600  text-center group-hover:text-secondary transition duration-300">
        {service.description}
      </p>
    </div>
  );
};

export default ServicesCard;
