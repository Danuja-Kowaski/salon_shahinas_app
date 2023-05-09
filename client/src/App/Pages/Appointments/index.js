import { React, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";

import { getLoggedInUser } from "../../utils";

import "./styles.sass";

const Appointments = () => {
    const user = getLoggedInUser();

    console.log("user", user);

    const renderBooked = () => {
        return (
            <div>
                <div className="appointment-item">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <p className="title">Booking Details</p>
                        <p>
                            Booking ID : <b>00001</b>
                        </p>
                        <p>
                            Booking date : <b>01/01/2023</b>
                        </p>
                        <p>
                            Booked Session : <b>Hair Cut, Hair Style</b>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const renderCompleted = () => {
        return (
            <div>
                <div className="appointment-item">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <p className="title">Booking Details</p>
                        <p>
                            Booking ID : <b>00002</b>
                        </p>
                        <p>
                            Booking date : <b>01/02/2023</b>
                        </p>
                        <p>
                            Booked Session : <b>Hair Cut, Hair Style</b>
                        </p>
                    </div>
                </div>
                <div className="appointment-item">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <p className="title">Booking Details</p>
                        <p>
                            Booking ID : <b>00003</b>
                        </p>
                        <p>
                            Booking date : <b>01/03/2023</b>
                        </p>
                        <p>
                            Booked Session : <b>Hair Cut, Hair Style</b>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const renderCanceled = () => {
        return <h5>No Cancelled Bookings</h5>;
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

    // Get reviews
    useEffect(() => {
        const getAppointments = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5500/api/users/${user._id}`,
                    {}
                );
                console.log("user appointments", res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAppointments();
    }, [user]);

    return (
        <div className="appointments-section">
            <h4>Appointments</h4>
            <Tabs defaultActiveKey="1" centered size={"large"} items={tabs} />
        </div>
    );
};

export default Appointments;
