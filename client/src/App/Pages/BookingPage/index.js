import React from "react";

import { Calendar, Select, Space, Button, TimePicker } from "antd";

import "./styles.sass";

const BookingPage = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    const format = "HH:mm";

    const wrapperStyle = {
        width: "70vw",
    };

    const options = [
        {
            label: "Facial",
            value: "facial",
        },
        {
            label: "Wax",
            value: "wax",
        },
        {
            label: "Eyebrows",
            value: "eyebrows",
        },
        {
            label: "Hair Colour",
            value: "hair_colour",
        },
        {
            label: "Haircut",
            value: "haircut",
        },
        {
            label: "Dressing",
            value: "dressing",
        },
    ];

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div div className="booking-section">
            <div className="date-selection-wrapper">
                <div className="date-info-header">
                    <h1>Set Date</h1>
                    <p>Choose Date & Time</p>
                </div>
                <div className="date-month-select"></div>
            </div>
            <div className="time-selection" style={wrapperStyle}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                <TimePicker format={format} />
            </div>
            <div className="stylist-selection">
                <h6>Availale Stylists</h6>
                <div className="stylists-wrapper">
                    <div className="stylist-item">
                        <div></div>
                        <p>Jane Doe</p>
                    </div>
                    <div className="stylist-item">
                        <div></div>
                        <p>Jane Doe</p>
                    </div>
                    <div className="stylist-item">
                        <div></div>
                        <p>Jane Doe</p>
                    </div>
                    <div className="stylist-item">
                        <div></div>
                        <p>Jane Doe</p>
                    </div>
                </div>
            </div>
            <div className="services-selection">
                <h6>Services</h6>
                <Space
                    style={{
                        width: "100%",
                    }}
                    direction="vertical"
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        placeholder="Please select services you require"
                        defaultValue={["Waxing", "Eyebrows"]}
                        onChange={handleChange}
                        options={options}
                    />
                </Space>
            </div>
            <div className="booking-btn-row">
                <Button size={"large"} type="primary">
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default BookingPage;
