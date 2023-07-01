import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { BgColorsOutlined, CheckOutlined, ColumnHeightOutlined, ColumnWidthOutlined } from "@ant-design/icons";

import "./styles.sass";
import { Skeleton } from "antd";

const ClientDetails = () => {
    const { state } = useLocation();
    const hairColor = "#3D2314";
    const [client, setClient] = useState(state?.client);
    const [appointments, setAppointments] = useState();
    const [sortedAppointments, setSortedAppointments] = useState([]);
    console.log("client", client);

    useEffect(() => {
        getClient();
    }, []);

    useEffect(() => {
        let temp = appointments?.filter((apt) => {
            return apt.user_id === client._id;
        });

        temp?.sort((a, b) => {
            return dayjs(b.bookingDate).diff(dayjs(a.bookingDate));
        });
        setSortedAppointments(temp)
    }, [appointments]);

    useEffect(() => {
        if(client) {
            getAppointments();
        }
    }, [client]);

    const getClient = async () => {
        if(client) return
        try {
            const res = await axios.get(
                `http://localhost:5500/api/users`,
                {}
            );
            console.log("client data", res.data);
            const client = res.data.find((user) => state.userId === user._id);
            setClient(client);
        } catch (error) {
            console.log(error);
        }
    };

    const getAppointments = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5500/api/client/${client._id}`,
                {}
            );
            console.log("user appointments", res.data.appointments);
            setAppointments(res.data.appointments);
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
        return sortedAppointments.map((apt) => {
            return (
                <div className="client-confirmed-card">
                    <div className="img-item"><CheckOutlined /></div>
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

    if(client) {
        return (
            <div div className="client-details-section background-theme">
                <div className="client-details">
                    <h4>{client.username}</h4>
                    <h5>Basic Information</h5>
                    {sortedAppointments ?
                    <div>
                        <div className="client-detail-item">
                            <div className="left-items"><BgColorsOutlined /></div>
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
                            <div className="left-items"><ColumnHeightOutlined /></div>
                            <div className="right-items">
                                <h6>Hair Length</h6>
                                {console.log("sortedAppointments", sortedAppointments)}
                                <p>
                                    {sortedAppointments[0] && sortedAppointments[0]?.hair_length 
                                        ? sortedAppointments[0]?.hair_length 
                                        : "Unknown"}
                                </p>
                            </div>
                        </div>
                        <div className="client-detail-item">
                            <div className="left-items"><ColumnWidthOutlined /></div>
                            <div className="right-items">
                                <h6>Hair Thickness</h6>
                                
                                <p>
                                    {sortedAppointments[0] && sortedAppointments[0]?.hair_thickness
                                        ? sortedAppointments[0]?.hair_thickness
                                        : "Unknown"}
                                </p>
                            </div>
                        </div>
                        
                    </div>
                    : null}
                </div>
                <div className="booking-info">
                    <h5>Client History</h5>
                    {sortedAppointments ? renderAppointments() : null}
                </div>
                <div className="footer"></div>
            </div>
        );
    } 
    return (
        <div div className="client-details-section background-theme">
            <Skeleton />
        </div>
    )
};

export default ClientDetails;
