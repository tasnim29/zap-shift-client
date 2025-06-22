import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TestimonialCard from "./TestimonialCard";
import headingImg from "../../../assets/customer-top.png";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "The delivery was incredibly fast and smooth. I felt informed every step of the way!",
      name: "Sarah Khan",
      profession: "E-commerce Manager",
      image:
        "https://wallpapers.com/images/hd/user-avatar-login-icon-ng092795juuuurfp.jpg",
    },
    {
      id: 2,
      quote:
        "Excellent service. Their tracking system is very accurate and easy to use.",
      name: "John Smith",
      profession: "Logistics Specialist",
      image:
        "https://wallpapers.com/images/hd/user-avatar-login-icon-ng092795juuuurfp.jpg",
    },
    {
      id: 3,
      quote:
        "I’ve used many courier services but this one’s the most reliable by far.",
      name: "Ayesha Rahman",
      profession: "Small Business Owner",
      image:
        "https://wallpapers.com/images/hd/user-avatar-login-icon-ng092795juuuurfp.jpg",
    },
    {
      id: 4,
      quote: "Customer support was very helpful and resolved my issue quickly.",
      name: "Michael Lee",
      profession: "Operations Manager",
      image:
        "https://wallpapers.com/images/hd/user-avatar-login-icon-ng092795juuuurfp.jpg",
    },
    {
      id: 5,
      quote:
        "Great pricing and transparent charges. Highly recommend this service!",
      name: "Fatima Noor",
      profession: "Entrepreneur",
      image:
        "https://wallpapers.com/images/hd/user-avatar-login-icon-ng092795juuuurfp.jpg",
    },
    {
      id: 6,
      quote: "The package arrived ahead of schedule and in perfect condition.",
      name: "David Kim",
      profession: "Marketing Director",
      image:
        "https://wallpapers.com/images/hd/user-avatar-login-icon-ng092795juuuurfp.jpg",
    },
    {
      id: 7,
      quote:
        "The online tracking system gave me peace of mind throughout the delivery process.",
      name: "Lina Rodriguez",
      profession: "Freelancer",
      image:
        "https://wallpapers.com/images/hd/user-avatar-login-icon-ng092795juuuurfp.jpg",
    },
    {
      id: 8,
      quote:
        "I appreciate the eco-friendly packaging and sustainable practices.",
      name: "Sanjay Patel",
      profession: "Sustainability Consultant",
      image:
        "https://wallpapers.com/images/hd/user-avatar-login-icon-ng092795juuuurfp.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  // Width of each card (in px)
  const cardWidth = 320; // match max-w-md in tailwind approx

  return (
    <section className="pb-16  text-center">
      {/* Heading */}
      <img
        src={headingImg}
        alt="Quote Icon"
        className="mx-auto mb-4 w-60 h-24"
      />
      <h2 className="text-3xl font-bold mb-2">What our customers are saying</h2>
      <p className="text-gray-500 mb-10 max-w-3xl mx-auto">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>

      {/* Carousel viewport: show 3 cards wide */}
      <div
        className="relative mx-auto overflow-hidden"
        style={{ width: cardWidth * 3 }}
      >
        {/* Cards flex container: width = cardWidth * total cards */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${cardWidth * total}px`,
            transform: `translateX(${-current * cardWidth + cardWidth}px)`,
          }}
        >
          {testimonials.map((item, index) => {
            // Calculate distance from current card
            // 0 means focused, ±1 means immediate neighbors
            let distance = index - current;
            // Fix circular distance for first and last cards
            if (distance < -1) distance += total;
            if (distance > 1) distance -= total;

            // Styling based on distance
            let scale = 0.9;
            let opacity = 0.5;
            let blur = "blur-sm";

            if (distance === 0) {
              scale = 1;
              opacity = 1;
              blur = "blur-0";
            } else if (Math.abs(distance) === 1) {
              scale = 0.95;
              opacity = 0.7;
              blur = "blur-sm";
            } else {
              // cards further away not visible
              return (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-[320px] px-2 invisible"
                />
              );
            }

            return (
              <div
                key={item.id}
                className={`flex-shrink-0 w-[320px] px-2 transition-all duration-500 ease-in-out`}
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                }}
              >
                <div className={blur}>
                  <TestimonialCard item={item} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={prev}
          className="p-3 cursor-pointer rounded-full text-black font-bold bg-white hover:text-white"
        >
          <FaArrowLeft />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === current ? "bg-primary" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>

        <button
          onClick={next}
          className="p-3 cursor-pointer rounded-full text-black font-bold bg-primary hover:text-white"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
