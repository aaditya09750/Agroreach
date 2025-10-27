import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

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
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4'),
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5'),
    },
    {
      question: t('faq.q6'),
      answer: t('faq.a6'),
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className=" bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
        <div className="text-left mb-8">
          <h2 className="text-4xl font-semibold text-text-dark">{t('faq.title')}</h2>
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
