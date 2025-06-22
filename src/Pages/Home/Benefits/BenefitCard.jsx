import React from "react";

const BenefitCard = ({ item }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center bg-base-200 rounded-lg shadow-md overflow-hidden p-6 gap-6 hover:shadow-xl transition duration-300">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full md:w-1/3 h-40 object-contain"
      />

      {/* Divider */}
      <div className="hidden md:block border-l border-dotted border-gray-400 h-28"></div>

      {/* Text Content */}
      <div className="text-center md:text-left md:w-2/3">
        <h3 className="text-2xl font-semibold mb-2 text-primary">
          {item.title}
        </h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
