import AppRouter from "./Router";
import LoadingSpinner from "components/LoadingSpinner";
import { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
    const [firstInit, setFirstInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            uid: user.uid,
            displayName: user.displayName,
            updateProfile: (args) => user.updateProfile(args),
        });
    };
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    uid: user.uid,
                    displayName: user.displayName,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setUserObj(false);
            }
            setFirstInit(true);
        });
    }, []);
    return (
        <div className="App">
            {firstInit ? (
                <AppRouter
                    isLoggedIn={Boolean(userObj)}
                    userObj={userObj}
                    refreshUser={refreshUser}
                />
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
}

export default App;
