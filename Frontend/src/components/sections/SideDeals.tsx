import React from 'react';
import { Star, ShoppingCart, Heart, Eye, ArrowRight } from 'lucide-react';

interface SmallProductCardProps {
  image: string;
  name: string;
  price: string;
  oldPrice?: string;
  rating: number;
  isHover?: boolean;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} className={i < rating ? 'text-warning fill-current' : 'text-gray-300 fill-current'} />
    ))}
  </div>
);

const SmallProductCard: React.FC<SmallProductCardProps> = ({ image, name, price, oldPrice, rating, isHover }) => (
  <div className={`p-4 border rounded-md flex items-center gap-4 group relative ${isHover ? 'border-primary shadow-product-hover' : 'border-border-color'}`}>
    <img src={image} alt={name} className="w-24 h-24 object-contain" />
    <div className="flex-grow">
      <p className="text-sm text-text-light">{name}</p>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-base font-medium text-text-dark">{price}</p>
        {oldPrice && <p className="text-base text-text-muted line-through">{oldPrice}</p>}
      </div>
      <StarRating rating={rating} />
    </div>
    {isHover && (
      <div className="absolute inset-0 bg-white/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center"><ShoppingCart size={20} /></button>
        <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center"><Heart size={20} /></button>
        <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center"><Eye size={20} /></button>
      </div>
    )}
  </div>
);

const DealSection: React.FC<{ title: string; products: SmallProductCardProps[] }> = ({ title, products }) => (
  <div>
    <h3 className="text-xl font-medium text-text-dark mb-4">{title}</h3>
    <div className="space-y-4">
      {products.map((product, index) => (
        <SmallProductCard key={index} {...product} />
      ))}
    </div>
  </div>
);

const BannerCard: React.FC = () => (
    <div className="relative rounded-lg overflow-hidden h-full bg-cover bg-center" style={{backgroundImage: "url('https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/be11/e059/3a1fa4062aad889796e275c47014a239?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ax2m1kA0GOzFaho6vnUloGacTGa2iXycOhhVYmGqNz-iiOy6xDfGy1uRNlMr1jS~Guc4tQw2yuHPLJa7UAYBq2GuUc-5ocrpTrsZ3Fh3cmBqSmNgF8Dw6EEqySRpFNw~95aK1YMbyQgh4dlA6ntzyxYaDK9EpR4qXv~1xTBSxWsPxHgwXdQcDPr4jQa2aEt3YIkrDgjl-rIRuopPdzRlp9gq63ObDs7HLLsYLwBvQna5p70AYijCEqKn2DTm9PRfToPttgerEmT8OKMaz9OaI70rU~R5tt~0jDeMYvcA~jZeWU3Dxn8q3L1SoO9-ze0CibzbbM3n4cfAohUKjYtKAQ__')"}}>
        <div className="p-8 text-center flex flex-col items-center justify-center h-full">
            <p className="text-xs uppercase tracking-widest font-medium text-text-dark">Summer Sale</p>
            <p className="text-4xl font-semibold text-primary mt-2">75% OFF</p>
            <p className="text-sm text-text-light mt-4">Only Fruit & Vegetable</p>
            <button className="mt-6 bg-white text-primary font-semibold py-3 px-6 rounded-full flex items-center gap-2 shadow-md">
                Shop Now <ArrowRight size={18} />
            </button>
        </div>
    </div>
);


