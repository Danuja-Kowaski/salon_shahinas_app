import React from "react";
import { Navigate } from "react-router-dom";

import { getLoggedInUser } from "../../../utils";

// Conditions is an array of booleans
const Protected = ({ isLoggedIn = false, children }) => {
    //switch case here
    if (isLoggedIn) {
        const user = getLoggedInUser();
        if (!user) {
            return <Navigate to="/login" replace />;
        }
    }
    return children;
};
export default Protected;
