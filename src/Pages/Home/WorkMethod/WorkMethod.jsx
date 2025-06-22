import React from "react";
import {
  FaTruck,
  FaMoneyBillAlt,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";

import WorkMethodCards from "./WorkMethodCards";

const services = [
  {
    id: 1,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaTruck className="text-3xl text-primary" />,
  },
  {
    id: 2,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaMoneyBillAlt className="text-3xl text-primary" />,
  },
  {
    id: 3,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaWarehouse className="text-3xl text-primary" />,
  },
  {
    id: 4,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaBuilding className="text-3xl text-primary" />,
  },
];

const WorkMethod = () => {
  return (
    <section className="py-16 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-4">How It Works</h2>
      <div className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <WorkMethodCards key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default WorkMethod;
