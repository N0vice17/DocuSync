import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="border-t border-gray-100 py-8 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <motion.h3
                            className="font-bold text-gray-800 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            DocuSync
                        </motion.h3>
                        <motion.p
                            className="text-gray-600 text-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            Create and collaborate on documents in real-time with your team.
                        </motion.p>
                    </div>

                    <div>
                        <motion.h3
                            className="font-bold text-gray-800 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Product
                        </motion.h3>
                        <motion.ul
                            className="space-y-2 text-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    Integrations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    Changelog
                                </a>
                            </li>
                        </motion.ul>
                    </div>

                    <div>
                        <motion.h3
                            className="font-bold text-gray-800 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Resources
                        </motion.h3>
                        <motion.ul
                            className="space-y-2 text-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    Tutorials
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    Support
                                </a>
                            </li>
                        </motion.ul>
                    </div>

                    <div>
                        <motion.h3
                            className="font-bold text-gray-800 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Company
                        </motion.h3>
                        <motion.ul
                            className="space-y-2 text-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-sky-500 transition-colors">
                                    Terms
                                </a>
                            </li>
                        </motion.ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <motion.p
                        className="text-gray-500 text-sm mb-4 md:mb-0"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        © 2025 DocuSync. All rights reserved.
                    </motion.p>
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
