'use client';
import { assets, workData } from '@/assets/assets';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ProjectContext } from '@/app/context/ProjectContext';

const Work = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { projects } = useContext(ProjectContext);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false); // Clean up when component unmounts
  }, []);

  if (projects === null) {
    return (
      <div className='w-full px-[12%] py-10' id='work'>
        <h2 className='text-center text-5xl font-Ovo mt-20'>My latest work</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-5'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className='h-64 w-full bg-gray-300 animate-pulse rounded-10 relative'
            >
              <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between'>
                <div>
                  <div className='h-4 w-24 bg-gray-200 rounded mb-2'></div>
                  <div className='h-3 w-16 bg-gray-200 rounded'></div>
                </div>
                <div className='w-9 aspect-square rounded-full border bg-gray-200'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className='w-full px-[12%] py-10 scroll-mt-20'
      id='work'
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='text-center text-5xl font-Ovo mt-20'
      >
        My latest work
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-5 dark:text-black'
      >
        {projects?.map((project, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            key={index}
            className='h-64 w-full bg-no-repeat bg-cover bg-center rounded-10 relative cursor-pointer group'
            style={{ backgroundImage: `url(${project.coverImage})` }}
          >
            <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
              <div>
                <h2>{project.title}</h2>
                <p>{project.type}</p>
              </div>
              <a
                href={project.liveLink}
                target='_blank'
                className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition'
              >
                <Image src={assets.send_icon} alt='send icon' className='w-5' />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Work;
