"use client";
import { assets, workData } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useDarkMode } from "../context/DarkModeContext";

const Work = () => {
  const { isDarkMode } = useDarkMode();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false); // Clean up when component unmounts
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full px-[12%] py-10 scroll-mt-20"
      id="work"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center text-5xl font-Ovo mt-20"
      >
        My latest work
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-5 dark:text-black"
      >
        {workData.map((project, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            key={index}
            className="aspect-square bg-no-repeat bg-cover bg-center rounded-10 relative cursor-pointer group"
            style={{ backgroundImage: `url(${project.bgImage})` }}
          >
            <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
              <div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
              <a
                href={project.link}
                target="_blank"
                className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition"
              >
                <Image src={assets.send_icon} alt="send icon" className="w-5" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Work;
