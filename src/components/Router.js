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

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn ? <Nav /> : null}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/profile" component={Profile} />
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
