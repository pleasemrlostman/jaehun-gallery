import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ userObj }) => {
    return (
        <div className="flex p-3 justify-between bg-blue-200 fixed w-full top-0 left-0">
            <h1 className="font-bold">정재훈 갤러리</h1>
            <div className="flex gap-3">
                <Link to="/">Home</Link>
                <Link to="/profile">{userObj.displayName}의 프로필</Link>
            </div>
        </div>
    );
};

export default Nav;
