import React, { useState, useEffect } from "react";
import { Tablet, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
            <div className="container mx-auto px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 text-sky-400 font-bold text-xl z-50">
                        <motion.div
                            className="bg-gradient-to-r from-sky-400 to-cyan-400 text-white p-1.5 rounded-lg"
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}>
                            <Tablet size={20} />
                        </motion.div>
                        <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            DocuSync
                        </motion.span>
                    </a>
                    <nav className="hidden md:flex items-center gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}>
                            <a href="/" className="text-gray-600 hover:text-sky-500 transition-colors relative group">
                                Features
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}>
                            <a href="/" className="text-gray-600 hover:text-sky-500 transition-colors relative group">
                                Collaboration
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}>
                            <a href="/login" className="text-gray-600 hover:text-sky-500 transition-colors relative group">
                                Log In
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </motion.div>
                    </nav>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}>
                        <a
                            href="/signup"
                            className="hidden md:block bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-500 hover:to-cyan-500 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                        >
                            Sign Up Free
                        </a>
                    </motion.div>

                    <button className="md:hidden z-50 text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
                                initial={{ opacity: 0, x: "100%" }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: "100%" }}
                                transition={{ duration: 0.3 }}>
                                <a
                                    href="#features"
                                    className="text-xl font-medium text-gray-800 hover:text-sky-500 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}>
                                    Features
                                </a>
                                <a
                                    href="#collaboration"
                                    className="text-xl font-medium text-gray-800 hover:text-sky-500 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Collaboration
                                </a>
                                <a
                                    href="/login"
                                    className="text-xl font-medium text-gray-800 hover:text-sky-500 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Log In
                                </a>
                                <a
                                    href="/signup"
                                    className="bg-gradient-to-r from-sky-400 to-cyan-400 text-white font-medium py-2 px-6 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign Up Free
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
