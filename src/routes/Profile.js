import { authService } from "fbase";
import React from "react";

const onLogOutClick = () => authService.signOut();

const Profile = () => {
    return (
        <div>
            <button onClick={onLogOutClick}>LogOut</button>
        </div>
    );
};

export default Profile;
