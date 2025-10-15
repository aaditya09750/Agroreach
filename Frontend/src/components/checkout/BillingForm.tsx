import React, { useState, useMemo, useEffect } from 'react';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import Checkbox from '../ui/Checkbox';
import { useUser } from '../../context/UserContext';

const BillingForm: React.FC = () => {
  const { billingAddress, updateBillingAddress } = useUser();
  const [formData, setFormData] = useState(billingAddress);

  // Update formData when billingAddress changes (e.g., from settings page)
  useEffect(() => {
    setFormData(billingAddress);
  }, [billingAddress]);

  // US States
  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  // Indian States
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  // Get states based on selected country
  const availableStates = useMemo(() => {
    if (formData.country === 'United States') {
      return usStates;
    } else if (formData.country === 'India') {
      return indianStates;
    }
    return [];
  }, [formData.country]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedData);
    // Update context silently (without notification) so it's available for order placement
    updateBillingAddress(updatedData, true);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let updatedData;
    // Reset state when country changes
    if (name === 'country') {
      updatedData = {
        ...formData,
        [name]: value,
        state: '' // Reset state when country changes
      };
    } else {
      updatedData = {
        ...formData,
        [name]: value
      };
    }
    setFormData(updatedData);
    // Update context silently (without notification) so it's available for order placement
    updateBillingAddress(updatedData, true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-medium text-text-dark mb-6">Billing Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <InputField 
            label="First name" 
            name="firstName" 
            placeholder="Your first name" 
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <InputField 
            label="Last name" 
            name="lastName" 
            placeholder="Your last name" 
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <div className="md:col-span-2">
            <InputField 
              label="Company Name (optional)" 
              name="companyName" 
              placeholder="Company name" 
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-2">
            <InputField 
              label="Street Address" 
              name="streetAddress" 
              placeholder="Street address" 
              value={formData.streetAddress}
              onChange={handleInputChange}
              required
            />
          </div>
          <SelectField 
            label="Country / Region" 
            name="country" 
            options={['United States', 'India']} 
            placeholder="Select country" 
            value={formData.country}
            onChange={handleSelectChange}
            required
          />
          <SelectField 
            label="States" 
            name="state" 
            options={availableStates} 
            placeholder="Select state" 
            value={formData.state}
            onChange={handleSelectChange}
            required
          />
          <InputField 
            label="Zip Code" 
            name="zipCode" 
            placeholder="Zip Code" 
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
          <InputField 
            label="Email" 
            name="email" 
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <InputField 
            label="Phone" 
            name="phone" 
            type="tel" 
            placeholder="Phone number" 
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mt-5">
          <Checkbox label="Ship to a different address" name="shipToDifferent" />
        </div>
      </div>
      <hr className="border-border-color" />
      <div>
        <h2 className="text-2xl font-medium text-text-dark mb-6">Additional Info</h2>
        <InputField 
          label="Order Notes (Optional)" 
          name="orderNotes" 
          placeholder="Notes about your order, e.g. special notes for delivery" 
          isTextarea={true}
          rows={4}
        />
      </div>
    </div>
  );
};

export default BillingForm;
