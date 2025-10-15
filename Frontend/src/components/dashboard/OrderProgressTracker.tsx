import React from 'react';
import { Check } from 'lucide-react';

interface ProgressStepProps {
  stepNumber: number;
  label: string;
  status: 'done' | 'ongoing' | 'pending';
}

const ProgressStep: React.FC<ProgressStepProps> = ({ stepNumber, label, status }) => {
  const isDone = status === 'done';
  const isOngoing = status === 'ongoing';

  return (
    <div className="flex flex-col items-center z-10">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
        isDone || isOngoing ? 'bg-primary border-primary' : 'bg-white border-gray-200'
      }`}>
        {isDone ? (
          <Check size={20} className="text-white" />
        ) : (
          <span className={`text-sm font-medium ${isOngoing ? 'text-white' : 'text-primary'}`}>
            {String(stepNumber).padStart(2, '0')}
          </span>
        )}
      </div>
      <p className={`mt-3 text-sm text-center w-24 ${isDone || isOngoing ? 'text-primary font-medium' : 'text-text-dark'}`}>
        {label}
      </p>
    </div>
  );
};

interface OrderProgressTrackerProps {
  currentStatus: 'Order received' | 'Processing' | 'On the way' | 'Delivered';
}

const OrderProgressTracker: React.FC<OrderProgressTrackerProps> = ({ currentStatus }) => {
  const steps = ['Order received', 'Processing', 'On the way', 'Delivered'];
  const currentStepIndex = steps.indexOf(currentStatus);

  const getStepStatus = (index: number): 'done' | 'ongoing' | 'pending' => {
    if (index < currentStepIndex) return 'done';
    if (index === currentStepIndex) return 'ongoing';
    return 'pending';
  };

  const progressWidth = currentStepIndex === 0 ? 0 : (currentStepIndex / (steps.length - 1)) * 100;


  return (
    <div className="relative w-full px-10">
      <div className="absolute top-5 left-0 right-0 h-2 bg-gray-200 rounded-full mx-20">
        <div 
          className="h-2 bg-primary rounded-full" 
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <div className="relative flex justify-between">
        {steps.map((label, index) => (
          <ProgressStep 
            key={label}
            stepNumber={index + 1}
            label={label}
            status={getStepStatus(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderProgressTracker;
