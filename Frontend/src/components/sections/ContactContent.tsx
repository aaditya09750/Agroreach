import React, { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useUser } from '../../context/UserContext';
import { contactService } from '../../services/contactService';
import { useNavigate } from 'react-router-dom';
import ContactNotification from '../ui/ContactNotification';

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
    const { user } = useUser();
    const { currency } = useCurrency();
    const navigate = useNavigate();
    
    const [formState, setFormState] = useState({
      name: '',
      email: '',
      message: '',
      subject: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState<{
      show: boolean;
      type: 'success' | 'error' | 'loading';
      message: string;
    }>({
      show: false,
      type: 'success',
      message: '',
    });
  
    const showNotification = (type: 'success' | 'error' | 'loading', message: string) => {
      setNotification({ show: true, type, message });
    };

    const hideNotification = () => {
      setNotification({ show: false, type: 'success', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Check if user is logged in
      if (!user) {
        showNotification('error', 'Please sign in to send a message');
        setTimeout(() => navigate('/signin'), 2000);
        return;
      }

      // Validate form fields
      if (!formState.name.trim() || !formState.email.trim() || !formState.subject.trim() || !formState.message.trim()) {
        showNotification('error', 'Please fill in all fields to continue');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        showNotification('error', 'Please enter a valid email address');
        return;
      }

      setIsSubmitting(true);
      showNotification('loading', 'Sending your message...');

      try {
        // Get location based on currency
        const location = currency === 'INR' 
          ? 'India (INR)' 
          : 'USA (USD)';

        await contactService.sendMessage({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          location: location,
          currency: currency,
        });

        showNotification('success', 'We received your message and will get back to you soon!');
        
        // Reset form
        setFormState({
          name: '',
          email: '',
          message: '',
          subject: '',
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again later.';
        showNotification('error', errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="bg-white p-8 rounded-lg shadow-[0px_0px_56px_0px_rgba(0,38,3,0.08)] h-full">
        <ContactNotification
          show={notification.show}
          type={notification.type}
          message={notification.message}
          onClose={hideNotification}
        />
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
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formState.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formState.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"            />
          </div>
          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formState.subject}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-text-dark placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary text-white font-semibold py-4 px-10 rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
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
