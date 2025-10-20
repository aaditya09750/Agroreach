import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface BlogCardProps {
  image: string;
  title: string;
  category: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, title, category }) => (
  <div className="max-w-sm w-full bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300 cursor-pointer overflow-hidden group">
    <div className="overflow-hidden">
      <img 
        className="w-full h-[190px] object-cover group-hover:scale-105 transition duration-300" 
        src={image} 
        alt={title} 
      />
    </div>
    <div className="p-4">
      <p className="text-[15px] text-primary font-medium mb-1.5">{category}</p>
      <h3 className="text-sm text-text-dark font-medium leading-relaxed line-clamp-2 min-h-[40px]">
        {title}
      </h3>
      <button className="text-xs text-primary font-medium mt-2 hover:underline flex items-center gap-1">
        Read More
        <ArrowRight size={10} />
      </button>
    </div>
  </div>
);

const LatestBlog: React.FC = () => {
  const blogPosts = [
    {
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&auto=format&fit=crop&q=80',
      title: 'Farm-to-Table: The Journey of Organic Produce from Harvest to Home',
      category: 'Sustainable Farming'
    },
    {
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&auto=format&fit=crop&q=80',
      title: 'Health Benefits of Eating Fresh Seasonal Vegetables and Fruits',
      category: 'Healthy Living'
    },
    {
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&auto=format&fit=crop&q=80',
      title: 'Supporting Local Communities: How We Empower Indian Farmers',
      category: 'Community Impact'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
        <div className="flex items-center justify-between mb-12">
          <div className="text-left">
            <h2 className="text-4xl font-semibold text-text-dark">Latest Blog</h2>
            <div className="flex items-center gap-1 mt-4">
              <div className="w-3 h-1 bg-primary/30 rounded-full"></div>    
              <div className="w-10 h-1 bg-primary rounded-full"></div>
              <div className="w-3 h-1 bg-primary/30 rounded-full"></div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-primary font-medium hover:gap-2 transition-all duration-300">
            <span>View More</span>
            <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Left Navigation Button */}
          <button 
            className="w-11 h-11 flex-shrink-0 rounded-full border border-border-color flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary active:scale-95 cursor-pointer"
            aria-label="Previous"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>

          {/* Right Navigation Button */}
          <button 
            className="w-11 h-11 flex-shrink-0 rounded-full border border-border-color flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary active:scale-95 cursor-pointer"
            aria-label="Next"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
