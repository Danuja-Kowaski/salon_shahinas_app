import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
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
    const { info, showBooking } = state;
    const { confirm } = Modal;
    let total = 0;

    const completed = showBooking
        ? dayjs(info.bookingDate).isBefore(dayjs())
            ? true
            : false
        : null;

    console.log("info", info);

    useEffect(() => {
        //get all reviews and check if review is present for this booking
    }, [])

    const showConfirm = () => {
        confirm({
          title: 'Are you sure you want to cancel this booking?',
          icon: <ExclamationCircleFilled />,
          content: '',
          onOk() {
            cancelBooking();
          },
          onCancel() {
            console.log('Cancel');
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

    const onFinish = async (value) => {
        // Submit review
        console.log("value", value);
        try{
            // const res = await axios.post(
            //     `http://localhost:5500/api/review/${info._id}`,
            //     {
            //         comment: value.review
            //     }
            // );
            // console.log("review sent", res);
        } catch(error){
            console.log("error", error);
        };
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div div className="booking-summary-section">
            {!showBooking ? (
                <div className="booking-confirmed-wrapper">
                    <h2>Booking Confirmed</h2>
                    <div className="booking-confirmed-card">
                        <div className="img-item"></div>
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
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Name</h6>
                            <p>{user.username}</p>
                        </div>
                    </div>
                    <div className="booking-detail-item">
                        <div className="left-items"></div>
                        <div className="right-items">
                            <h6>Date</h6>
                            <p>
                                {dayjs(info.bookingDate).format("DD/MM/YYYY")}
                            </p>
                        </div>
                    </div>
                    <div className="booking-detail-item">
                        <div className="left-items"></div>
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
            <div className="payment-status-row">
                <div>
                    Payment Status{" "}
                    {completed ? ": Paid in cash" : "Yet to be Paid"}
                </div>
            </div>
            {showBooking && completed?
            <div className="review-row">
                <Form 
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item 
                        label="Write a Review" 
                        name="review"
                        rules={[
                            {
                            required: true,
                            message: "Please enter a review first"
                            },
                        ]}
                    >
                        <TextArea showCount maxLength={300} autoSize={{ minRows: 4, maxRows: 5 }}/>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            : null
            }
            {!completed ? (
                <div className="cancel-btn-row">
                    <Button size="large" type="primary" onClick={showConfirm}>
                        Cancel
                    </Button>
                    <Button size="large" type="primary" onClick={{}}>
                        Reschedule
                    </Button>
                    <Button size="large" type="primary" onClick={{}}>
                        Pay Now
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

export default BookingSummary;
