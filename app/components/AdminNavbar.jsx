'use client';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useEffect, useState, useContext } from 'react';
import { ProjectContext } from '@/app/context/ProjectContext';
import { useDarkMode } from '../context/DarkModeContext';
import AddProjectForm from './AddProjectForm';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const [isScroll, setIsScroll] = useState(false);
  const { showModal, editing, openCreate, closeModal, submitProject } =
    useContext(ProjectContext);
  const router = useRouter();

  const { logout, user } = useAuth();
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {/* Background accent */}
      <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:opacity-0'>
        <Image src={assets.header_bg_color} alt='' className='w-full ' />
      </div>

      {/* Navbar */}
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] flex items-center justify-between z-50 ${
          isScroll
            ? 'bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20'
            : ''
        }`}
      >
        <a href='#top'>
          <h1 className='text-4xl font-SigmarOne'>
            Gagan<span className='text-5xl text-red-700'>.</span>
          </h1>
        </a>

        <ul
          className={`flex justify-center items-center gap-6 lg:gap-8 mt-1 px-12 py-3 ${
            isScroll
              ? ''
              : 'bg-white shadow-sm bg-opacity-50 dark:bg-transparent'
          }`}
        >
          {user && (
            <>
              <li>
                <button
                  onClick={openCreate}
                  className='font-Ovo text-sm hover:underline'
                >
                  + Project
                </button>
              </li>

              <li>
                <button onClick={handleLogout} className='font-Ovo text-sm'>
                  Logout
                </button>
              </li>
            </>
          )}

          {/* Dark Mode Toggle */}
          <li>
            <button onClick={() => setIsDarkMode((prev) => !prev)}>
              <Image
                src={isDarkMode ? assets.sun_icon : assets.moon_icon}
                alt='toggle theme'
                className='w-5 mt-1'
              />
            </button>
          </li>
        </ul>
      </nav>

      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-darkTheme rounded-xl p-6 w-full max-w-lg relative'>
            <button
              onClick={closeModal}
              className='absolute top-3 right-4 text-gray-500 hover:text-red-500 text-lg font-bold'
            >
              &times;
            </button>
            <h2 className='text-xl font-semibold mb-4'>Add New Project</h2>
            <AddProjectForm
              initialData={editing}
              onSubmit={(id, data) => submitProject(id, data)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
