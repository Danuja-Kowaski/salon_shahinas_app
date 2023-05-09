import React from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { getLoggedInUser } from "../../utils";

import "./styles.sass";

const BookingSummary = () => {
    const navigate = useNavigate();
    const user = getLoggedInUser();
    const { state } = useLocation();
    const { info, showBooking } = state;
    let total = 0;

    const completed = showBooking
        ? dayjs(info.bookingDate).isBefore(dayjs())
            ? true
            : false
        : null;

    console.log("info", info);

    const renderServices = () => {
        let string = "";
        info.services.forEach((item) => {
            string += item.label.replace(/ *\([^)]*\) */g, "") + ", ";
        });
        return string;
    };

    const renderServiceItems = () => {
        return info.services.map((item) => {
            total += parseInt(item.price);
            const tempString = item.label.replace(/ *\([^)]*\) */g, "") + ", ";
            return (
                <div className="item-info">
                    <p>{tempString}</p>
                    <p>{item.price}/=</p>
                </div>
            );
        });
    };

    const cancelBooking = async () => {
        await axios.delete(
            `http://localhost:5500/api/appointments/${info._id}`,
            {}
        );
        navigate("/appointments");
    };

    return (
        <div div className="booking-summary-section">
            {!showBooking ? (
                <div className="booking-confirmed-wrapper">
                    <h2>Booking Confirmed</h2>
                    <div className="booking-confirmed-card">
                        <div className="img-item"></div>
                        <div>
                            <p className="info-title">Congratulations!</p>
                            <p>Your Booking has been confirmed</p>
                            {/* <p>Booking Name: {user.username}</p> */}
                            {/* <p>Booking ID: 0001</p> */}
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="booking-details">
                <h4>Booking Details</h4>
                <div>
                    <div className="booking-detail-item">
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Name</h6>
                            <p>{user.username}</p>
                        </div>
                    </div>
                    <div className="booking-detail-item">
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Date</h6>
                            <p>
                                {dayjs(info.bookingDate).format("DD/MM/YYYY")}
                            </p>
                        </div>
                    </div>
                    <div className="booking-detail-item">
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Services</h6>
                            <p>{renderServices()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="price-info">
                <h4>Payment Summary</h4>
                {renderServiceItems()}
                <div className="item-totals">
                    <p>Total</p>
                    <p>{total}/=</p>
                </div>
            </div>
            <div className="payment-status-row">
                <div>
                    Payment Status{" "}
                    {completed ? ": Paid in cash" : "Yet to be Paid"}
                </div>
            </div>
            {!completed ? (
                <div className="cancel-btn-row">
                    <Button size="large" type="primary" onClick={cancelBooking}>
                        Cancel
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

export default BookingSummary;
