import { React, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../utils";
import axios from "axios";
import dayjs from "dayjs";

import "./styles.sass";

const AdminHome = () => {
    const user = getLoggedInUser();
    const userType = user.user_type;
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (!(userType === "ADMIN" || userType === "EMP")) {
            navigate("/home");
        }
        getAppointments();
    }, []);

    useEffect(() => {
        console.log("appointments", appointments);
    }, [appointments]);

    const getAppointments = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5500/api/appointments`,
                {}
            );
            console.log("user appointments", res.data);
            setAppointments(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const openSchedule = () => {
        navigate("/admin-schedule", { state: { isAdmin: true } });
    };

    const getTotalAppointmentsToday = () => {
        return appointments.filter(
            (apt, i) => {
                return dayjs().isSame(apt.bookingDate, 'day');
            }
        );
    };

    const getTotalEarnings = () => {
        let total = 0;
        const aptsWeek = appointments.filter(
            (apt, i) => {
                return dayjs().isSame(apt.bookingDate, 'week');
            }
        );

        aptsWeek.forEach((apt) => {
            let aptTotal = 0;
            apt.services.forEach((item) => {
                aptTotal += parseInt(item.price);
            })
            total += aptTotal
        })
        return total;
    };

    return (
        <div className="admin-home-section">
            <h2>Hello, {user.username}</h2>
            <div className="admin-stats">
                <div className="stats-item">
                    <div className="client-item">
                        <div>{appointments.length > 0 ? getTotalAppointmentsToday().length : null}</div>
                    </div>
                    <p>Total Clients for Today</p>
                </div>
                <div className="stats-item">
                    <div className="earnings-item">
                        <div>Rs. {appointments.length > 0 ? getTotalEarnings() : null}</div>
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
            {userType === "ADMIN" ?
            <div onClick={openSchedule}>
                <div className="admin-item">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <h5>Schedule</h5>
                    </div>
                </div>
            </div>
            : null}
            {userType === "ADMIN" ?
            <a href="/admin-client-reviews">
                <div className="admin-item">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <h5>Client Reviews</h5>
                    </div>
                </div>
            </a> : null}
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
