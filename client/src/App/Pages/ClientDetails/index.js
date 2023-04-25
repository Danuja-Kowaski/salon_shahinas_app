import React from "react";

import "./styles.sass";

const ClientDetails = () => {
    const hairColor = "#3D2314";
    return (
        <div div className="client-details-section">
            <div className="client-details">
                <h4>Jane Doe</h4>
                <h5>Basic Information</h5>
                <div>
                    <div className="client-detail-item">
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Hair Color Code</h6>
                            <div className="color-indicator">
                                <span>{hairColor}</span>
                                <span
                                    className="color-item"
                                    style={{ backgroundColor: hairColor }}
                                ></span>
                            </div>
                        </div>
                    </div>
                    <div className="client-detail-item">
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Hair Length</h6>
                            <p>14 Inches</p>
                        </div>
                    </div>
                    <div className="client-detail-item">
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Hair Thickness</h6>
                            <p>XXXXX</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="booking-info">
                <h5>Client History</h5>
                <div className="client-confirmed-card">
                    <div className="img-item"></div>
                    <div>
                        <p className="info-title">Booking Status - Completed</p>
                        <p>Booking ID : 00001 </p>
                        <p>Booking date : 01/01/2023 </p>
                        <p>Booked Session : Hair Cut, Hair Style</p>
                    </div>
                </div>
                <div className="client-confirmed-card">
                    <div className="img-item"></div>
                    <div>
                        <p className="info-title">Booking Status - Completed</p>
                        <p>Booking ID : 00001 </p>
                        <p>Booking date : 01/01/2023 </p>
                        <p>Booked Session : Hair Cut, Hair Style</p>
                    </div>
                </div>
            </div>
            <div className="footer"></div>
        </div>
    );
};

export default ClientDetails;
