import { React, useEffect } from "react";

import {
    SettingOutlined,
    UserOutlined,
    CreditCardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { getLoggedInUser } from "../../utils";

import "./styles.sass";

const Profile = () => {
    const user = getLoggedInUser();
    const navigate = useNavigate();

    const logout = async () => {
        //Logout
        await localStorage.removeItem("user");
        await localStorage.removeItem("employees");
        await localStorage.removeItem("client");
        navigate("/login");
    };

    useEffect(() => {
        console.log("current user", getLoggedInUser());
    }, []);

    return (
        <div className="profile-section background-theme">
            <h4>My Profile</h4>
            <div className="profile-header">
                <div className="profile-img">
                    <img
                        alt="profile"
                        src="https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                    />
                </div>
                <h4>{user.username}</h4>
            </div>
            <div className="profile-content">
                <div className="content-icon">
                    <UserOutlined style={{ fontSize: "2em" }} />
                </div>
                <h5>Account Details</h5>
            </div>
            <div className="profile-content">
                <div className="content-icon">
                    <CreditCardOutlined style={{ fontSize: "2em" }} />
                </div>
                <h5>Payment Options</h5>
            </div>
            <div className="profile-content">
                <div className="content-icon">
                    <SettingOutlined style={{ fontSize: "2em" }} />
                </div>
                <h5>Settings</h5>
            </div>
            <div className="logout-row">
                <Button type="primary" size={"large"} onClick={logout}>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Profile;
