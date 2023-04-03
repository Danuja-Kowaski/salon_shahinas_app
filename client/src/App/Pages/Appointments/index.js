import { React } from "react";

import { Tabs } from "antd";

import "./styles.sass";

const Appointments = () => {
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

    return (
        <div className="appointments-section">
            <h4>Appointments</h4>
            <Tabs defaultActiveKey="1" centered size={"large"} items={tabs} />
        </div>
    );
};

export default Appointments;
