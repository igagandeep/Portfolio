"use client";
import { assets, infoList, socialLinks, toolsData } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useDarkMode } from "../context/DarkModeContext";

const About = () => {
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
      className="w-full px-[12%] py-10 scroll-mt-10"
      id="about"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl mb-2 mt-20 font-Ovo"
      >
        About me
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="flex w-full flex-col lg:flex-row items-center gap-20 my-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.6 }}
          className="w-64  sm:w-80 rounded-3xl max-w-none"
        >
          <Image
            src={assets.profile_img}
            alt="user"
            className="w-full rounded-3xl"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex-1"
        >
          <p className="mb-10 max-w-2xl font-Ovo">
            I am a dedicated Frontend Developer with 1+ years of experience in
            the field. Over the past year, I have worked on impactful projects,
            refining my technical skills and contributing to the success of my
            team. My experience has allowed me to develop a strong foundation in
            frontend development while continuously learning and adapting to new
            challenges.
          </p>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3  sm:grid-cols-auto gap-8 max-w-2xl"
          >
            {infoList.map(({ icon, title, iconDark, description }, index) => (
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="border-[0.5px] border-gray-400 rounded-xl p-5 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50"
                key={index}
              >
                <Image
                  src={isDarkMode ? iconDark : icon}
                  alt={title}
                  className="w-7 mt-3"
                />
                <h3 className="my-3 font-semibold text-gray-700 dark:text-white">
                  {title}
                </h3>
                <p className="text-gray-600 text-xs dark:text-white/80">
                  {description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="my-5 text-gray-700 font-Ovo dark:text-white/80"
          >
            Find Me Online
          </motion.h4>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex items-center gap-3 sm:gap-5"
          >
            {socialLinks.map((d, index) => (
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center w-12 sm:w-14 hover:-translate-y-1 duration-500 aspect-square border border-gray-400 rounded-lg"
                key={index}
              >
                <a href={d.link} target="_blank" rel="noreferrer">
                  <Image src={d.icon} alt={d.icon} className="w-5 sm:w-7" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
