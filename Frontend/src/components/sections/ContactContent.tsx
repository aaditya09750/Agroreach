import React, { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const InfoItem: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
    <div className="flex flex-col items-center justify-center gap-2 p-5 text-center">
      <div className="w-14 h-14 flex-shrink-0 bg-primary-light rounded-full flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="text-base text-text-dark-gray leading-relaxed">
        {children}
      </div>
    </div>
  );
  
const ContactInfoCard: React.FC = () => {
    const { currency } = useCurrency();
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-[0px_0px_56px_0px_rgba(0,38,3,0.08)] h-full">
        <InfoItem icon={<MapPin size={24} />}>
          {currency === 'INR' ? (
            <>
              Manchar - 410503, <br />
              Pune, Maharashtra, India
            </>
          ) : (
            <>
              Lincoln- 344, Illinois, <br />
              Chicago, USA
            </>
          )}
        </InfoItem>
        <hr className="mx-6 border-border-color" />
        <InfoItem icon={<Mail size={24} />}>
          {currency === 'INR' ? (
            <>
              contact@agroreach.in <br />
              support@agroreach.in
            </>
          ) : (
            <>
              contact@agroreach.com <br />
              support@agroreach.com
            </>
          )}
        </InfoItem>
        <hr className="mx-6 border-border-color" />
        <InfoItem icon={<Phone size={24} />}>
          {currency === 'INR' ? (
            <>
              +91 98765 43210 <br />
              +91 87654 32109
            </>
          ) : (
            <>
              +1 (219) 555-0114 <br />
              +1 (312) 555-0487
            </>
          )}
        </InfoItem>
      </div>
    );
};
  
const ContactForm: React.FC = () => {
    const [formState, setFormState] = useState({
      name: '',
      email: '',
      message: '',
      subject: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formState);
    };
  
    return (
      <div className="bg-white p-8 rounded-lg shadow-[0px_0px_56px_0px_rgba(0,38,3,0.08)] h-full">
        <h2 className="text-2xl font-semibold text-text-dark">Just Say Hello!</h2>
        <p className="mt-2 text-sm text-text-muted max-w-md">
          Have a question about our products or need assistance with your order? We're here to help! Reach out to us and we'll get back to you shortly.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formState.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"            />
          </div>
          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subjects"
              value={formState.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
            />
          </div>
          <div>
            <button type="submit" className="bg-primary text-white font-semibold py-4 px-10 rounded-full hover:bg-opacity-90 transition-colors">
              Send Message
            </button>
          </div>
        </form>
      </div>
    );
};

const ContactContent: React.FC = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <ContactInfoCard />
        </div>
        <div className="lg:col-span-8">
          <ContactForm />
        </div>
      </div>
    );
};
  
export default ContactContent;
