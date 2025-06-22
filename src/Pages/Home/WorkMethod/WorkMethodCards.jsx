import React from "react";

const WorkMethodCards = ({ service }) => {
  return (
    <div className="bg-base-200 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="mb-4">{service.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );
};

export default WorkMethodCards;
