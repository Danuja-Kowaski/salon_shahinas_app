import { React, useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "antd";

import "./styles.sass";

const ClientReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    // Get reviews
    useEffect(() => {
        const getReviews = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5500/api/reviews",
                    {}
                );
                setReviews(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getUsers = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5500/api/users",
                    {}
                );
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getReviews();
        getUsers()
    }, []);

    const findUsername = (id) => {
        return users.find((user) => id === user._id)
    };

    const renderReviews = () => {
        return reviews.map((review, i) => {
            return (
                <div className="review-item" key={i}>
                    <div className="img-item"></div>
                    <div className="review-info">
                        <h5>{findUsername(review.user_id)?.username}</h5>
                        <p>
                            {review?.comment}
                        </p>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="review-section">
            <h2>Client Reviews</h2>
            {reviews.length > 0 ?
                renderReviews()
            : <Skeleton />}
            <div className="footer"></div>
        </div>
    );
};

export default ClientReviews;
