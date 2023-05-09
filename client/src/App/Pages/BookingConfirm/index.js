import React from "react";

import { Button } from "antd";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

import { serviceOptions } from "../constants";

import "./styles.sass";

const BookingConfirm = () => {
    const { state } = useLocation();
    const data = state?.data;
    const date = dayjs(data?.date);
    let total = 0;

    console.log("data", data);

    const renderServiceItems = () => {
        data.services.forEach((service) => {
            console.log("service", service, findServiceItem(service));
        });

        return data.services.map((service) => {
            const item = findServiceItem(service);
            total += parseInt(item.price);
            return (
                <div className="item-info">
                    <p>{item.label.replace(/ *\([^)]*\) */g, "")}</p>
                    <p>{item.price}/=</p>
                </div>
            );
        });
    };

    const findServiceItem = (value) => {
        let serviceItem;
        serviceOptions.forEach((type) => {
            value = type.options.find((option) => option.value === value);
            if (value) {
                serviceItem = value;
            }
        });
        return serviceItem;
    };

    const renderSelectedServices = () => {
        let services = "";
        data.services.forEach((service) => {
            services +=
                findServiceItem(service).label.replace(/ *\([^)]*\) */g, "") +
                ", ";
        });
        return services;
    };

    const renderBookingSection = () => {
        if (!data) {
            return <div>Please retry from home page</div>;
        }
        return (
            <div div className="booking-confirm-section">
                <div className="date-time-info">
                    <div className="date-time-item">
                        <h4>Selected Time</h4>
                        <div>
                            <p>{date.format("h:mm A")}</p>
                        </div>
                    </div>
                    <div className="date-time-item">
                        <h4>Selected Date</h4>
                        <div>
                            <p>{date.format("DD/MM/YYYY")}</p>
                        </div>
                    </div>
                </div>
                <div className="selected-services-info">
                    <h4>Selected Services</h4>
                    <div>
                        <p>{renderSelectedServices()}</p>
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
                    {renderServiceItems()}
                    <div className="item-totals">
                        <p>Total</p>
                        <p>{total}/=</p>
                    </div>
                </div>
                <div className="btn-row">
                    <a href="/booking-summary">
                        <Button size={"large"} type="primary">
                            Confirm Booking
                        </Button>
                    </a>
                </div>
            </div>
        );
    };

    return renderBookingSection();
};

export default BookingConfirm;
