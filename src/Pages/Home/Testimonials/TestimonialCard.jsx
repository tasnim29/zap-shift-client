import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ item }) => {
  return (
    <div className="bg-base-200 rounded-xl shadow-md p-6 max-w-md w-full text-left relative">
      <FaQuoteLeft className="text-2xl text-primary mb-4" />
      <p className="text-gray-700 mb-4">{item.quote}</p>
      <hr className="border-dotted border-gray-300 mb-4" />
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm text-gray-500">{item.profession}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
