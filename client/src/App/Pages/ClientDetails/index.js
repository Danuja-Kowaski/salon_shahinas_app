import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import "./styles.sass";

const ClientDetails = () => {
    const { state } = useLocation();
    const hairColor = "#3D2314";
    const client = state.client;
    const [appointments, setAppointments] = useState();
    console.log("client", client);

    useEffect(() => {
        getAppointments();
    }, []);

    const getAppointments = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5500/api/appointments`,
                {}
            );
            console.log("user appointments", res.data);
            setAppointments(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getServices = (apt) => {
        let servicesString = "";
        apt.services.forEach((service) => {
            servicesString +=
                service.label.replace(/ *\([^)]*\) */g, "") + ", " + " ";
        });
        return servicesString;
    };

    const getAppointmentStatus = (date) => {
        if (dayjs(date).isAfter(dayjs())) {
            return " Booked";
        }
        return " Completed";
    };

    const renderAppointments = () => {
        let userApts = appointments.filter((apt) => {
            return apt.user_id === client._id;
        });

        userApts.sort((a, b) => {
            return dayjs(b.bookingDate).diff(dayjs(a.bookingDate));
        });

        console.log("userApts", userApts);

        return userApts.map((apt) => {
            return (
                <div className="client-confirmed-card">
                    <div className="img-item"></div>
                    <div>
                        <p className="info-title">
                            Booking Status -{" "}
                            {getAppointmentStatus(apt.bookingDate)}
                        </p>
                        <p>Booking ID : {apt._id}</p>
                        <p>
                            Booking date :{" "}
                            {dayjs(apt.bookingDate).format("DD/MM/YYYY")}
                        </p>
                        <p>Booked Session : {getServices(apt)}</p>
                    </div>
                </div>
            );
        });
    };

    return (
        <div div className="client-details-section">
            <div className="client-details">
                <h4>{client.username}</h4>
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
                            <p>{client.length ? client.length : "Unknown"}</p>
                        </div>
                    </div>
                    <div className="client-detail-item">
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Hair Thickness</h6>
                            <p>
                                {client.thickness
                                    ? client.thickness
                                    : "Unknown"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="booking-info">
                <h5>Client History</h5>
                {appointments ? renderAppointments() : null}
            </div>
            <div className="footer"></div>
        </div>
    );
};

export default ClientDetails;
