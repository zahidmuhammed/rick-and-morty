import React, { useEffect } from "react";
import logo from "../images/rm_title.png";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";

const HeaderFooter = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-screen">
      <div className="flex w-full justify-between bg-white border-b border-[#97ce4c]">
        <div className="h-16 flex items-center mx-4 md:mx-10">
          <Link to="/">
            <img src={logo} className="h-10" alt="logo" />
          </Link>
        </div>
        <div className="h-16 flex items-center mx-4 md:mx-10">
          <Link to="/">
            <HiHome size={30} color="#97ce4c" />
          </Link>
        </div>
      </div>
      {children}
      <div className="w-full h-10 items-center flex justify-center bg-white border-t border-b border-[#97ce4c]">
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
