import React from 'react';
import { m } from 'framer-motion';
import { ServiceImage } from './ui/icons';

const ServiceCard = () => {
    const services = [
        {
            id: 'protect',
            prefix: 'UNEVENT',
            title: 'PROTECT',
            description: 'Make cyber threats a non-event.',
            iconColor: 'text-blue-500',
            glowColor: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
            borderColor: 'group-hover:border-blue-500',
            link: '#',
            icon: <ServiceImage id="protect" className="w-16 h-16" />
        },
        {
            id: 'counsel',
            prefix: 'UNEVENT',
            title: 'COUNSEL',
            description: 'Make legal risk a non-event.',
            iconColor: 'text-yellow-500',
            glowColor: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]',
            borderColor: 'group-hover:border-yellow-500',
            link: '#',
            icon: <ServiceImage id="counsel" className="w-16 h-16" />
        },
        {
            id: 'govern',
            prefix: 'UNEVENT',
            title: 'GOVERN',
            description: 'Make compliance failures a non-event.',
            iconColor: 'text-purple-500',
            glowColor: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
            borderColor: 'group-hover:border-purple-500',
            link: '#',
            icon: <ServiceImage id="govern" className="w-16 h-16" />
        },
        {
            id: 'labs',
            prefix: 'UNEVENT',
            title: 'LABS',
            description: 'Make technology challenges a non-event.',
            iconColor: 'text-orange-500',
            glowColor: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]',
            borderColor: 'group-hover:border-orange-500',
            link: '#',
            icon: <ServiceImage id="labs" className="w-16 h-16" />
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="py-24 bg-[#0B1730]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <m.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                        Comprehensive <span className="text-yellow-500">Solutions</span>
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Integrated services designed to protect your assets, ensure compliance, and drive technological innovation.
                    </m.p>
                </div>

                <m.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {services.map((service) => (
                        <m.a
                            href={service.link}
                            key={service.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className={`group flex flex-col items-center text-center p-8 rounded-2xl bg-[#132854] border border-gray-700 transition-all duration-300 ${service.glowColor} ${service.borderColor}`}
                        >
                            <div className={`mb-6 p-4 rounded-full bg-[#0B1730] transition-colors duration-300 ${service.iconColor}`}>
                                {service.icon}
                            </div>

                            <div className="mb-2">
                                <span className={`text-xs font-bold tracking-widest ${service.iconColor} mb-1 block`}>
                                    {service.prefix}
                                </span>
                                <h3 className="text-2xl font-bold text-white tracking-wide">
                                    {service.title}
                                </h3>
                            </div>

                            <p className="text-gray-400 mt-4 mb-8 flex-grow">
                                {service.description}
                            </p>

                            <div className="flex items-center text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors mt-auto">
                                Explore Service
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </m.a>
                    ))}
                </m.div>

            </div>
        </section>
    );
};

export default ServiceCard;