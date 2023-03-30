import { React } from "react";

import { ConfigProvider } from "antd";
import {
    MailOutlined,
    BellOutlined,
    HomeOutlined,
    ScheduleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";

import BookingSummary from "./Pages/BookingSummary";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import BookingPage from "./Pages/BookingPage";
import BookingConfirm from "./Pages/BookingConfirm";
import Messages from "./Pages/Messages";
import Notifications from "./Pages/Notifications";
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
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/booking-confirm" element={<BookingConfirm />} />
                <Route path="/booking-summary" element={<BookingSummary />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/notifications" element={<Notifications />} />
            </Routes>
            <div className="navbar">
                <CustomLink to="/messages">
                    <MailOutlined />
                </CustomLink>
                <CustomLink to="/notifications">
                    <BellOutlined />
                </CustomLink>
                <CustomLink to="/home">
                    <HomeOutlined />
                </CustomLink>
                <CustomLink to="/booking">
                    <ScheduleOutlined />
                </CustomLink>
                <CustomLink to="/account">
                    <UserOutlined />
                </CustomLink>
            </div>
        </ConfigProvider>
    );
}

const CustomLink = ({ to, children }) => {
    let path = window.location.pathname;

    console.log(path);

    return (
        <Link to={to}>
            {/* <div className={path === to ? "nav-item active" : "nav-item"}> */}
            <div className="nav-item">{children}</div>
        </Link>
    );
};

export default App;
