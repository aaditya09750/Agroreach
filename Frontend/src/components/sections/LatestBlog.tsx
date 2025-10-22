import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import BlogDetailModal from '../modal/BlogDetailModal';
import Blog1 from '../../assets/About/Blog (1).jpg';
import Blog2 from '../../assets/About/Blog (2).jpg';
import Blog3 from '../../assets/About/Blog (3).jpg';

interface BlogPost {
  image: string;
  title: string;
  category: string;
  content: string;
  author: string;
  date: string;
}

interface BlogCardProps {
  image: string;
  title: string;
  category: string;
  onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, title, category, onClick }) => (
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
      <button 
        onClick={onClick}
        className="text-xs text-primary font-medium mt-2 hover:underline flex items-center gap-1"
      >
        Read More
        <ArrowRight size={10} />
      </button>
    </div>
  </div>
);

const LatestBlog: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = [
    {
      image: Blog1,
      title: 'Farm-to-Table: The Journey of Organic Produce from Harvest to Home',
      category: 'Sustainable Farming',
      author: 'Priya Sharma',
      date: 'October 15, 2025',
      content: `In today's fast-paced world, understanding where our food comes from has never been more important. The farm-to-table movement is revolutionizing how we think about fresh produce, creating a direct connection between farmers and consumers.

At Agroreach, we believe in transparency and quality. Every morning, our partner farmers across India harvest fresh vegetables and fruits at their peak ripeness. Within hours, these products are carefully sorted, packed, and dispatched to our distribution centers.

The journey begins in the early hours of dawn when farmers handpick each vegetable and fruit, ensuring only the best quality produce makes it to your table. Our farmers use sustainable farming practices, avoiding harmful pesticides and chemical fertilizers. Instead, they rely on natural composting, crop rotation, and organic pest control methods.

Once harvested, the produce undergoes a rigorous quality check. Our trained inspectors examine each item for freshness, size, and nutritional value. Only produce that meets our strict standards moves forward in the supply chain.

From the farms, the produce travels in refrigerated vehicles to maintain optimal temperature and freshness. Our logistics network is designed to minimize transit time, ensuring that your vegetables and fruits retain their nutritional value and taste.

Within 24-48 hours of harvest, the fresh produce reaches your doorstep. This quick turnaround means you're getting vegetables and fruits at their peak nutritional value – something traditional supply chains with multiple middlemen simply cannot achieve.

The farm-to-table approach also benefits our farmers directly. By eliminating intermediaries, we ensure farmers receive fair compensation for their hard work. This economic empowerment enables them to invest in better farming techniques and sustainable practices.

When you choose Agroreach, you're not just buying vegetables – you're supporting a sustainable ecosystem that values health, quality, and fairness. You're ensuring that the food on your table is as fresh as it can be, while also supporting the hardworking farmers who make it all possible.`
    },
    {
      image: Blog2,
      title: 'Health Benefits of Eating Fresh Seasonal Vegetables and Fruits',
      category: 'Healthy Living',
      author: 'Dr. Rahul Verma',
      date: 'October 18, 2025',
      content: `Eating fresh, seasonal produce is one of the most effective ways to boost your health and wellbeing. Seasonal vegetables and fruits are not only tastier but also packed with higher nutritional content compared to off-season alternatives.

When produce is consumed in season, it's harvested at the right time, allowing it to ripen naturally and develop its full nutrient profile. Studies show that fresh, seasonal fruits and vegetables contain significantly higher levels of vitamins, minerals, and antioxidants.

Seasonal eating aligns with our body's natural needs. In summer, water-rich fruits like watermelon, cucumber, and citrus fruits help keep us hydrated. In winter, root vegetables and leafy greens provide the warmth and nutrition our bodies crave during colder months.

Fresh vegetables are rich in dietary fiber, which aids digestion, regulates blood sugar levels, and promotes a healthy gut microbiome. The fiber content in fresh produce helps you feel fuller for longer, making it easier to maintain a healthy weight.

Antioxidants found in colorful vegetables and fruits combat free radicals in our body, reducing inflammation and lowering the risk of chronic diseases like heart disease, diabetes, and cancer. The vibrant colors in produce – reds, oranges, greens, and purples – indicate the presence of different beneficial compounds.

Seasonal fruits and vegetables also taste better because they're allowed to ripen naturally. This means you don't need excessive seasoning or preparation – the natural flavors shine through, making healthy eating more enjoyable.

When you buy fresh, local, and seasonal produce from Agroreach, you're minimizing the time between harvest and consumption. This means maximum nutrient retention. Vegetables that travel thousands of miles lose vital nutrients during transport and storage.

Making fresh seasonal produce a regular part of your diet can boost immunity, improve skin health, enhance energy levels, and contribute to overall wellness. It's a simple change that can have profound effects on your health.

Start incorporating more fresh vegetables and fruits into your daily meals. Whether it's adding greens to your breakfast smoothie, snacking on seasonal fruits, or preparing a colorful salad for lunch, every small step counts toward better health.`
    },
    {
      image: Blog3,
      title: 'Supporting Local Communities: How We Empower Indian Farmers',
      category: 'Community Impact',
      author: 'Amit Kumar',
      date: 'October 20, 2025',
      content: `India's agricultural sector is the backbone of our economy, employing over 50% of our workforce. Yet, farmers often face significant challenges – from unpredictable weather patterns to unfair pricing by middlemen. At Agroreach, we're committed to changing this narrative.

Our mission goes beyond delivering fresh produce. We're building a sustainable ecosystem that empowers farmers, ensures fair compensation, and strengthens local communities across India.

Traditional agricultural supply chains involve multiple intermediaries, each taking a cut and leaving farmers with minimal profits. By creating a direct connection between farmers and consumers, we eliminate these middlemen, ensuring farmers receive fair prices for their hard work.

We provide our partner farmers with modern agricultural training, helping them adopt sustainable farming practices that increase yield while protecting the environment. From organic farming techniques to water conservation methods, we equip farmers with knowledge that enhances their productivity.

Financial empowerment is another crucial aspect of our work. Many farmers struggle with access to credit and financial services. Through our network, we connect farmers with agricultural financing options, enabling them to invest in better seeds, equipment, and infrastructure.

We also help farmers diversify their crops based on market demand. Our data-driven insights allow farmers to make informed decisions about what to grow, reducing waste and maximizing income. This strategic approach helps farmers move beyond subsistence farming to profitable agriculture.

Technology plays a vital role in our community empowerment initiatives. We provide farmers with mobile apps that give real-time market prices, weather updates, and best practices. This information accessibility levels the playing field, allowing even small farmers to make informed decisions.

Beyond economic benefits, we foster a sense of community among farmers. Regular workshops, training sessions, and farmer gatherings create opportunities for knowledge sharing and mutual support. Experienced farmers mentor newcomers, creating a collaborative ecosystem.

Women farmers are particularly empowered through our programs. We recognize the critical role women play in agriculture and ensure they have equal access to training, resources, and market opportunities. This gender-inclusive approach strengthens entire farming communities.

Our commitment extends to the next generation. By making farming economically viable and respectable, we encourage young people to consider agriculture as a career. This ensures the continuity of farming traditions while bringing fresh ideas and innovation to the sector.

When you choose Agroreach, you're not just buying vegetables – you're investing in the livelihoods of thousands of farming families. You're supporting sustainable agriculture, community development, and a more equitable food system.

Together, we can create a future where farmers are prosperous, communities thrive, and everyone has access to fresh, healthy, and affordable food. Join us in this mission to transform Indian agriculture, one farm at a time.`
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogPosts.map((post, index) => (
            <BlogCard 
              key={index} 
              image={post.image}
              title={post.title}
              category={post.category}
              onClick={() => setSelectedBlog(post)}
            />
          ))}
        </div>
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <BlogDetailModal 
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </section>
  );
};

export default LatestBlog;
