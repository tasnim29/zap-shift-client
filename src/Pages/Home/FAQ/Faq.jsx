import React, { useState } from "react";

const Faq = () => {
  const data = [
    {
      question: "How do I create an account?",
      answer:
        'Click the "Sign Up" button in the top right corner and follow the registration process.',
    },
    {
      question: "I forgot my password. What should I do?",
      answer:
        'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
    },
    {
      question: "How do I update my profile information?",
      answer:
        'Go to "My Account" settings and select "Edit Profile" to make changes.',
    },
  ];

  const [selected, setSelected] = useState(0);
  return (
    <div className="pb-16  text-center">
      <h2 className="text-3xl font-bold mb-2">What our customers are saying</h2>
      <p className="text-gray-500 mb-10 max-w-3xl mx-auto">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
      <div className="max-w-5xl mx-auto space-y-5">
        {data.map((item, index) => (
          <div
            key={index}
            className={`collapse collapse-arrow border border-base-300 ${
              selected === index ? "bg-[#33929D] text-white" : "bg-base-100"
            }`}
          >
            <input
              type="radio"
              name="my-accordion-2"
              checked={selected === index}
              onChange={() => setSelected(index)}
            />
            <div className="collapse-title font-semibold">{item.question}</div>
            <div className="collapse-content text-sm">
              <hr className="border-t-2 border-dotted border-white/50 my-2" />
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
