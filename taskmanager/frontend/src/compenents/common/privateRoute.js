import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthStateContext } from "../../contexts/authContext";
const PrivateRoute = ({ component: Component, ...args }) => {
    const auth = useContext(AuthStateContext);
    return (
        <Route
            {...args}
            render={(props) => {
                if (auth.isLoading) {
                    return <h2>Loading...</h2>;
                } else if (!auth.isAuthenticated) {
                    return <Redirect to="/login" />;
                } else return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;
