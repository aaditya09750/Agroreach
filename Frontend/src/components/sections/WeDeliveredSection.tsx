import React from 'react';

const WeDeliveredSection: React.FC = () => {
    return (
        <section className="relative bg-white flex items-center justify-center px-4 py-6 md:py-0">
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-start">
                {/* === Left Images === */}
                <div className="relative w-full md:pb-20">
                    {/* Top-left image */}
                    <img
                        src="https://framerusercontent.com/images/QXBBKSzHrTvb8fGy5vmCdLCcGY.jpg?scale-down-to=1024"
                        alt="mentor"
                        className="w-80 hidden lg:block shadow-md hover:shadow-xl"
                    />

                    {/* Bottom-right overlapped image */}
                    <img
                        src="https://framerusercontent.com/images/DF1amgBUwj71QliDNFpe60526wk.jpg?scale-down-to=1024"
                        alt="woman"
                        className="w-72 lg:absolute left-36 top-52 shadow-md hover:shadow-xl border-4 border-primary"
                    />
                </div>

                {/* === Right Content === */}
                <div>
                    <div className="space-y-4">
                        <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wide">
                            SINCE 2019
                        </p>

                        <h2 className="text-2xl md:text-4xl lg:text-4xl font-bold text-text-dark leading-tight">
                            Meet Our Visionary Leader{" "}
                            <span className="text-primary">– Founder, Tanvi Ithape.</span>
                        </h2>

                        <p className="mt-6 text-base text-text-muted leading-relaxed">
                            Tanvi Ithape, the driving force behind Agroreach, is a
                            passionate agricultural entrepreneur with over 10 years of experience. She has
                            connected 350+ farmers with urban consumers, combining sustainable
                            farming practices with innovative supply chain solutions. For Tanvi, agriculture is
                            a tool for rural empowerment and food security. Her vision has made
                            Agroreach a bridge between farms and families, ensuring produce
                            is not only fresh but ethically sourced. She's driven by a
                            belief that every farmer deserves fair prices and her mission is
                            to help them thrive while delivering quality to every household.
                        </p>

                        <div className="border-l-4 border-primary pl-6 py-2 mt-8">
                            <p className="text-text-dark font-semibold text-lg">
                                Founder & CEO, Agroreach.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeDeliveredSection;
