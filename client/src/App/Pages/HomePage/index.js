import { React, useState } from "react";

import { Calendar, Button } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import "./styles.sass";

const HomePage = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

    const redirectToBookingPage = () => {
        navigate("/booking", { state: { date } });
    };

    return (
        <div div className="home-section">
            <div className="page-header-intro">
                <h1>Hello, Jane</h1>
                <h6>Welcome to Salon Shahina's</h6>
            </div>
            <div className="page-banner">
                <div className="image"></div>
            </div>
            <div className="user-selection-wrapper">
                <p>What would you like to do?</p>
                <div className="user-selection-options">
                    <div className="selection-item">
                        <div></div>
                        <p>Hair</p>
                    </div>
                    <div className="selection-item">
                        <div></div>
                        <p>Nails</p>
                    </div>
                    <div className="selection-item">
                        <div></div>
                        <p>Dressing</p>
                    </div>
                    <div className="selection-item">
                        <div></div>
                        <p>Makeup</p>
                    </div>
                </div>
            </div>
            <div className="appointment-redirect">
                <div className="appointment-header">
                    <h1>Appointment</h1>
                    <p>Choose Date & Time</p>
                </div>
                <div className="appointment-calender">
                    <Calendar
                        fullscreen={false}
                        onChange={(value) => {
                            setDate(value.format("YYYY-MM-DD"));
                        }}
                        defaultValue={dayjs()}
                    />
                </div>
                <div className="appointment-button-row">
                    <Button
                        size={"large"}
                        type="primary"
                        onClick={redirectToBookingPage}
                    >
                        Place Booking
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
