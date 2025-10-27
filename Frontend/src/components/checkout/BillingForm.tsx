import React, { useState, useMemo, useEffect } from 'react';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import Checkbox from '../ui/Checkbox';
import { useUser } from '../../context/UserContext';
import { useTranslation } from '../../i18n/useTranslation';

const BillingForm: React.FC = () => {
  const { billingAddress, updateBillingAddress } = useUser();
  const { t } = useTranslation();
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
    // Update context silently so it's available for order placement
    updateBillingAddress(updatedData);
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
    // Update context silently so it's available for order placement
    updateBillingAddress(updatedData);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-medium text-text-dark mb-6">{t('checkout.billingInformation')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <InputField 
            label={t('checkout.firstName')} 
            name="firstName" 
            placeholder={t('checkout.firstNamePlaceholder')} 
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <InputField 
            label={t('checkout.lastName')} 
            name="lastName" 
            placeholder={t('checkout.lastNamePlaceholder')} 
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <div className="md:col-span-2">
            <InputField 
              label={t('checkout.companyName')} 
              name="companyName" 
              placeholder={t('checkout.companyNamePlaceholder')} 
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>
          <div className="md:col-span-2">
            <InputField 
              label={t('checkout.streetAddress')} 
              name="streetAddress" 
              placeholder={t('checkout.streetAddressPlaceholder')} 
              value={formData.streetAddress}
              onChange={handleInputChange}
              required
            />
          </div>
          <SelectField 
            label={t('checkout.country')} 
            name="country" 
            options={['United States', 'India']} 
            placeholder={t('checkout.selectCountry')} 
            value={formData.country}
            onChange={handleSelectChange}
            required
          />
          <SelectField 
            label={t('checkout.states')} 
            name="state" 
            options={availableStates} 
            placeholder={t('checkout.selectState')} 
            value={formData.state}
            onChange={handleSelectChange}
            required
          />
          <InputField 
            label={t('checkout.zipCode')} 
            name="zipCode" 
            placeholder={t('checkout.zipCodePlaceholder')} 
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
          <InputField 
            label={t('checkout.email')} 
            name="email" 
            type="email" 
            placeholder={t('checkout.emailPlaceholder')} 
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <InputField 
            label={t('checkout.phone')} 
            name="phone" 
            type="tel" 
            placeholder={t('checkout.phonePlaceholder')} 
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mt-5">
          <Checkbox label={t('checkout.shipToDifferent')} name="shipToDifferent" />
        </div>
      </div>
      <hr className="border-border-color" />
      <div>
        <h2 className="text-2xl font-medium text-text-dark mb-6">{t('checkout.additionalInfo')}</h2>
        <InputField 
          label={t('checkout.orderNotes')} 
          name="orderNotes" 
          placeholder={t('checkout.orderNotesPlaceholder')} 
          isTextarea={true}
          rows={4}
        />
      </div>
    </div>
  );
};

export default BillingForm;
