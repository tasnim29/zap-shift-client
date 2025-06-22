import React from "react";

import liveParcel from "../../../assets/Benefits/liveParcel.png";
import safe from "../../../assets/Benefits/safe.png";
import support from "../../../assets/Benefits//support.png";
import BenefitCard from "./BenefitCard";

const benefits = [
  {
    id: 1,
    image: liveParcel,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    id: 2,
    image: safe,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    id: 3,
    image: support,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const Benefits = () => {
  return (
    <section className="pb-16 ">
      {/* <hr className="border-t border-dotted border-gray-400 w-full my-16" /> */}
      <div className="space-y-8 ">
        {benefits.map((item) => (
          <BenefitCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Benefits;
