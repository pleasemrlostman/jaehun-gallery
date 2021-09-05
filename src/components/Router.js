import React from "react";
import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Nav from "components/Nav";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn ? <Nav userObj={userObj} /> : null}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile
                                userObj={userObj}
                                refreshUser={refreshUser}
                            />
                        </Route>
                    </>
                ) : (
                    <Route exact path="/" component={Auth} />
                )}
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
};

export default AppRouter;
