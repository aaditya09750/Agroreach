import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const UserNotification: React.FC = () => {
  const { showNotification, notificationMessage, hideNotification } = useUser();

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showNotification, hideNotification]);

  if (!showNotification) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slide-in-right">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 flex items-start gap-4 min-w-[320px] max-w-md">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Check size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-text-dark mb-1">Success!</h4>
          <p className="text-sm text-text-muted">
            {notificationMessage}
          </p>
        </div>
        <button
          onClick={hideNotification}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default UserNotification;
