import { React, useState, useEffect } from "react";

import { Calendar, Button, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getLoggedInUser } from "../../utils";

import "./styles.sass";

const HomePage = () => {
    const navigate = useNavigate();
    const user = getLoggedInUser();
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [open, setOpen] = useState(false);

    const redirectToBookingPage = () => {
        navigate("/booking", { state: { date } });
    };

    useEffect(() => {
        console.log("user type", user.user_type)
        if(user.user_type === "ADMIN") {
            navigate("/admin-home" );;
        };
    }, [])

    return (
        <div div className="home-section">
            <div className="page-header-intro">
                <h1>Hello, {user.username}</h1>
                <h6>Welcome to Salon Shahina's</h6>
            </div>
            <div className="page-banner">
                <div className="image"></div>
            </div>
            <div className="user-selection-wrapper">
                <p>What would you like to do?</p>
                <div className="user-selection-options" onClick={() => {setOpen(true)}}>
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
                        validRange={[
                            dayjs().startOf("day"),
                            dayjs().add(6, "month"),
                        ]}
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
            <div>
                <Drawer 
                    title="Available Services" 
                    placement="right" 
                    onClose={() => {setOpen(false)}} open={open}
                >
                    <div className="service-drawer">
                        <h5>Hair</h5>
                        <ul>
                            <li>Haircut</li>
                            <li>Haircut with wash and blowdry</li>
                            <li>Kids Haircut</li>
                            <li>Blowdry</li>
                            <li>Hair straightening</li>
                            <li>Hair curling</li>
                            <li>Perming</li>
                            <li>Relaxing</li>
                            <li>Bonding</li>
                            <li>Keratin treatment</li>
                            <li>Conditioning treatment</li>
                            <li>Hairstyle</li>
                            <li>Oil massage</li>
                            <li>Highlights</li>
                            <li>Root touch up</li>
                            <li>Full head colour</li>
                        </ul>
                        <h5>Body</h5>
                        <ul>
                            <li>Underarms wax</li>
                            <li>Half legs wax</li>
                            <li>Full legs wax</li>
                            <li>Full arms wax</li>
                            <li>Jovees Facial</li>
                            <li>Sothys Facial</li>
                            <li>Clean up</li>
                            <li>Eyebrows threading</li>
                            <li>Face threading</li>
                            <li>Manicure</li>
                            <li>Pedicure</li>
                        </ul>
                        <h5>Event</h5>
                        <ul>
                            <li>Hairstyle</li>
                            <li>Hair and makeup</li>
                            <li>Hijab draping</li>
                            <li>Saree draping</li>
                            <li>Bridal dressing</li>
                            <li>Engagement dressing</li>
                        </ul>
                    </div>
                </Drawer>
            </div>
        </div>
    );
};

export default HomePage;
