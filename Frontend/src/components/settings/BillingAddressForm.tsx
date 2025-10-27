import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import { useUser } from '../../context/UserContext';
import { useTranslation } from '../../i18n/useTranslation';

const BillingAddressForm: React.FC = () => {
  const { t } = useTranslation();
  const { billingAddress, updateBillingAddress } = useUser();
  const [formData, setFormData] = useState(billingAddress);
  const navigate = useNavigate();

  // Update formData when billingAddress changes
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        state: '' 
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBillingAddress(formData);
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="border border-border-color rounded-lg">
      <div className="p-6 border-b border-border-color">
        <h3 className="text-xl font-medium text-text-dark">{t('dashboard.billingAddress')}</h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <InputField 
              label={t('dashboard.firstName')}
              name="firstName" 
              placeholder={t('checkout.firstNamePlaceholder')}
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <InputField 
              label={t('dashboard.lastName')}
              name="lastName" 
              placeholder={t('checkout.lastNamePlaceholder')}
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <div className="md:col-span-2">
              <InputField 
                label={t('dashboard.companyName')}
                name="companyName" 
                placeholder={t('dashboard.companyNamePlaceholder')}
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="md:col-span-2">
              <InputField 
                label={t('dashboard.streetAddress')}
                name="streetAddress" 
                placeholder={t('dashboard.streetAddressPlaceholder')}
                value={formData.streetAddress}
                onChange={handleInputChange}
              />
            </div>
            <SelectField 
              label={t('dashboard.countryRegion')}
              name="country" 
              options={['United States', 'India']} 
              placeholder={t('dashboard.selectCountry')}
              value={formData.country}
              onChange={handleSelectChange}
            />
            <SelectField 
              label={t('dashboard.states')}
              name="state" 
              options={availableStates} 
              placeholder={t('dashboard.selectState')}
              value={formData.state}
              onChange={handleSelectChange}
            />
            <InputField 
              label={t('dashboard.zipCode')}
              name="zipCode" 
              placeholder={t('dashboard.zipCodePlaceholder')}
              value={formData.zipCode}
              onChange={handleInputChange}
            />
            <InputField 
              label={t('dashboard.email')}
              name="email" 
              type="email" 
              placeholder={t('dashboard.emailPlaceholder')}
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField 
              label={t('dashboard.phone')}
              name="phone" 
              type="tel" 
              placeholder={t('dashboard.phoneNumberPlaceholder')}
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <button 
            type="submit"
            className="mt-6 bg-primary text-white font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors"
          >
            {t('dashboard.saveChanges')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BillingAddressForm;
