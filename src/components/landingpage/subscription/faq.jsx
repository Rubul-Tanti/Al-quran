import { useRef } from "react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import gsap from "gsap";


const faqData = [
  {
    question: "How do I enroll in a Quran course?",
    answer: "You can enroll by selecting a plan and filling out your details. A teacher will contact you shortly after.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a free trial lesson so you can experience the teaching style before subscribing.",
  },
  {
    question: "What if I miss a class?",
    answer: "You can reschedule your class based on your teacher’s availability.",
  },
  {
    question: "Do you offer 1-on-1 sessions?",
    answer: "Absolutely! All sessions are 1-on-1 with personalized attention for every student.",
  },
];

export default function Faq() {
  return (
    <section className=" py-16 px-4 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <FaqItemComponent key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}

function FaqItemComponent({ question, answer }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  const toggle = () => {
    setOpen(!open);
    const content = contentRef.current;
    if (content) {
      gsap.to(content, {
        height: open ? 0 : content.scrollHeight,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <div className=" shadow-blue-50 rounded-xl bg-white overflow-hidden shadow-sm">
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center px-6 py-4 text-left text-blue-900 font-semibold hover:bg-blue-100 transition"
      >
        <span>{question}</span>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <div
        ref={contentRef}
        style={{ height: 0 }}
        className="px-6 text-blue-800 text-sm overflow-hidden"
      >
        <div className="py-2">{answer}</div>
      </div>
    </div>
  );
}
