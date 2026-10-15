import React from 'react';
import { motion } from 'framer-motion';

const InsightsAndFooter = () => {
    const insights = [
        {
            id: 1,
            type: 'Article',
            title: 'The Future of Proactive Cybersecurity',
            date: 'Oct 12, 2026',
            readTime: '5 min read'
        },
        {
            id: 2,
            type: 'Case Study',
            title: 'How We Mitigated Legal Risks for a Fintech Startup',
            date: 'Sep 28, 2026',
            readTime: '8 min read'
        },
        {
            id: 3,
            type: 'Article',
            title: 'Navigating Governance in the Era of AI',
            date: 'Sep 15, 2026',
            readTime: '6 min read'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="bg-[#0B1730] flex flex-col">
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-3xl md:text-4xl font-bold text-white mb-4"
                            >
                                Featured <span className="text-yellow-500">Insights</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-gray-400 max-w-xl"
                            >
                                Explore our latest articles, case studies, and expert perspectives on risk management and technology.
                            </motion.p>
                        </div>
                        <motion.a
                            href="#"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="hidden md:inline-flex items-center text-yellow-500 font-semibold hover:text-yellow-400 transition-colors"
                        >
                            View All Insights
                            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.a>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {insights.map((insight) => (
                            <motion.div
                                key={insight.id}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="bg-[#132854] rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col cursor-pointer"
                            >
                                <div className="h-48 bg-gradient-to-br from-blue-900/40 to-[#0B1730] relative p-6 flex items-end">
                                    <div className="absolute top-4 left-4 bg-[#0B1730] text-xs font-bold text-gray-300 px-3 py-1 rounded-full border border-gray-600">
                                        {insight.type}
                                    </div>
                                    <div className="w-full h-full absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-xs text-gray-400 mb-3 space-x-4">
                                        <span>{insight.date}</span>
                                        <span>&bull;</span>
                                        <span>{insight.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 leading-snug hover:text-yellow-400 transition-colors">
                                        {insight.title}
                                    </h3>
                                    <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-blue-400">
                                        Read Full {insight.type}
                                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </section>

            <section className="py-20 relative z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-r from-blue-900 to-[#132854] rounded-3xl p-10 md:p-16 text-center shadow-2xl border border-blue-800 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent" />
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10">
                            Ready to Make Risk a <span className="text-yellow-500">Non-Event?</span>
                        </h2>
                        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
                            Let's Discuss Your Requirements. Our team is ready to build a proactive strategy tailored to your business.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-yellow-500 hover:bg-yellow-400 text-[#0B1730] px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] relative z-10"
                        >
                            Get in Touch Today
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            <footer className="bg-[#050B18] pt-20 pb-10 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                        <div className="lg:col-span-1">
                            <a href="#" className="flex items-center mb-6">
                                <span className="font-extrabold text-2xl text-white tracking-widest">
                                    UNEVEN<span className="text-yellow-500">.</span>T
                                </span>
                            </a>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Make it a non-event. We provide proactive cybersecurity, legal counsel, governance, and tech lab solutions for modern enterprises.
                            </p>
                            <div className="flex space-x-4">
                                {['twitter', 'linkedin', 'github'].map((social) => (
                                    <a key={social} href="#" className="w-10 h-10 rounded-full bg-[#132854] flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors">
                                        <span className="sr-only">{social}</span>
                                        <div className="w-4 h-4 bg-current rounded-sm" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 tracking-wide">Services</h4>
                            <ul className="space-y-4">
                                {['Protect (Cybersecurity)', 'Counsel (Legal Risk)', 'Govern (Compliance)', 'Labs (Technology)'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
                            <ul className="space-y-4">
                                {['About Us', 'Industries', 'Insights & Case Studies', 'Careers', 'Contact Us'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 tracking-wide">Contact</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>123 Security Blvd, Suite 400<br />Tech District, NY 10001</span>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:hello@unevent.com" className="hover:text-white transition-colors">hello@unevent.com</a>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <a href="tel:+18005550199" className="hover:text-white transition-colors">+1 (800) 555-0199</a>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} UNEVENT. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Cookie Settings</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default InsightsAndFooter;