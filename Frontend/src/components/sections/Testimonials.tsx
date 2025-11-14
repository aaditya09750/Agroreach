import React from 'react';
import { Star } from 'lucide-react';
import quoteIcon from '../../assets/Vector.png';
import tmImage from '../../assets/Home/tm.png';
import { useCurrency } from '../../context/CurrencyContext';

interface TestimonialCardProps {
  text: string;
  image: string;
  name: string;
  role: string;
  rating: number;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(3)].map((_, i) => (
      <Star key={i} size={18} className={i < rating ? 'text-warning fill-current' : 'text-gray-300 fill-current'} />
    ))}
  </div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, image, name, role, rating }) => (
  <div className="bg-white p-8 rounded-lg shadow-sm relative">
    <div className="absolute top-8 left-8">
      <img src={quoteIcon} alt="quote" className="w-8 h-6 opacity-20" />
    </div>
    <p className="mt-12 mb-6 text-text-light text-sm leading-relaxed">{text}</p>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4 className="font-medium text-text-dark text-base">{name}</h4>
          <p className="text-xs text-text-muted">{role}</p>
        </div>
      </div>
      <StarRating rating={rating} />
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const { currency } = useCurrency();

  const testimonialsDataUSD = [
    {
      text: 'The freshness is unmatched! I ordered tomatoes and capsicums, they arrived crisp and farm-fresh. My family loves the quality and quick delivery. Highly recommend Agroreach for organic produce.',
      image: tmImage,
      name: 'Robert Fox',
      role: 'Home Chef',
      rating: 5,
    },
    {
      text: 'I have been buying fruits for three months now, and the quality is amazing. The mangoes were perfectly ripe and sweet. The prices are reasonable. This is my go-to place for fresh produce.',
      image: tmImage,
      name: 'Dianne Russell',
      role: 'Health Enthusiast',
      rating: 4,
    },
    {
      text: 'As a restaurant owner, sourcing quality vegetables is crucial. Agroreach has been a game-changer for us. Fresh, organic, and delivered on time daily. Their capsicum and lettuce are top-notch!',
      image: tmImage,
      name: 'Eleanor Pena',
      role: 'Restaurant Owner',
      rating: 5,
    },
    {
      text: 'I was skeptical about buying groceries online, but Agroreach changed my mind. The apples were crunchy, cucumbers fresh, and everything packed beautifully. Their customer support is very responsive!',
      image: tmImage,
      name: 'Guy Hawkins',
      role: 'Regular Customer',
      rating: 3,
    },
    {
      text: 'Agroreach delivers farm-fresh produce straight to your door. I love the variety from exotic fruits to everyday vegetables. The quality is always premium and I appreciate their eco-friendly packaging!',
      image: tmImage,
      name: 'Jane Cooper',
      role: 'Organic Food Lover',
      rating: 5,
    },
    {
      text: 'Shopping for fresh vegetables has never been easier! The website is user-friendly and I find everything in minutes. The cauliflower and eggplant were incredibly fresh. Healthy eating made convenient!',
      image: tmImage,
      name: 'Sarah Mitchell',
      role: 'Working Professional',
      rating: 4,
    },
  ];

  const testimonialsDataINR = [
    {
      text: 'The freshness is unmatched! I ordered tomatoes and capsicums from Agroreach, they arrived crisp and farm-fresh. My family loves the quality. Highly recommend for organic produce in Pune!',
      image: tmImage,
      name: 'Rajesh Kumar',
      role: 'Home Chef',
      rating: 5,
    },
    {
      text: 'I have been ordering fruits for three months now, and the quality is consistently excellent. The mangoes were perfectly ripe and delicious. Reasonable prices too. Agroreach is my trusted source for fresh produce.',
      image: tmImage,
      name: 'Priya Sharma',
      role: 'Health Enthusiast',
      rating: 4,
    },
    {
      text: 'As a restaurant owner in Pune, sourcing fresh vegetables is crucial. Agroreach has transformed our supply chain. Organic, fresh, and delivered daily without fail. Their capsicum and lettuce quality is exceptional!',
      image: tmImage,
      name: 'Arjun Patel',
      role: 'Restaurant Owner',
      rating: 5,
    },
    {
      text: 'Initially hesitant about online grocery shopping, but Agroreach exceeded my expectations. Apples were crisp, cucumbers fresh, and packaging was excellent. Customer service is prompt and helpful too!',
      image: tmImage,
      name: 'Vikram Singh',
      role: 'Regular Customer',
      rating: 3,
    },
    {
      text: 'Agroreach brings farm-fresh produce right to our doorstep in Manchar. Love the variety from seasonal fruits to daily vegetables. Premium quality every time and eco-friendly packaging is a great bonus!',
      image: tmImage,
      name: 'Anjali Deshmukh',
      role: 'Organic Food Lover',
      rating: 5,
    },
    {
      text: 'Shopping fresh vegetables online has become so convenient! User-friendly website makes finding items quick and easy. The cauliflower and brinjal were exceptionally fresh. Healthy eating made accessible!',
      image: tmImage,
      name: 'Sneha Joshi',
      role: 'Working Professional',
      rating: 4,
    },
  ];

  const testimonialsData = currency === 'INR' ? testimonialsDataINR : testimonialsDataUSD;

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section className="bg-primary-light py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-4xl font-semibold text-text-dark">Client Testimonial</h2>
          <div className="flex items-center gap-1 mt-4">
            <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
            <div className="w-10 h-1 bg-primary rounded-full"></div>
            <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
          </div>
        </div>
        <div className="overflow-hidden marquee-container">
          <div
            className="flex gap-6 animate-marquee group"
            style={{ width: 'max-content' }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={index} className="w-[455px] flex-shrink-0 hover-pause-animation">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
