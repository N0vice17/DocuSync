import React, { useState, useEffect } from "react";
import { Tablet, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

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
                    <Link to="/" className="flex items-center gap-2 text-sky-400 font-bold text-xl z-50">
                        <motion.div
                            className="bg-gradient-to-r from-sky-400 to-cyan-400 text-white p-1.5 rounded-lg"
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}>
                            <Tablet size={20} />
                        </motion.div>
                        <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                            DocuSync
                        </motion.span>
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}>
                        <Link
                            to="/signup"
                            className="hidden md:block bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-500 hover:to-cyan-500 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                        >
                            Sign Up Free
                        </Link>
                    </motion.div>

                </div>
            </div>
        </header>
    );
}
