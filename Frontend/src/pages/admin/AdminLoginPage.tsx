import React from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSignInForm from '../../components/admin/AdminSignInForm';
import AdminSignInBanner from '../../components/admin/AdminSignInBanner';

const AdminLoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader hideUserGreeting={true} />
      <main className="bg-white">
        <AdminSignInBanner />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <AdminSignInForm />
        </div>
      </main>
    </div>
  );
};

export default AdminLoginPage;
