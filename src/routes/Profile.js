import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Profile = ({ userObj, refreshUser }) => {
    const onLogOutClick = () => authService.signOut();
    const getMyContent = async () => {
        const content = await dbService
            .collection("contents")
            .where("userId", "==", userObj.uid)
            .orderBy("createdDate", "desc")
            .get();
        console.log(content);
    };

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName });
            refreshUser();
        }
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewDisplayName(value);
    };

    useEffect(() => {
        getMyContent();
    }, []);

    return (
        <>
            <div className="w-full fixed left-0 bottom-0 p-5 bg-red-600 text-white text-center">
                <button onClick={onLogOutClick}>LogOut</button>
            </div>
            <div className="p-3 pt-16">
                <form
                    onSubmit={onSubmit}
                    className="flex border-black-500 border w-full mb-3"
                >
                    <input
                        onChange={onChange}
                        className="p-3 w-9/12"
                        type="text"
                        placeholder="닉네임 설정"
                        value={newDisplayName}
                    />
                    <input
                        className="p-3 w-3/12 text-xs"
                        type="submit"
                        value="닉네임 변경"
                    ></input>
                </form>
            </div>
        </>
    );
};

export default Profile;
