import React from "react";
import {
  BookOpen,
  Users,
  FileText,
  Edit,
  Search
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Real-time Collaboration",
    description: "Work together with your team in real-time. See changes as they happen and never worry about version conflicts again.",
    icon: Users
  },
  {
    title: "Markdown Support",
    description: "Write in markdown and see your formatting in real-time with our powerful editor that supports all markdown features.",
    icon: Edit
  },
  {
    title: "Document History",
    description: "Access the complete history of your documents. See who made changes and when, and restore previous versions easily.",
    icon: FileText
  },
  {
    title: "Smart Search",
    description: "Find anything in your documents instantly with our powerful search feature that understands context and content.",
    icon: Search
  },
  {
    title: "Document Templates",
    description: "Get started quickly with customizable templates for any kind of document your team needs to create.",
    icon: BookOpen
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      variants={item}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 group"
    >
      <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
        {feature.title}
      </h3>
      <p className="text-gray-600">{feature.description}</p>
    </motion.div>
  );
};

const Button = ({ children, className = "", variant = "solid", ...props }) => {
  const base =
    "rounded font-semibold focus:outline-none transition-colors duration-200";
  const solid =
    "bg-sky-400 hover:bg-sky-500 text-white border border-sky-400";
  const outline =
    "border border-sky-400 text-sky-400 hover:bg-sky-50 bg-transparent";
  const styles =
    variant === "outline"
      ? `${base} ${outline} ${className}`
      : `${base} ${solid} ${className}`;
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};


const Home = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-sky-50 via-white to-white min-h-[70vh] py-16 md:py-24 flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: Headline, Subheading, CTA */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="block bg-gradient-to-r from-sky-400 to-sky-600 text-transparent bg-clip-text">
                  Create and <br className="hidden md:block" />
                  Collaborate
                </span>
                <span className="block text-black mt-2">
                  on <span className="font-black">Documents in</span>
                  <br />
                  <span className="font-black">Real-Time</span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                DocuSync makes document editing seamless for teams. Edit together, track changes, and never lose your work again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="py-4 px-8 text-base md:text-lg font-bold shadow-sm">
                  Get Started For Free
                </Button>
                <Button variant="outline" className="py-4 px-8 text-base md:text-lg font-bold">
                  See How It Works
                </Button>
              </div>
            </div>

            {/* Right: Card Mockup */}
            <div className="mt-10 md:mt-0 flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-sky-100 rounded-lg"></div>
                <div className="relative bg-white border border-gray-200 shadow-xl rounded-xl p-6 min-w-[320px] max-w-[380px]">
                  <div className="flex items-center mb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="mx-auto text-sm text-gray-500 font-medium">DocuSync.doc</div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-6 bg-sky-50 rounded w-3/4"></div>
                    <div className="h-4 bg-sky-50 rounded w-full"></div>
                    <div className="h-4 bg-sky-50 rounded w-5/6"></div>
                    <div className="h-4 bg-sky-50 rounded w-full"></div>
                    <div className="h-4 bg-sky-50 rounded w-2/3"></div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-sky-400 flex items-center justify-center text-xs text-white font-bold border-2 border-white shadow -ml-0">U1</div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs text-white font-bold border-2 border-white shadow -ml-2">U2</div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white font-bold border-2 border-white shadow -ml-2">U3</div>
                    <div className="text-xs text-gray-500 ml-2">3 people editing</div>
                    <div className="w-2 h-2 bg-green-400 rounded-full ml-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100 relative overflow-hidden">
        {/* Background decorative elements using default Tailwind colors */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl z-0"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.div
              whileInView={{ scale: [0.95, 1] }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
                  Document Collaboration
                </span>
              </h2>
            </motion.div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, edit, and collaborate on documents with your team.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
