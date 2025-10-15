import React from 'react';
import TeamCard from '../ui/TeamCard';
import teamImage from '../../assets/About/Team.jpg';

const teamMembers = [
    {
        name: 'Rajesh Sharma',
        role: 'CEO & Founder',
        image: teamImage,
        isHover: true
    },
    {
        name: 'Priya Deshmukh',
        role: 'Operations Manager',
        image: teamImage,
    },
    {
        name: 'Amit Patel',
        role: 'Quality Control Head',
        image: teamImage,
    },
    {
        name: 'Sneha Kumar',
        role: 'Farmer Relations Manager',
        image: teamImage,
    }
];

const AwesomeTeam: React.FC = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-2 sm:px-6 lg:px-[150px] relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark">Our Awesome Team</h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto leading-relaxed">
            Meet the dedicated professionals behind Agroreach who work tirelessly to bring fresh, organic produce from local farms directly to your table every single day.
          </p>
        </div>
        <div className="flex items-center justify-center gap-6">
           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                    <TeamCard key={index} {...member} />
                ))}
            </div>
            
        </div>
      </div>
    </section>
  );
};

export default AwesomeTeam;
