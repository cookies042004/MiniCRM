import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900 text-white px-6"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-6 max-w-2xl"
      >
        <motion.h1
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-5xl font-extrabold leading-tight"
        >
          Welcome to Mini CRM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-lg text-white/80"
        >
          Manage your campaigns smartly with our intuitive and powerful tools. Start your journey now.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="bg-white text-indigo-700 font-semibold py-3 px-6 rounded-lg shadow transition hover:cursor-pointer"
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Home;
