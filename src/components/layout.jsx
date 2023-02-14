import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/rm_title.png";
import { HiHome, HiSwatch, HiUsers } from "react-icons/hi2";

const HeaderFooter = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <div className="flex w-full justify-between bg-secondary border-b border-primary md:px-32">
        <div className="h-16 flex items-center mx-4">
          <Link to="/">
            <img src={logo} className="h-10" alt="logo" />
          </Link>
        </div>
        <div className="h-16 flex items-center mx-4">
          <Link to="/characters" className="">
            <HiUsers size={30} color="#59e369" />
          </Link>
          <Link to="/episodes" className=" px-4">
            <HiSwatch size={30} color="#59e369" />
          </Link>
          <Link to="/">
            <HiHome size={30} color="#59e369" />
          </Link>
        </div>
      </div>
      {children}
      <div className="w-full h-10 items-center flex justify-center bg-secondary text-offwhite border-t border-b border-primary">
        Made with 💚 by{" "}
        <a
          href="https://github.com/zahidmuhammed"
          target="_blank"
          rel="noreferrer"
        >
          &nbsp;Zahid
        </a>
      </div>
    </div>
  );
};

export default HeaderFooter;
