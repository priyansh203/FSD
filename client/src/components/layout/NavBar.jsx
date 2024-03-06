import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-400 to-purple-500 px-5 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <NavLink className="text-2xl font-bold text-white" to={"/"}>
            Online Quiz App
          </NavLink>
          <button
            className="text-white focus:outline-none lg:hidden"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div className="hidden lg:block">
            <ul className="flex items-center space-x-6 text-white">
              <li>
                <NavLink className="hover:text-gray-200" to={"/admin"}>
                  Admin
                </NavLink>
              </li>
              <li>
                <NavLink className="hover:text-gray-200" to={"/quiz-stepper"}>
                  Take Quiz
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:hidden">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="flex flex-col items-start space-y-4 text-white">
              <li>
                <NavLink className="hover:text-gray-200" to={"/admin"}>
                  Admin
                </NavLink>
              </li>
              <li>
                <NavLink className="hover:text-gray-200" to={"/quiz-stepper"}>
                  Take Quiz
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
