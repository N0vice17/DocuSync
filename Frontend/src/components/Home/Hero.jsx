import React from "react";
import { FileEdit, Users, History } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export default function Hero() {
    const [featuresRef, featuresInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <main className="min-h-screen overflow-hidden">
            <section className="bg-gradient-to-b from-gray-50 to-white pb-20 relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
                <div className="container mx-auto px-4 md:px-6 pt-10 md:pt-20 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.h1
                                className="text-5xl md:text-6xl font-bold leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                                    Create and Collaborate
                                </span>
                                <br /> on Documents in
                                <br /> Real-Time
                            </motion.h1>
                            <motion.p
                                className="text-gray-600 text-lg max-w-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                DocuSync makes document editing seamless for teams. Edit together, track changes, and never lose your
                                work again.
                            </motion.p>
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 pt-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                <Link
                                    to="/login"
                                    className="bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-500 hover:to-cyan-500 text-white font-medium py-3 px-6 rounded-md text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                >
                                    Get Started For Free
                                </Link>
                                <Link
                                    to="/login"
                                    className="border border-gray-300 hover:border-sky-400 text-gray-700 font-medium py-3 px-6 rounded-md text-center transition-all duration-300 hover:bg-sky-50 transform hover:-translate-y-1"
                                >
                                    See How It Works
                                </Link>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto transform hover:rotate-1 transition-transform duration-300 hover:shadow-cyan-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex gap-1">
                                        <motion.div className="w-3 h-3 rounded-full bg-red-400" whileHover={{ scale: 1.2 }}></motion.div>
                                        <motion.div className="w-3 h-3 rounded-full bg-yellow-400" whileHover={{ scale: 1.2 }}></motion.div>
                                        <motion.div className="w-3 h-3 rounded-full bg-green-400" whileHover={{ scale: 1.2 }}></motion.div>
                                    </div>
                                    <div className="text-xs text-gray-500">DocuSync.doc</div>
                                </div>
                                <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-lg p-4 mb-4 border border-sky-100">
                                    <div className="space-y-2">
                                        <motion.div
                                            className="h-4 w-3/4 bg-sky-200 rounded"
                                            animate={{ width: ["60%", "75%", "70%"] }}
                                            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                                        ></motion.div>
                                        <motion.div
                                            className="h-4 w-full bg-sky-200 rounded"
                                            animate={{ width: ["90%", "100%", "95%"] }}
                                            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
                                        ></motion.div>
                                        <motion.div
                                            className="h-4 w-2/3 bg-sky-200 rounded"
                                            animate={{ width: ["50%", "65%", "55%"] }}
                                            transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
                                        ></motion.div>
                                        <motion.div
                                            className="h-4 w-5/6 bg-sky-200 rounded"
                                            animate={{ width: ["70%", "85%", "75%"] }}
                                            transition={{
                                                duration: 5.5,
                                                repeat: Number.POSITIVE_INFINITY,
                                                repeatType: "reverse",
                                                delay: 1.5,
                                            }}
                                        ></motion.div>
                                        <motion.div
                                            className="h-4 w-3/4 bg-sky-200 rounded"
                                            animate={{ width: ["60%", "75%", "65%"] }}
                                            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 2 }}
                                        ></motion.div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <div className="flex -space-x-2">
                                        <motion.div
                                            className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs border-2 border-white"
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            JD
                                        </motion.div>
                                        <motion.div
                                            className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-white text-xs border-2 border-white"
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            KL
                                        </motion.div>
                                        <motion.div
                                            className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white text-xs border-2 border-white"
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            MN
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                                        animate={{
                                            backgroundColor: [
                                                "rgba(243, 244, 246, 1)",
                                                "rgba(224, 242, 254, 0.5)",
                                                "rgba(243, 244, 246, 1)",
                                            ],
                                        }}
                                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                                    >
                                        3 people editing...
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                ></motion.div>
            </section>

            <section className="py-20 relative" ref={featuresRef}>
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Powerful Features for{" "}
                            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                                Document Collaboration
                            </span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Everything you need to create, edit, and collaborate on documents with your team.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        variants={container}
                        initial="hidden"
                        animate={featuresInView ? "show" : "hidden"}
                    >
                        <motion.div
                            className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-sky-200 bg-white group"
                            variants={item}
                            whileHover={{ y: -10 }}
                        >
                            <div className="bg-gradient-to-br from-sky-400 to-cyan-400 w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                <Users size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-sky-500 transition-colors">
                                Real-time Collaboration
                            </h3>
                            <p className="text-gray-600">
                                Work together with your team in real-time. See changes as they happen and never worry about version
                                conflicts.
                            </p>
                        </motion.div>

                        <motion.div
                            className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-sky-200 bg-white group"
                            variants={item}
                            whileHover={{ y: -10 }}
                        >
                            <div className="bg-gradient-to-br from-sky-400 to-cyan-400 w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                <FileEdit size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-sky-500 transition-colors">Markdown Support</h3>
                            <p className="text-gray-600">
                                Write in markdown and see your formatting in real-time. Focus on content while we handle the styling.
                            </p>
                        </motion.div>

                        <motion.div
                            className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-sky-200 bg-white group"
                            variants={item}
                            whileHover={{ y: -10 }}
                        >
                            <div className="bg-gradient-to-br from-sky-400 to-cyan-400 w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                <History size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-sky-500 transition-colors">Document History</h3>
                            <p className="text-gray-600">
                                Access previous versions and track all changes. Restore any version with a single click.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
