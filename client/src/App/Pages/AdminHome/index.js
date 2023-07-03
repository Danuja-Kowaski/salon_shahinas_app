import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { Divider } from "antd";
import { CommentOutlined, DatabaseOutlined, ScheduleOutlined } from "@ant-design/icons";

import { getLoggedInUser } from "../../utils";
import { getSavedEmployees, getSavedClients } from "../../utils";

import "./styles.sass";

const AdminHome = () => {
    const user = getLoggedInUser();
    const userType = user.user_type;
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const date = dayjs();
    const [scheduleInfo, setScheduleInfo] = useState([]);
    const [empScheduleInfo, setEmpScheduleInfo] = useState([]);
    const employees = getSavedEmployees();
    const clients = getSavedClients();
    const isAdmin = userType === "ADMIN" ? true : false;

    useEffect(() => {
        if (!(userType === "ADMIN" || userType === "EMP")) {
            navigate("/home");
        }
        getAppointments();
        getEmployeeAppointments();
    }, []);

    const getEmployeeAppointments = async () => {
        if (!isAdmin) {
            // try {
            //     const res = await axios.get(
            //         `http://localhost:5500/api/emp/${state.userId}`,
            //         {}
            //     );
            //     console.log("emp appointments", res.data);
            //     setScheduleInfo(res.data.appointments);
            setScheduleInfo([]);
            // } catch (error) {
            //     console.log(error);
            // }
            // return;
        }
        try {
            const res = await axios.get(
                `http://localhost:5500/api/appointments`,
                {}
            );
            console.log("emp appointments", res.data);
            setScheduleInfo(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log("appointments", appointments);
    }, [appointments]);

    const findName = (id, arr) => {
        return arr.find((item) => item._id === id);
    };

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

    const compare = (a, b) => {
        if (dayjs(a.bookingDate).isBefore(dayjs(b.bookingDate))) {
            return -1;
        }
        if (dayjs(a.bookingDate).isAfter(dayjs(b.bookingDate))) {
            return 1;
        }
        return 0;
    };

    const navigateToClient = (id) => {
        navigate("/admin-client-details", {
            state: { userId: id },
        });
    }

    const renderInfo = () => {
        let currentBookings = scheduleInfo.filter((item) => {
            return dayjs(item.bookingDate).isSame(date, "day");
        });
        
        currentBookings.sort(compare);

        let newBookings = [];

        if(!isAdmin){
            console.log("not admin")
            newBookings = currentBookings.filter((item) => {
                console.log("item id",item.emp_id )
                console.log("user.employee",user.employee )
                console.log("truth",item.emp_id === user.employee )
                return item.emp_id === user.employee
            });
            console.log("newBookings", newBookings)
        }
        else{
            newBookings = currentBookings;
        }

        if(!newBookings || newBookings.length === 0){
            return <p>No Bookings Scheduled for Today!</p>
        };

        console.log("current bookings", newBookings);

        return newBookings.map((item) => {
            const time = dayjs(item.bookingDate).format("h:mm A");
            const endTime = dayjs(item.bookingDate)
                .add(1, "hour")
                .format("h:mm A");
            return (
                <>
                    <div className="info-item">
                        <h6>
                            {time} - {endTime}
                        </h6>
                        <div 
                            className="info-details" 
                            onClick={() => navigateToClient(item.user_id)}
                        >
                            <p>{findName(item.emp_id, employees)?.empName}</p>
                            <p>
                                Client:{" "}
                                {findName(item.user_id, clients)?.username}
                            </p>
                        </div>
                    </div>
                </>
            );
        });
    };

    return (
        <div className="admin-home-section background-theme">
            <h2>Hello, {user.username}</h2>
            <div className="admin-stats">
                <div className="stats-item">
                    <div className="client-item">
                        <div>{appointments.length > 0 ? getTotalAppointmentsToday().length : 0}</div>
                    </div>
                    <p>Total Clients for Today</p>
                </div>
                <div className="stats-item">
                    <div className="earnings-item">
                        <div>Rs. {appointments.length > 0 ? getTotalEarnings() : 0}</div>
                    </div>
                    <p>Total Earnings for this week</p>
                </div>
            </div>
            <a href="/admin-client-records">
                <div className="admin-item">
                    <div className="img-item"><DatabaseOutlined width={50}/></div>
                    <div className="info-item">
                        <h5>Client Records</h5>
                    </div>
                </div>
            </a>
            <a href="/admin-employee-schedules">
                <div className="admin-item">
                    <div className="img-item"><ScheduleOutlined /></div>
                    <div className="info-item">
                        <h5>Employee Schedule</h5>
                    </div>
                </div>
            </a>
            {userType === "ADMIN" ?
            <div onClick={openSchedule}>
                <div className="admin-item">
                    <div className="img-item"><ScheduleOutlined /></div>
                    <div className="info-item">
                        <h5>Schedule</h5>
                    </div>
                </div>
            </div>
            : null}
            {userType === "ADMIN" ?
            <a href="/admin-client-reviews">
                <div className="admin-item">
                    <div className="img-item"><CommentOutlined /></div>
                    <div className="info-item">
                        <h5>Client Reviews</h5>
                    </div>
                </div>
            </a> : null}
            <div className="schedule-row">
                <h2>Schedule</h2>
                <Divider />
                {/* <h5>Today's Schedule</h5>
                <Button type="primary" size="large" onClick={openSchedule}>
                    Check Schedule
                </Button> */}
                <div className="info-wrapper">{renderInfo()}</div>
            </div>
        </div>
    );
};

export default AdminHome;
