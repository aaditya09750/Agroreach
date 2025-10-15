import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
}

export interface BillingAddress {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress: string;
  country: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
}

interface UserContextType {
  profile: UserProfile;
  billingAddress: BillingAddress;
  updateProfile: (profile: UserProfile) => void;
  updateBillingAddress: (address: BillingAddress, silent?: boolean) => void;
  showNotification: boolean;
  notificationMessage: string;
  hideNotification: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    image: '',
  });

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    country: '',
    state: '',
    zipCode: '',
    email: '',
    phone: '',
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setNotificationMessage('Your profile has been updated successfully!');
    setShowNotification(true);
  };

  const updateBillingAddress = (newAddress: BillingAddress, silent: boolean = false) => {
    setBillingAddress(newAddress);
    if (!silent) {
      setNotificationMessage('Your billing address has been updated successfully!');
      setShowNotification(true);
    }
  };

  const hideNotification = () => {
    setShowNotification(false);
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        billingAddress,
        updateProfile,
        updateBillingAddress,
        showNotification,
        notificationMessage,
        hideNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
