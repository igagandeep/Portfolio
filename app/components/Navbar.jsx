"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import Link from "next/link";

const Navbar = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const [isScroll, setIsScroll] = useState(false);
  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };
  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);
  return (
    <>
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:opacity-0">
        <Image src={assets.header_bg_color} alt="" className="w-full " />
      </div>
      <nav
        className={`w-full fixed px-5  lg:px-8 xl:px-[8%] flex items-center justify-between z-50 ${
          isScroll
            ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20"
            : ""
        }`}
      >
        <a href="/Portfolio">
          <h1 className="text-4xl font-SigmarOne">
            Gagan<span className="text-5xl text-red-700">.</span>
          </h1>
        </a>

        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full mt-1 px-12 py-3 ${
            isScroll
              ? ""
              : "bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"
          } `}
        >
          <li>
            <Link href="/" className="font-Ovo">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="font-Ovo">
              About me
            </Link>
          </li>
          <li>
            <Link href="/work" className="font-Ovo">
              My Work
            </Link>
          </li>
          <li>
            <a
              href="https://medium.com/@igagandeep95"
              className="font-Ovo"
              onClick={closeMenu}
              target="_blank"
              rel="noreferrer"
            >
              Blog
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsDarkMode((prev) => !prev)}>
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt=""
              className="w-6"
            />
          </button>
          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo dark:border-white/50"
          >
            {" "}
            Contact{" "}
            <Image
              src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon}
              className="w-3"
              alt="contact icon"
            />
          </Link>
          <button className="block md:hidden ml-3" onClick={openMenu}>
            <Image
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              className="w-6"
              alt=""
            />
          </button>
        </div>

        {/*  Mobile Menu  */}

        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white"
        >
          <div className="absolute right-6 top-6" onClick={closeMenu}>
            <Image
              src={isDarkMode ? assets.close_white : assets.close_black}
              alt="close icon"
              className="w-5 cursor-pointer"
            />
          </div>
          <li>
            <Link href="/" className="font-Ovo" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="font-Ovo" onClick={closeMenu}>
              About me
            </Link>
          </li>
          <li>
            <Link href="/work" className="font-Ovo" onClick={closeMenu}>
              My Work
            </Link>
          </li>
          <li>
            <a
              href="https://medium.com/@igagandeep95"
              className="font-Ovo"
              onClick={closeMenu}
              target="_blank"
              rel="noreferrer"
            >
              Blog
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
