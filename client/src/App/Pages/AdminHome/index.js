import { React, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { getLoggedInUser } from "../../utils";

import "./styles.sass";

const AdminHome = () => {
    const user = getLoggedInUser();
    const userType = user.user_type;
    const navigate = useNavigate();

    useEffect(() => {
        if (!(userType === "ADMIN" || userType === "EMP")) {
            navigate("/home");
        }
    }, []);

    const openSchedule = () => {
        navigate("/admin-schedule", { state: { isAdmin: true } });
    };

    return (
        <div className="admin-home-section">
            <h2>Hello, employee</h2>
            <div className="admin-stats">
                <div className="stats-item">
                    <div className="client-item">
                        <input type="number" default="5"></input>
                    </div>
                    <p>Total Clients for Today</p>
                </div>
                <div className="stats-item">
                    <div className="earnings-item">
                        <input type="text" default="Rs.23,244"></input>
                    </div>
                    <p>Total Earnings for this week</p>
                </div>
            </div>
            <a href="/admin-client-records">
                <div className="admin-item">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <h5>Client Records</h5>
                    </div>
                </div>
            </a>
            <a href="/admin-employee-schedules">
                <div className="admin-item">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <h5>Employee Schedule</h5>
                    </div>
                </div>
            </a>
            <div onClick={openSchedule}>
                <div className="admin-item">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <h5>Schedule</h5>
                    </div>
                </div>
            </div>
            <a href="/admin-client-reviews">
                <div className="admin-item">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <h5>Client Reviews</h5>
                    </div>
                </div>
            </a>
            <div className="schedule-btn-row">
                {/* <h5>Today's Schedule</h5>
                <Button type="primary" size="large" onClick={openSchedule}>
                    Check Schedule
                </Button> */}
            </div>
        </div>
    );
};

export default AdminHome;
