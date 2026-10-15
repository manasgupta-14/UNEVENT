import React from 'react';
import { motion } from 'framer-motion';

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
            icon: (
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01" />
                </svg>
            )
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
            icon: (
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
            )
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
            icon: (
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 9h-4.5a.5.5 0 01-.5-.5V4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 16.5l-3 3-1.5-1.5" />
                </svg>
            )
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
            icon: (
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            )
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
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                        Comprehensive <span className="text-yellow-500">Solutions</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Integrated services designed to protect your assets, ensure compliance, and drive technological innovation.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {services.map((service) => (
                        <motion.a
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
                        </motion.a>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default ServiceCard;