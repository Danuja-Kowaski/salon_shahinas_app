import { React } from "react";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { getLoggedInUser } from "../../utils";
import { serviceOptions } from "../constants";

import "./styles.sass";

const BookingConfirm = () => {
    const navigate = useNavigate();
    const user = getLoggedInUser();
    const { state } = useLocation();
    const data = state?.data;
    const date = dayjs(data?.date);
    let total = 0;
    let services = [];

    console.log("data", data);

    const renderServiceItems = () => {
        return data.services.map((service) => {
            const item = findServiceItem(service);
            total += parseInt(item.price);
            services.push(item);
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
        console.log("serviceOptions", serviceOptions);
        serviceOptions.forEach((type) => {
            const item = type.options.find((option) => {
                console.log("optionval", option.value);
                console.log("val", value);
                return option.value === value;
            });
            if (item) {
                serviceItem = item;
            }
        });
        return serviceItem;
    };

    const renderSelectedServices = () => {
        let services = "";
        console.log("services", data.services);
        data.services.forEach((service) => {
            services +=
                findServiceItem(service).label.replace(/ *\([^)]*\) */g, "") +
                ", ";
        });
        return services;
    };

    const submitBooking = async () => {
        try {
            const info = {
                id: user._id,
                empid: data.stylists,
                bookingDate: data.date,
                services: services,
            };
            const res = await axios.post(
                `http://localhost:5500/api/appointment/${user._id}/${data.stylists}`,
                info
            );
            console.log("user appointments", res.data);
            navigate("/booking-summary", { state: { info } });
        } catch (error) {
            console.log(error);
        }
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
                    <Button
                        size={"large"}
                        type="primary"
                        onClick={submitBooking}
                    >
                        Confirm Booking
                    </Button>
                </div>
            </div>
        );
    };

    return renderBookingSection();
};

export default BookingConfirm;
