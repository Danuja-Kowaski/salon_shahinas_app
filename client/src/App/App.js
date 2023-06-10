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
import { useLocation } from "react-router-dom";

import BookingSummary from "./Pages/BookingSummary";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import BookingPage from "./Pages/BookingPage";
import BookingConfirm from "./Pages/BookingConfirm";
import Messages from "./Pages/Messages";
import Notifications from "./Pages/Notifications";
import Appointments from "./Pages/Appointments";
import Profile from "./Pages/Profile";

import AdminHome from "./Pages/AdminHome";
import AdminSchedule from "./Pages/AdminSchedule";
import ClientRecords from "./Pages/ClientRecords";
import EmployeeSchedules from "./Pages/EmployeeSchedules";
import ClientReviews from "./Pages/ClientReviews";
import ClientDetails from "./Pages/ClientDetails";

import Protected from "./Pages/common/Protected";
import { getLoggedInUser } from "./utils";
import "./styles.scss";

function App() {
    const location = useLocation();

    const user = getLoggedInUser();
    const isLoggedIn = user ? true : false;

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#FFB6EA",
                },
            }}
        >
            <Routes>
                {/* Normal User Routes */}
                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/home"
                    element={
                        <Protected isLoggedIn={true}>
                            <HomePage />
                        </Protected>
                    }
                />
                <Route
                    path="/"
                    element={
                        <Protected isLoggedIn={true}>
                            <HomePage />
                        </Protected>
                    }
                />
                <Route
                    path="/booking"
                    element={
                        <Protected isLoggedIn={true}>
                            <BookingPage />
                        </Protected>
                    }
                />
                <Route
                    path="/booking-confirm"
                    element={
                        <Protected isLoggedIn={true}>
                            <BookingConfirm />
                        </Protected>
                    }
                />
                <Route
                    path="/booking-summary"
                    element={
                        <Protected isLoggedIn={true}>
                            <BookingSummary />
                        </Protected>
                    }
                />
                <Route
                    path="/messages"
                    element={
                        <Protected isLoggedIn={true}>
                            <Messages />
                        </Protected>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <Protected isLoggedIn={true}>
                            <Notifications />
                        </Protected>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Protected isLoggedIn={true}>
                            <Profile />
                        </Protected>
                    }
                />
                <Route
                    path="/appointments"
                    element={
                        <Protected isLoggedIn={true}>
                            <Appointments />
                        </Protected>
                    }
                />
                {/* Admin/Employee User Routes */}
                <Route
                    path="/admin-home"
                    element={
                        <Protected isLoggedIn={true}>
                            <AdminHome />
                        </Protected>
                    }
                />
                <Route
                    path="/admin-schedule"
                    element={
                        <Protected isLoggedIn={true}>
                            <AdminSchedule />
                        </Protected>
                    }
                />
                <Route
                    path="/admin-client-records"
                    element={
                        <Protected isLoggedIn={true}>
                            <ClientRecords />
                        </Protected>
                    }
                />
                <Route
                    path="/admin-employee-schedules"
                    element={
                        <Protected isLoggedIn={true}>
                            <EmployeeSchedules />
                        </Protected>
                    }
                />
                <Route
                    path="/admin-client-reviews"
                    element={
                        <Protected isLoggedIn={true}>
                            <ClientReviews />
                        </Protected>
                    }
                />
                <Route
                    path="/admin-client-details"
                    element={
                        <Protected isLoggedIn={true}>
                            <ClientDetails />
                        </Protected>
                    }
                />
            </Routes>
            {
            // Dont show navbar if not logged in
            isLoggedIn? 
                location.pathname !== "/login" &&
                location.pathname !== "/register" ? (
                    !(user.user_type === "ADMIN" || user.user_type === "EMP")  ?
                    <div className="navbar">
                        <CustomLink to="/messages" path={location.pathname}>
                            <MailOutlined />
                        </CustomLink>
                        <CustomLink
                            to="/notifications"
                            path={location.pathname}
                        >
                            <BellOutlined />
                        </CustomLink>
                        <CustomLink to="/home" path={location.pathname}>
                            <HomeOutlined />
                        </CustomLink>
                        <CustomLink to="/appointments" path={location.pathname}>
                            <ScheduleOutlined />
                        </CustomLink>
                        <CustomLink to="/profile" path={location.pathname}>
                            <UserOutlined />
                        </CustomLink>
                    </div>
                    :
                    <div className="navbar">
                        <CustomLink to="/admin-home" path={location.pathname}>
                            <HomeOutlined />
                        </CustomLink>
                        <CustomLink to="/messages" path={location.pathname}>
                            <MailOutlined />
                        </CustomLink>
                        {/* <CustomLink
                            to="/notifications"
                            path={location.pathname}
                        >
                            <BellOutlined />
                        </CustomLink> */}
                        <CustomLink to="/admin-schedule" path={location.pathname}>
                            <ScheduleOutlined />
                        </CustomLink>
                        <CustomLink to="/profile" path={location.pathname}>
                            <UserOutlined />
                        </CustomLink>
                    </div>
                ) : null
            : null
            }
        </ConfigProvider>
    );
}

const CustomLink = ({ to, children, path }) => {
    return (
        <Link to={to}>
            <div className={path === to ? "nav-item active" : "nav-item"}>
                {children}
            </div>
        </Link>
    );
};

export default App;
