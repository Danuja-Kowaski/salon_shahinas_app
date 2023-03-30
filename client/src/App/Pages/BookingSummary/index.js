import React from "react";

import { Button } from "antd";

import "./styles.sass";

const BookingSummary = () => {
    return (
        <div div className="booking-summary-section">
            <div className="booking-confirmed-wrapper">
                <h2>Booking Confirmed</h2>
                <div className="booking-confirmed-card">
                    <div className="img-item"></div>
                    <div>
                        <p className="info-title">Congratulations!</p>
                        <p>Your Booking has been confirmed</p>
                        <p>Booking Name: Jane Doe</p>
                        <p>Booking ID: 0001</p>
                    </div>
                </div>
            </div>
            <div className="booking-details">
                <h4>Booking Details</h4>
                <div>
                    <div className="booking-detail-item">
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Name</h6>
                            <p>Jane Doe</p>
                        </div>
                    </div>
                    <div className="booking-detail-item">
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Date</h6>
                            <p>15/02/2023</p>
                        </div>
                    </div>
                    <div className="booking-detail-item">
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Services</h6>
                            <p>Haircut, Hair, Style, Facial</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="price-info">
                <h4>Payment Summary</h4>
                <div className="item-info">
                    <div>
                        <p>Haircut</p>
                        <p>Hair Style</p>
                        <p>Facial</p>
                        <p>Tax & Service Charge</p>
                    </div>
                    <div>
                        <p>9,000/=</p>
                        <p>6,000/=</p>
                        <p>15,000/=</p>
                        <p>5,000/=</p>
                    </div>
                </div>
                <div className="item-totals">
                    <p>Total</p>
                    <p>35,000/=</p>
                </div>
            </div>
            <div className="payment-status-row">
                <div>Payment Status : Yet to be Paid</div>
            </div>
        </div>
    );
};

export default BookingSummary;
