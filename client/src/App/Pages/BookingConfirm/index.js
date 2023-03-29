import React from "react";

import { Button } from "antd";

import "./styles.sass";

const BookingConfirm = () => {
    return (
        <div div className="booking-confirm-section">
            <div className="date-time-info">
                <div className="date-time-item">
                    <h4>Selected Time</h4>
                    <div>
                        <p>09.00 AM</p>
                    </div>
                </div>
                <div className="date-time-item">
                    <h4>Selected Date</h4>
                    <div>
                        <p>19/02/2023</p>
                    </div>
                </div>
            </div>
            <div className="selected-services-info">
                <h4>Selected Services</h4>
                <div>
                    <p>Hair Cut, Hair Style, Facial</p>
                </div>
            </div>
            <div className="measurements-info">
                <h4>Measurements</h4>
                <div className="measurement-item-wrapper">
                    <div className="measurement-item">
                        <Button size={"large"} type="primary">
                            Thickness : Check
                        </Button>
                    </div>
                    <div className="measurement-item">
                        <Button size={"large"} type="primary">
                            Length: Check
                        </Button>
                    </div>
                </div>
            </div>
            <div className="price-info">
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
            <div className="btn-row">
                <Button size={"large"} type="primary">
                    Confirm Booking
                </Button>
            </div>
        </div>
    );
};

export default BookingConfirm;
