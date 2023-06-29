import { React, useEffect, useState } from "react";
import axios from "axios";
import { Tabs } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { getLoggedInUser } from "../../utils";

import "./styles.sass";

const Appointments = () => {
    const navigate = useNavigate();
    const user = getLoggedInUser();
    const [appointments, setAppointments] = useState([]);
    const [cancelledAppointments, setCancelledAppointments] = useState([]);

    useEffect(() => {
        console.log("appointments", appointments);
    }, [appointments]);

    // Get Appointments
    useEffect(() => {
        getAppointments();
        getCancelledAppointments()
    }, []);

    const renderServices = (services) => {
        let string = "";
        services.forEach((item) => {
            string += item.label.replace(/ *\([^)]*\) */g, "") + ", ";
        });
        return string;
    };

    const getAppointments = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5500/api/client/${user._id}`,
                {}
            );
            console.log("user appointments", res.data);
            setAppointments(res.data.appointments.sort((a, b) => {
                return dayjs(a.bookingDate).diff(dayjs(b.bookingDate));
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const getCancelledAppointments = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5500/api/appointments/cancelled`,
                {}
            );
            console.log("cancelled user appointments", res.data);
            setCancelledAppointments(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const openAppointmentInfo = (_, val, isCancelled) => {
        const info = appointments[val];
        navigate("/booking-summary", { state: { info, showBooking: true, isCancelled } });
    };

    const renderAppointment = (item, i, isCancelled) => {
        return (
            <div>
                <div
                    className="appointment-item"
                    onClick={(event) => openAppointmentInfo(event, i, isCancelled)}
                    key={i}
                >
                    <div className="img-item"><CheckOutlined /></div>
                    <div className="info-item">
                        <p className="title">Booking Details</p>
                        <p>
                            Booking ID : <b>{item._id}</b>
                        </p>
                        <p>
                            Booking date :{" "}
                            <b>
                                {dayjs(item.bookingDate).format("DD/MM/YYYY")}
                            </b>
                        </p>
                        <p>Booked Session : {renderServices(item.services)}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderBooked = () => {
        return appointments.map((item, i) => {
            if (dayjs(item.bookingDate).isAfter(dayjs())) {
                return renderAppointment(item, i, false);
            }
            return "";
        });
    };

    const renderCompleted = () => {
        return appointments.map((item, i) => {
            if (dayjs(item.bookingDate).isBefore(dayjs())) {
                return renderAppointment(item, i, false);
            }
            return "";
        });
    };

    const renderCanceled = () => {
        return cancelledAppointments.map((item, i) => {
            if (dayjs(item.bookingDate).isBefore(dayjs())) {
                return renderAppointment(item, i, true);
            }
            return "";
        });
    };

    const tabs = [
        {
            label: "Booked",
            key: 1,
            children: renderBooked(),
        },
        {
            label: "Completed",
            key: 2,
            children: renderCompleted(),
        },
        {
            label: "Cancelled",
            key: 3,
            children: renderCanceled(),
        },
    ];
    return (
        <div className="appointments-section background-theme">
            <h4>Appointments</h4>
            <Tabs defaultActiveKey="1" centered size={"large"} items={tabs} />
            <div className="footer"></div>
        </div>
    );
};

export default Appointments;
