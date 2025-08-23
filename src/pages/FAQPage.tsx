/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const faqs = [
  {
    question: "How can I book a ride?",
    answer:
      "You can book a ride directly from the home screen by entering your pickup and drop-off locations.",
    category: "General",
  },
  {
    question: "How do I contact emergency services?",
    answer:
      "During your ride, you can use the Emergency button to quickly call 999 for immediate assistance.",
    category: "Safety",
  },
  {
    question: "Can I schedule a ride in advance?",
    answer:
      "Yes, you can schedule a ride in advance by selecting the 'Schedule Ride' option while booking.",
    category: "Booking",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index : any)  => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-xl bg-card shadow-sm"
          >
            {/* Accordion Trigger */}
            <button
              onClick={() => toggleAccordion(index)}
              className="flex items-center justify-between w-full px-4 py-3 text-left text-foreground font-medium hover:bg-accent rounded-xl"
            >
              <span>{faq.question}</span>
              <span
                className={`transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* Accordion Content */}
            {openIndex === index && (
              <div className="px-4 pb-4 text-muted-foreground">
                {faq.answer}
                <div className="mt-2 inline-block px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                  {faq.category}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
