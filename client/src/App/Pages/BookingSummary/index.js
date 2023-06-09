import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Modal, Drawer, Space, Calendar, TimePicker } from "antd";
import { ExclamationCircleFilled, UserOutlined, ScheduleOutlined, UnorderedListOutlined, CheckOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import { getLoggedInUser } from "../../utils";

import "./styles.sass";
import TextArea from "antd/es/input/TextArea";

const BookingSummary = () => {
    const navigate = useNavigate();
    const user = getLoggedInUser();
    const { state } = useLocation();
    const { info, showBooking, isCancelled } = state;
    const { confirm } = Modal;
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState(null);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [review, setReview] = useState("");
    const [isReviewed, setIsReviewed] = useState(false);

    let total = 0;

    const completed = showBooking
        ? dayjs(info.bookingDate).isBefore(dayjs())
            ? true
            : false
        : null;

    console.log("info", info);

    useEffect(() => {
        //get all reviews and check if review is present for this booking
        findReview()
    }, []);

    const findReview = async () => {
        try {    
            const res = await axios.get(
                `http://localhost:5500/api/reviews`,
                {}
            );
            console.log("all reviews", res.data);
            const currentReview = res.data.find((review) => review?.app_id === info._id)
            console.log("found reviews", currentReview)
            if(currentReview){
                setIsReviewed(true)
            };
        } catch (error) {
            console.log("error", error);
        };
    };

    const showConfirm = () => {
        confirm({
            title: "Are you sure you want to cancel this booking?",
            icon: <ExclamationCircleFilled />,
            content: (
                <div>
                    <i>
                        <b>
                            A cancellation fee of 20% of the total booking
                            amount will be charged from your account
                        </b>
                    </i>
                </div>
            ),
            onOk() {
                cancelBooking();
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

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
            const tempString = item.label.replace(/ *\([^)]*\) */g, "") + "";
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

    const processReview = async () => {
        // Submit review
        console.log("review", review);
        try {

            const res = await axios.post(
                `http://localhost:5500/api/review/${info._id}`,
                {
                    comment: review,
                    user_id: user._id
                }
            );
            console.log("review sent", res);
            setIsReviewed(true);
        } catch (error) {
            console.log("error", error);
        }
    };

    const disabledHours = () => {
        if(!dayjs().isSame(date, 'day')) return [];
        let hours = [];
        const currentHour = dayjs().hour();
    
        for (let i = currentHour + 1; i >= 0; i--) {
          hours.push(i);
        }
        return hours;
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const reschedule = async (values) => {
        console.log("values", values)
        setOpenDrawer(false);
        let newDate= dayjs(date);
        let time = values.time.format("H");
        info.bookingDate = newDate.add(time, "hour").format();
        console.log("newbdate", info.bookingDate);
        try {
            const res = await axios.put(
                `http://localhost:5500/api/appointment/update/${info._id}`, 
                info
            );
            console.log("appointment updated", res);
        } catch (error) {
            console.log("error", error);
        }
    };

    const processPayment = async () => {
        //Update payment status
        console.log("payment info", info);
        info.isPaid = true
        try {
            const res = await axios.put(
                `http://localhost:5500/api/appointment/update/${info._id}`, 
                info
            );
            console.log("review sent", res);
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div div className="booking-summary-section background-theme">
            {!showBooking ? (
                <div className="booking-confirmed-wrapper">
                    <h2>Booking Confirmed</h2>
                    <div className="booking-confirmed-card">
                        <div className="img-item"><CheckOutlined /></div>
                        <div>
                            <p className="info-title">Congratulations!</p>
                            <p>Your Booking has been confirmed</p>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="booking-details">
                <h4>Booking Details</h4>
                <div>
                    <div className="booking-detail-item">
                        <div className="left-items"><UserOutlined /></div>
                        <div className="right-items">
                            <h6>Name</h6>
                            <p>{user.username}</p>
                        </div>
                    </div>
                    <div className="booking-detail-item">
                        <div className="left-items"><ScheduleOutlined /></div>
                        <div className="right-items">
                            <h6>Date</h6>
                            <p>
                                {dayjs(info.bookingDate).format("DD/MM/YYYY")}
                            </p>
                        </div>
                    </div>
                    <div className="booking-detail-item">
                        <div className="left-items"><UnorderedListOutlined /></div>
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
            {!isCancelled ?
                <div className="payment-status-row">
                    <div>
                        {"Payment Status: "}
                        {completed || info?.isPaid ? "Paid through app" : "Yet to be Paid"}
                    </div>
                </div> 
            : null}
            {showBooking && completed  && !isCancelled && !isReviewed ? (
                <div className="review-row">
                    <Form
                        name="basic"
                        onFinish={(values) => {
                            setReviewModalOpen(true)
                            setReview(values.review)
                        }}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Write a Review"
                            name="review"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter a review first",
                                },
                            ]}
                        >
                            <TextArea
                                showCount
                                maxLength={300}
                                autoSize={{ minRows: 4, maxRows: 5 }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" size="large" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : null}
            {!completed && !isCancelled? (
                <div className="cancel-btn-row">
                    <Button size="large" type="primary" onClick={showConfirm}>
                        Cancel
                    </Button>
                    <Button 
                        size="large" 
                        type="primary" 
                        onClick={() => {
                            setOpenDrawer(true)
                        }}
                    >
                        Reschedule
                    </Button>
                    {!info.isPaid ?
                        <Button 
                            size="large" 
                            type="primary" 
                            onClick={ () => {
                                setIsModalOpen(true)
                            }}
                        >
                            Pay Now
                        </Button>
                    : null}
                </div>
            ) : null}
            <Modal 
                title="Confirm Payment" 
                open={isModalOpen} 
                onOk={() => {
                    processPayment()
                    setIsModalOpen(false)
                } }
                onCancel={()=>{setIsModalOpen(false)}}
            >
                <p>The booking amount will be deducted from your existing card.</p>
                <p>Are you sure you want to continue?</p>
            </Modal>
            <Modal 
                title="Confirm Review" 
                open={reviewModalOpen} 
                onOk={() => {
                    processReview()
                    setReviewModalOpen(false)
                } }
                onCancel={()=>{setReviewModalOpen(false)}}
            >
                <p>Are you sure you want to submit this review?</p>
            </Modal>
            <Drawer
                  title="Reschedule Appointment"
                  placement="right"
                  onClose={() => {setOpenDrawer(false)}}
                  open={openDrawer}
                >
                <div>
                    <Form
                            name="basic"
                            onFinish={reschedule}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                        <div className="date-selection">
                            {/* <h6>Select Time</h6> */}
                            <Form.Item
                                label="Select New Time"
                                name="time"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the new appointment time",
                                    },
                                ]}
                            >
                                <TimePicker
                                    use12Hours
                                    format={'HH'}
                                    showNow={false}
                                    disabledHours={disabledHours}
                                />
                            </Form.Item>
                        </div>
                        <div className="date-selection">
                            {/* <h6>Select Time</h6> */}
                            <Form.Item
                                label="Select New Date"
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the new appointment Date",
                                    },
                                ]}
                            >
                                <Calendar
                                    fullscreen={false}
                                    onChange={(value) => {
                                        setDate(value.format("YYYY-MM-DD"));
                                    }}
                                    validRange={[
                                        dayjs().startOf("day"),
                                        dayjs().add(6, "month"),
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div className="reschedule-btn-row">
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                            <Button 
                                onClick={() => setOpenDrawer(false)}
                                className="cancel-btn"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
            </Drawer>
        </div>
    );
};

export default BookingSummary;
