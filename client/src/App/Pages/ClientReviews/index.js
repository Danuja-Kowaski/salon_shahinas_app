import { React, useEffect } from "react";
import axios from "axios";

import "./styles.sass";

const ClientReviews = () => {
    // Get reviews
    useEffect(() => {
        const getReviews = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5500/api/reviews",
                    {}
                );
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getReviews();
    }, []);

    return (
        <div className="review-section">
            <h2>Client Reviews</h2>
            <div className="review-item">
                <div className="img-item"></div>
                <div className="review-info">
                    <h5>Jane Doe</h5>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
            <div className="review-item">
                <div className="img-item"></div>
                <div className="review-info">
                    <h5>Jane Doe</h5>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
            <div className="review-item">
                <div className="img-item"></div>
                <div className="review-info">
                    <h5>Jane Doe</h5>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
            <div className="footer"></div>
        </div>
    );
};

export default ClientReviews;
