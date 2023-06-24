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

    useEffect(() => {
        console.log("appointments", appointments);
    }, [appointments]);

    // Get Appointments
    useEffect(() => {
        getAppointments();
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
            setAppointments(res.data.appointments);
        } catch (error) {
            console.log(error);
        }
    };

    const openAppointmentInfo = (_, val) => {
        const info = appointments[val];
        navigate("/booking-summary", { state: { info, showBooking: true } });
    };

    const renderAppointment = (item, i) => {
        return (
            <div>
                <div
                    className="appointment-item"
                    onClick={(event) => openAppointmentInfo(event, i)}
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
                return renderAppointment(item, i);
            }
            return "";
        });
    };

    const renderCompleted = () => {
        return appointments.map((item, i) => {
            if (dayjs(item.bookingDate).isBefore(dayjs())) {
                return renderAppointment(item, i);
            }
            return "";
        });
    };

    // const renderCanceled = () => {
    //     return <h5>No Cancelled Bookings</h5>;
    // };

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
        // {
        //     label: "Cancelled",
        //     key: 3,
        //     children: renderCanceled(),
        // },
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
