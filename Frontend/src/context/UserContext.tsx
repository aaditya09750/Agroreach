import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { getImageUrl } from '../utils/imageUtils';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  addresses: Address[];
  profileImage?: string;
}

export interface Address {
  _id?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  imageFile?: File;  // Added to handle file uploads
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
  user: User | null;
  loading: boolean;
  profile: UserProfile;
  billingAddress: BillingAddress;
  login: (email: string, password: string) => Promise<User | null>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => Promise<void>;
  updateBillingAddress: (address: BillingAddress) => Promise<void>;
  refreshUser: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = authService.getStoredToken();
      const storedUser = authService.getStoredUser();
      
      if (token && storedUser) {
        // Transform stored user data to include name field
        const userId = storedUser._id || storedUser.id || '';
        if (userId) {
          const transformedUser = {
            ...storedUser,
            name: storedUser.name || `${storedUser.firstName || ''} ${storedUser.lastName || ''}`.trim(),
            _id: userId,
            email: storedUser.email || '',
            phone: storedUser.phone || '',
            role: storedUser.role || 'user',
            addresses: storedUser.addresses || []
          };
          setUser(transformedUser);

          // Load profile data
          setProfile({
            firstName: storedUser.firstName || '',
            lastName: storedUser.lastName || '',
            email: storedUser.email || '',
            phone: storedUser.phone || '',
            image: getImageUrl(storedUser.profileImage) || '',
          });

          // Load billing address if available
          if (storedUser.billingAddress) {
            setBillingAddress({
              firstName: storedUser.billingAddress.firstName || '',
              lastName: storedUser.billingAddress.lastName || '',
              companyName: storedUser.billingAddress.companyName || '',
              streetAddress: storedUser.billingAddress.streetAddress || '',
              country: storedUser.billingAddress.country || '',
              state: storedUser.billingAddress.state || '',
              zipCode: storedUser.billingAddress.zipCode || '',
              email: storedUser.billingAddress.email || '',
              phone: storedUser.billingAddress.phone || '',
            });
          }
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      const userData = response.data?.user || response.user || null;
      
      // Transform the user data to include name field
      if (userData) {
        const userId = userData._id || userData.id || '';
        if (userId) {
          const transformedUser: User = {
            _id: userId,
            name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
            email: userData.email || '',
            phone: userData.phone || '',
            role: userData.role || 'user',
            addresses: userData.addresses || []
          };
          setUser(transformedUser);

          // Set profile data
          setProfile({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            image: getImageUrl(userData.profileImage) || '',
          });

          // Load billing address if available
          if (userData.billingAddress) {
            setBillingAddress({
              firstName: userData.billingAddress.firstName || '',
              lastName: userData.billingAddress.lastName || '',
              companyName: userData.billingAddress.companyName || '',
              streetAddress: userData.billingAddress.streetAddress || '',
              country: userData.billingAddress.country || '',
              state: userData.billingAddress.state || '',
              zipCode: userData.billingAddress.zipCode || '',
              email: userData.billingAddress.email || '',
              phone: userData.billingAddress.phone || '',
            });
          }

          setNotificationMessage('Login successful!');
          setShowNotification(true);
          return transformedUser;
        }
      }
      
      return null;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string, phone: string) => {
    try {
      const response = await authService.register({ name, email, password, phone });
      const userData = response.data?.user || response.user || null;
      
      // Transform the user data to include name field
      if (userData) {
        const userId = userData._id || userData.id || '';
        if (userId) {
          const transformedUser: User = {
            _id: userId,
            name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
            email: userData.email || '',
            phone: userData.phone || '',
            role: userData.role || 'user',
            addresses: userData.addresses || []
          };
          setUser(transformedUser);

          // Set profile data
          setProfile({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            image: getImageUrl(userData.profileImage) || '',
          });

          // Load billing address if available
          if (userData.billingAddress) {
            setBillingAddress({
              firstName: userData.billingAddress.firstName || '',
              lastName: userData.billingAddress.lastName || '',
              companyName: userData.billingAddress.companyName || '',
              streetAddress: userData.billingAddress.streetAddress || '',
              country: userData.billingAddress.country || '',
              state: userData.billingAddress.state || '',
              zipCode: userData.billingAddress.zipCode || '',
              email: userData.billingAddress.email || '',
              phone: userData.billingAddress.phone || '',
            });
          }

          setNotificationMessage('Registration successful!');
          setShowNotification(true);
        }
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setNotificationMessage('Logged out successfully!');
    setShowNotification(true);
  };

  const refreshUser = async () => {
    try {
      const userData = await userService.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user', error);
    }
  };

  const updateProfile = async (newProfile: UserProfile) => {
    try {
      // Call the backend API to update profile
      const response = await userService.updateProfile({
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
        phone: newProfile.phone,
        image: newProfile.imageFile,  // Send the actual file
      });

      // Get the updated profileImage URL from backend response
      const updatedProfileImage = response.data?.user?.profileImage || newProfile.image;

      // Update local state with the image URL from backend (convert to full URL)
      const updatedProfile = {
        ...newProfile,
        image: getImageUrl(updatedProfileImage),
        imageFile: undefined,  // Clear the file after upload
      };
      setProfile(updatedProfile);
      
      // Update user object with latest data
      if (user) {
        const updatedUser = {
          ...user,
          name: `${newProfile.firstName} ${newProfile.lastName}`.trim(),
          phone: newProfile.phone,
          profileImage: updatedProfileImage,
        };
        setUser(updatedUser);
        // Update localStorage
        authService.setStoredUser(updatedUser);
      }

      setNotificationMessage('Your profile has been updated successfully!');
      setShowNotification(true);
    } catch (error) {
      console.error('Failed to update profile', error);
      setNotificationMessage('Failed to update profile. Please try again.');
      setShowNotification(true);
    }
  };

  const updateBillingAddress = async (newAddress: BillingAddress) => {
    try {
      // Call the backend API to update billing address
      await userService.updateBillingAddress(newAddress);

      // Update local state
      setBillingAddress(newAddress);
      
      // Update user object in localStorage if needed
      if (user) {
        const storedUser = authService.getStoredUser();
        if (storedUser) {
          const updatedUser = {
            ...storedUser,
            billingAddress: newAddress,
          };
          authService.setStoredUser(updatedUser);
        }
      }

      setNotificationMessage('Your billing address has been updated successfully!');
      setShowNotification(true);
    } catch (error) {
      console.error('Failed to update billing address', error);
      setNotificationMessage('Failed to update billing address. Please try again.');
      setShowNotification(true);
    }
  };

  const hideNotification = () => {
    setShowNotification(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        profile,
        billingAddress,
        login,
        register,
        logout,
        updateProfile,
        updateBillingAddress,
        refreshUser,
        showNotification,
        notificationMessage,
        hideNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
