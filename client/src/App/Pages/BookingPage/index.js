import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Select, Button, TimePicker, Form } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { serviceOptions } from "../constants";

import "./styles.sass";

const BookingPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    const { date } = state;

    const format = "HH";

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    useEffect(() => {
        getEmployees();
    }, []);

    useEffect(() => {
        console.log("emp", employees);
    }, [employees]);

    const getEmployees = async () => {
        try {
            const res = await axios.get(`http://localhost:5500/api/emps`, {});
            setEmployees(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getItems = () => {
        let items = [];
        employees.forEach((emp) => {
            let item = {
                label: emp.empName,
                value: emp._id,
            };
            items.push(item);
        });

        return items;
    };
    const onFinish = (form) => {
        console.log("form finished", form);
        // constdateObj = { date: date };
        let data = form;
        // const time = data.time;
        let bookingDate = dayjs(date);
        let time = data.time.format("H");
        data.date = bookingDate.add(time, "hour").format();
        navigate("/booking-confirm", { state: { data } });
    };

    return (
        <div div className="booking-section">
            <Form
                name="basic"
                // style={{ maxWidth: 600 }}
                onFinish={onFinish}
            >
                <div className="date-selection-wrapper">
                    <div className="date-info-header">
                        <h1>Set Date</h1>
                        <p>Choose Date & Time</p>
                    </div>
                    <div className="date-month-select"></div>
                </div>
                <div className="date-selection">
                    <h6>Selected Date</h6>
                    <p>{dayjs(date).format("ddd, MMM D, YYYY")}</p>
                </div>
                <div className="date-selection">
                    {/* <h6>Select Time</h6> */}
                    <Form.Item
                        label="Select Time"
                        name="time"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the appointment time",
                            },
                        ]}
                    >
                        <TimePicker
                            use12Hours
                            format={format}
                            showNow={false}
                        />
                    </Form.Item>
                </div>
                <div className="stylist-selection">
                    {/* <h6>Availale Stylists</h6> */}
                    <Form.Item
                        label="Select Availale Stylists"
                        name="stylists"
                        rules={[
                            {
                                required: true,
                                message: "Please enter preferred stylist",
                            },
                        ]}
                    >
                        <Select
                            // size={size}
                            // defaultValue="a1"
                            onChange={handleChange}
                            style={{ width: "100%" }}
                            options={getItems()}
                        />
                    </Form.Item>
                </div>
                <div className="services-selection">
                    {/* <h6>Services</h6> */}
                    <Form.Item
                        label="Select Services"
                        name="services"
                        rules={[
                            {
                                required: true,
                                message: "Please enter required services",
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: "100%",
                            }}
                            placeholder="Please select services you require"
                            onChange={handleChange}
                            options={serviceOptions}
                        />
                    </Form.Item>
                </div>
                <div className="booking-btn-row">
                    <Form.Item>
                        <Button size={"large"} type="primary" htmlType="submit">
                            Continue
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default BookingPage;
