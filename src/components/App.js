import AppRouter from "./Router";
import LoadingSpinner from "components/LoadingSpinner";
import { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
    const [firstInit, setFirstInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(isLoggedIn);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(user);
            } else {
                setIsLoggedIn(false);
            }
            setFirstInit(true);
        });
    }, []);
    return (
        <div className="App">
            {firstInit ? (
                <AppRouter isLoggedIn={isLoggedIn} />
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
}

export default App;
