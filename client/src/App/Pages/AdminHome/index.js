import { React } from "react";

import { Button } from "antd";

import "./styles.sass";

const AdminHome = () => {
    return (
        <div className="admin-home-section">
            <h2>Hello, System Admin</h2>
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
            <a href="/admin-schedule">
                <div className="admin-item">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <h5>Schedule</h5>
                    </div>
                </div>
            </a>
            <a href="/">
                <div className="admin-item">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <h5>Client Reviews</h5>
                    </div>
                </div>
            </a>
            <div className="schedule-btn-row">
                <h5>Today's Schedule</h5>
                <Button type="primary" size="large">
                    Check Schedule
                </Button>
            </div>
        </div>
    );
};

export default AdminHome;
