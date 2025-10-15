import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-gray-200">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center py-4 text-left hover:text-primary transition-colors duration-300"
    >
      <h3 className="text-base font-medium text-text-dark pr-8">{question}</h3>
      <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-primary transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-700 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100 mb-2' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="pb-4 text-sm text-text-muted leading-relaxed">
        {answer}
      </div>
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: 'How fresh are the fruits and vegetables?',
      answer: 'All our produce is farm-fresh and harvested within 24-48 hours before delivery. We work directly with local farmers to ensure you receive the freshest fruits and vegetables at peak ripeness.',
    },
    {
      question: 'What are your delivery timings and areas?',
      answer: 'We deliver daily between 7 AM to 9 PM across Pune and surrounding areas. Same-day delivery is available for orders placed before 12 PM. Check your pincode at checkout for availability.',
    },
    {
      question: 'Do you offer a satisfaction guarantee?',
      answer: 'Absolutely! If you are not satisfied with the quality of any product, contact us within 24 hours of delivery. We offer full refunds or replacements for items that do not meet our quality standards.',
    },
    {
      question: 'Are your products 100% organic and pesticide-free?',
      answer: 'Yes! We have a dedicated range of certified organic products. All organic items are clearly labeled on product pages. We also offer pesticide-free conventionally grown produce from trusted farms.',
    },
    {
      question: 'How can I track my order and delivery status?',
      answer: 'Once your order is confirmed, you will receive updates via SMS and email. You can track real-time delivery status by logging into your account and checking the Order History section anytime.',
    },
    {
      question: 'Can I schedule delivery for a specific date and time?',
      answer: 'Yes! During checkout, you can select your preferred delivery date and time slot. We recommend scheduling at least 24 hours in advance to ensure availability and optimal freshness of your order.',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className=" bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
        <div className="text-left mb-8">
          <h2 className="text-4xl font-semibold text-text-dark">Frequently Asked Questions</h2>
          <div className="flex items-center gap-1 mt-4">
            <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
            <div className="w-10 h-1 bg-primary rounded-full"></div>
            <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
          </div>
        </div>
        <div>
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
