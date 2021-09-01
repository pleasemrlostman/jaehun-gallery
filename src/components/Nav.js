import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className="flex gap-3 p-3 bg-blue-200">
            <Link to="/">Home</Link>
            <Link to="/profile">My Profile</Link>
        </div>
    );
};

export default Nav;
