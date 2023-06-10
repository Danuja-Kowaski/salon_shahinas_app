import { React } from "react";
import { Divider } from "antd";

import offer1 from "../../Assets/Media/Images/offer-banner-1.png";

import "./styles.sass";

const Notifications = () => {
    return (
        <div className="notifications-section">
            <h4>Notifications</h4>
            <div className="notification-item">
                <div className="info-wrapper">
                    <div className="img-item"></div>
                    <div className="info-item">
                        <p className="title">Mothers Day Offer</p>
                        {/* <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore ma
                        </p> */}
                    </div>
                </div>
                <Divider />
                <div className="image-wrapper">
                    <img src={offer1} />
                </div>
            </div>
        </div>
    );
};

export default Notifications;
