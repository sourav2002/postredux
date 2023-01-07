import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="flex p-4 bg-purple-600">
      <section className="w-full mx-auto max-w-xl">
        <h1 className="text-white text-5xl mt-6  font-medium">
          Redux Essentials Example
        </h1>
        <Link to="/">
          <div className="navContent mb-1 inline-block float-left  bg-purple-800 mt-8 rounded-md w-auto text-center text-white hover:bg-purple-400">
            <div className="navLinks px-4 py-2 ">Posts</div>
          </div>
        </Link>
        <Link to="/addPost">
          <div className="navContent  inline-block float-right flex-2 bg-purple-800 mt-8 rounded-md w-auto text-center text-white hover:bg-purple-400">
            <div className="navLinks px-4 py-2 ">Add Post</div>
          </div>
        </Link>
      </section>
    </nav>
  );
};

export default Navbar;
