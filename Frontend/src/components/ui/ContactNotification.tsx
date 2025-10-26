import React, { useEffect } from 'react';
import { Check, X, AlertCircle, Send } from 'lucide-react';

interface ContactNotificationProps {
  show: boolean;
  type: 'success' | 'error' | 'loading';
  message: string;
  onClose: () => void;
}

const ContactNotification: React.FC<ContactNotificationProps> = ({ show, type, message, onClose }) => {
  useEffect(() => {
    if (show && type !== 'loading') {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Show for 4 seconds
      return () => clearTimeout(timer);
    }
  }, [show, type, onClose]);

  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check size={20} className="text-white" />;
      case 'error':
        return <AlertCircle size={20} className="text-white" />;
      case 'loading':
        return (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        );
      default:
        return <Send size={20} className="text-white" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return 'bg-primary';
      case 'error':
        return 'bg-red-500';
      case 'loading':
        return 'bg-blue-500';
      default:
        return 'bg-primary';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Message Sent Successfully!';
      case 'error':
        return 'Failed to Send Message';
      case 'loading':
        return 'Sending Message...';
      default:
        return 'Notification';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slide-in-right">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 flex items-start gap-4 min-w-[320px] max-w-md">
        <div className={`w-10 h-10 ${getColor()} rounded-full flex items-center justify-center flex-shrink-0`}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-text-dark mb-1">
            {getTitle()}
          </h4>
          <p className="text-sm text-text-muted">
            {message}
          </p>
        </div>
        {type !== 'loading' && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close notification"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactNotification;
