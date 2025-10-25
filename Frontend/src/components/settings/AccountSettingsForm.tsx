import React, { useState, useRef, useEffect } from 'react';
import InputField from '../ui/InputField';
import { useUser } from '../../context/UserContext';
import { Edit2, User } from 'lucide-react';

const AccountSettingsForm: React.FC = () => {
  const { profile, updateProfile } = useUser();
  const [formData, setFormData] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update formData when profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for immediate display
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result as string,  // Preview URL
          imageFile: file,  // Actual file to upload
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    // Notification will be shown automatically by UserContext
  };

  return (
    <div className="border border-border-color rounded-lg">
      <div className="p-6 border-b border-border-color">
        <h3 className="text-xl font-medium text-text-dark">Account Settings</h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Profile"
                    className="w-36 h-36 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="absolute bottom-2 right-2 bg-white p-2.5 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  aria-label="Edit profile image"
                >
                  <Edit2 className="w-5 h-5 text-gray-700" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  aria-label="Upload profile image"
                />
              </div>
            </div>
            <div className="lg:col-span-2 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField 
                  label="First name" 
                  name="firstName" 
                  placeholder="Enter your first name" 
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <InputField 
                  label="Last Name" 
                  name="lastName" 
                  placeholder="Enter your last name" 
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <InputField 
                label="Email" 
                name="email" 
                type="email" 
                placeholder="Enter your email address" 
                value={formData.email}
                onChange={handleChange}
              />
              <InputField 
                label="Phone Number" 
                name="phone" 
                type="tel" 
                placeholder="Enter your phone number" 
                value={formData.phone}
                onChange={handleChange}
              />
              <button 
                type="submit"
                className="bg-primary text-white font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettingsForm;
