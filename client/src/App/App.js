import React from "react";

import { ConfigProvider } from "antd";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import BookingPage from "./Pages/BookingPage";
import {
    MailOutlined,
    BellOutlined,
    HomeOutlined,
    ScheduleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.scss";

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#FFB6EA",
                },
            }}
        >
            {/* <LoginPage /> */}
            {/* <RegisterPage /> */}
            {/* <HomePage /> */}
            <BookingPage />
            <div className="navbar">
                <div className="nav-item">
                    <MailOutlined />
                </div>
                <div className="nav-item">
                    <BellOutlined />
                </div>
                <div className="nav-item active">
                    <HomeOutlined />
                </div>
                <div className="nav-item">
                    <ScheduleOutlined />
                </div>
                <div className="nav-item">
                    <UserOutlined />
                </div>
            </div>
        </ConfigProvider>
    );
}

export default App;
