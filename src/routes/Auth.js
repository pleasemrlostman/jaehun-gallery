import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    const changeNewAccount = () => {
        setNewAccount((prev) => !prev);
    };
    const onSocialClick = async (e) => {
        const {
            target: { name },
        } = e;
        let provider;
        if (name === "googleLogin") {
            console.log(name);
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "githubLogin") {
            console.log(name);
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
    };

    return (
        <div className="flex flex-col items-center justify-center border p-4 w-full m-auto h-screen max-w-sm">
            <form
                onSubmit={onSubmit}
                className="flex flex-col items-center justify-center w-full"
            >
                <input
                    className="border border-gray-500 w-full mb-3 p-2 rounded-lg"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="이메일을 입력해주세요"
                />
                <input
                    className="border border-gray-500 w-full mb-3 p-2 rounded-lg"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="비밀번호를 입력해주세요"
                />
                <input
                    className="border text-white bg-blue-600  w-full mb-3 p-2 rounded-lg"
                    type="submit"
                    value={newAccount ? "회원가입" : "로그인"}
                />
            </form>
            <p className="p-2 text-red-500 text-xs">{errorMessage}</p>
            <p className="p-2 text-blue-500" onClick={changeNewAccount}>
                {newAccount ? "로그인으로 전환하기" : "회원가입으로 전환하기"}
            </p>
            <div className="flex flex-col items-center justify-center w-full">
                <button
                    className="border border-gray-500 w-full mb-3 p-2 rounded-lg"
                    onClick={onSocialClick}
                    name="googleLogin"
                >
                    구글로 로그인하기
                </button>
                <button
                    className="border border-gray-500 w-full mb-3 p-2 rounded-lg"
                    onClick={onSocialClick}
                    name="githubLogin"
                >
                    깃허브로 로그인하기
                </button>
            </div>
        </div>
    );
};

export default Auth;
