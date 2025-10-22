import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  missingFields: string[];
}

const ValidationModal: React.FC<ValidationModalProps> = ({ isOpen, onClose, missingFields }) => {
  useEffect(() => {
    if (isOpen) {
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      // Close on Escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-4 z-[100] animate-slide-in-right">
      <div className="bg-white rounded-lg shadow-2xl border border-red-200 p-4 flex items-start gap-4 min-w-[360px] max-w-md">
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
          <AlertCircle size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-text-dark mb-1">
            Incomplete Information
          </h4>
          <p className="text-sm text-text-muted mb-2">
            Please fill in the required fields:
          </p>
          <div className="bg-red-50 border border-red-200 rounded-md p-2.5 max-h-[200px] overflow-y-auto scrollbar-hide">
            <ul className="space-y-1">
              {missingFields.map((field, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-red-700">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>{field}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ValidationModal;
