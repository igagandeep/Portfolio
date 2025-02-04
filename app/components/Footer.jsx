import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import {motion} from "motion/react";

const Footer = ({isDarkMode}) => {
  return (
    <motion.div 
    initial={{ opacity: 0}}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    
    className="mt-20">
      <div className="flex flex-col items-center text-center">
        <Image src={assets.logo} alt="logo" className="w-36 mx-auto mb-2" />
        <div className="w-max flex items-center gap-2 max-auto ">
          <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} alt="mail icon" className="w-6" />
          igagandeep95@gmail.com
        </div>
      </div>
      <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6">
        <p>© 2025 Gagandeep Guru. All rights reserved.</p>
        <ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
          <li>
            <a target="_blank" href="https://github.com/igagandeep">
              GitHub
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.linkedin.com/in/igagandeep95">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#">
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Footer;