const SideDeals: React.FC = () => {
    const hotDeals = [
        { image: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/2099/fb56/5ffbe623e9b927ae3be066c4f975d1fc?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dCnXK9kqFQ9AODURS399TbsWWMX8dHOgz1STqJDJE9El06G1YTCZNUdsHlV5pM8L1G9Y-imsMyHBMf~4e7jpvD3jRsuTOdSVo2Qe5f7CYWAdDKK~vbmgH3ZhR4A8MUx9Tup-YzccOl4HwRl334MZ29aH8M0cmBGrlcD-4mUmpTOLXV2bE6AWW6YvLIpwYdsBTQ9b085S0odP~sIzFrg8075m66YFXbXfuflvUDK7y0-89M~VAJnkgdoXfbMibsNjax-JheCKwZ1wjVmXyBXHjRE02E2Ec47mQqwO4zGadZhPhGZu4gGETAru9UEA5M~i~W3WZh~kENJhGyrBV7m4Dg__', name: 'Green Apple', price: '$14.99', rating: 4 },
        { image: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/1dd3/ec41/8cbaa44aa8d77ee4cc14c725f33e84b5?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Z-bcUYYdtMf2kLjhFGK4e-MaSMQ12zg4oTvfmAohnMfIojNuNc-BNBfEWxrjjzIDOErHwrslEIgWoBnJcRn1shZR-1lJy67QaMLQEcllZX2-R714wAuNEGlDliopJYZmdhBERfdLoKlN5zmA9JQhjeudeLsLSG5-hG1j7UsrIiL~7Uqjr23npOSiHdivLDFi-z2N26-LZAo~vz-GWyEP4EnzIKOrGSQ6h12n6CFojS4AUAkbnHFXTDxh6LuWJqNdzyhni7vdbTNWTgrLML8qc734ZY55J1YMQTa7aRCpmgIFPq9ZGY08a42hH96W3xsidN7dB4ITV0VD4XL9457N8A__', name: 'Indian Malta', price: '$14.99', rating: 4, isHover: true },
        { image: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/0060/7e42/1590d2f94a62a2213eb3378ad1aa1687?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DcjPEaV~bkHrdScMEqDhaMu4sxVg~tFmmSnX99c4ckSVkCcRebwjPEOkPfJYr-SzVGaz-EGfmBWCwImbSBYA-d1sjpJNd6kUOQZ3tovMoayMiqlm-3zcoNPpcChncLbCmRQtCI9W2v~9-2iFobnAhehICQj5M0sspp~LGM9FqvgGhOC~PDaPz9BRZ2jTgp3WZb3puT74TG8Z1JCMTp2ZxL0Wr7dWR1rpE854cG-H2qxRzA3dZ-0RxVZRlU3Jds1gYfpPGqabk9900FN8tke1l5nbhEuP71J6921uWc8WA80zN7E~2prMSeErUE5h2EvTilOGETj~mFsqe4RQgDAriQ__', name: 'Green Lettuce', price: '$14.99', rating: 4 },
    ];
    const bestSeller = [
        { image: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/b2a4/8360/6891ccd65c5c15fa42de2429eafd19ee?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dxy6sSwZ2Rq7al1rmwfDPLs1qLg-P2uwWEpPott-0S6Du7oV4B9P2YlwheuVVj1zzJ-g8PRx1wFsLEi1nlSbc2LI3cx6J0CUSDdaHWF0ISNRqksyHBmfR2Qnot6lQc1IpoBD1Ik07iG4v3LDoVa7Obxd0fIdYGuTTNueSGPMy7mz92rR9fUPOVUIXFaLLylKHENbzGRNhV1DRs57MAdiYU3JQX0OsX~ZyPHgFoXU26xzG~KG3W~sj-nFwf1njzAFE~6tvo9qfa4BDOL5KgJREvHD81E~oy-KmiCRwNG-dDAsi1fjSG3nUSH06hdfscgveX~A1S8yMMvLU1sv0sROXQ__', name: 'Eggplant', price: '$14.99', rating: 4 },
        { image: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/baf2/3b7f/6e9396ba3e6a81309768f1049ff4f27f?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UFQCrCHdyH9KI2cfYnGG0e2LG8tAdLBni1jiquMGR-u9iIQXK-M6DUNofhLhIHsdmZHK6GZSeHvogDW7fkn-i4c6xsAu1jZokPePLy15kNGEVJKvzu~MUmp~fYHPJVeGa-SvYTkN5cVD2EKRi7JFvcSsf7PG7EGor5e4g85oZ2gvTlcxGt1siSEDrgbnWuJQAuEebhSGylL9ZtG70DQYgRn7rzeXwNBDo1QMNvubRcc5ff04FACbAdvSLYJe6DEhRbSrYbTcK0TiFo2rrmwAsgTaoT0o81R9-gByUXoxgL7of1SPH5XedACESiN3I9EjkFo249VtKSKQd5Wuqr23oA__', name: 'Red Capsicum', price: '$14.99', oldPrice: '$20.99', rating: 4 },
        { image: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/18dd/bef2/fb001d7822f7b5e149be302b40668326?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ac5obNw01nngehlVOFShGFQ3afRRXp6fOKBzN4uCYSjneQ5xh-iJgvLgdMv3NA92~O1GkC8hGtzGtqYegLDIUZJPBJtM~oN0soAnnfH~lUZFu7ctm03SWUVQkcKjl-FuAoCb-NFExmoPYr~VfzrYPqBmj2uvFor3hvJrRz05Thy5o2jtNpE5hAUtsirbBuwNfpO3AopUYfXLVKDzZJEL52MQtkf9a4w8stKrGaeoI0kEmbpfQn9lKnMEQ4PeBR73oKMJm7h4MfPXIfq14YPGeJbu5fccSyXEaf1dTLLil2XRNwgSfdbGBwRSV56~BZ8AFgFVzBn6mN0WekSLwWXbQw__', name: 'Red Tomatos', price: '$14.99', rating: 4 },
    ];
    const topRated = [
        { image: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/8a64/1b99/aade1c6d813825d71e3b0fe5a361d969?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FPHz6Pi2yfDKW7glNnwj7DKcZT2SgEr-9WrpWrKSEUnva-l0j1O7jJLmnk8IA0Q-5d7AgGcSkU3PbtLSpyvjvpXcRA9IgrVu77jOgTL-g~wfDwpv5b2NQY7hbh~418~lBcHMcd~Dl72kbw6WVvSbjBMY6mIojrdLk75eJuC~8354ks4AXAIDSKFYS65zcBT7JZTRZnI88qyVeiz2JN7t2~Ca8KSZh6-01apnb9rgtYRacWB6SgodLLV0eNcav2JBR5XjH8ybJNmPacToqHhqjI4311ZgoaPACASYFn-ELM6apoGegoNWh73CQHnINpiebjTytKxJoztBHXgE3IobCw__', name: 'Big Potatos', price: '$14.99', rating: 4 },
        { image: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/e71e/c1ab/56641c653dec45f6e583b93973777294?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LRuXM16D3iMCLEre4khddORGgQx6Phw59WhHWXX~OQoeMFKeiH8CJKHeUyNKyQWyVTHtD~bYT8n8a-SODR1uqzsvRwrfR58pTvZsfGViZ9LHJmhxMNwBhwL9T0z4HSgplV6J5St4yPmtFAH0FfK7WDd49esXmcRq14CxJkiRHE9sVBOifNonH9v7e0LJYHnXZI8JlBJXYwMaJ6e3sHnG3fJTdl-nXrzPMJGr0TIX2BPxns22GCnOh-9UbLCaEa8b27NUIAprgK4fNoik12nkhEa8ySa4W46teVk24t3nTdmSn-XDLvx3Eym~yu3Lo0JAXYwVd~HUOZrpeuUUMknYlA__', name: 'Corn', price: '$14.99', oldPrice: '$20.99', rating: 4 },
        { image: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/fde1/0b49/06098017c0e42a55c431126a676d09ea?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=piczvG-SHGy-VlgpN-vJ4LaNrSk6WVyoOZEMmrmaGwdkcSOzYDQkSOx4k6VtlQwO0~PTnmoChs8qybMjXds~RePEt1exw86jbS9BQp87Dvx6tItfQIKlVFwbjLqwMGKfa3fX-ss0wy6bgrTU2iQmDlVVLhAA77~jeSBFY0C5gAs0xcXuw0W8aD4Ok0Xhr141eagbuUwAc3ZAiTVOv1RCLzMkIIIkbiPCsfhqQCjIwyOo02xhIKX5VRlOcvfFQBY5NhK39CHFJIRX0U2ualGBloCk-lJhs4FA1gEA-lX8Z~RIGFPdaiaRiYdGhA~nKdm6T11RoiES2j8VyPbPf87yMQ__', name: 'Fresh cauliflower', price: '$14.99', rating: 4 },
    ];
    return (
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <DealSection title="Hot Deals" products={hotDeals} />
            <DealSection title="Best Seller" products={bestSeller} />
            <DealSection title="Top Rated" products={topRated} />
            <BannerCard />
        </section>
    );
};

export default SideDeals;
