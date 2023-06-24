import { React } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import "./styles.sass";

const List = ({ items, heading, isEmployees, isClient }) => {
    console.log("items in comp", items);

    const navigate = useNavigate();

    const openSchedule = (_, i) => {
        if (isEmployees) {
            navigate("/admin-schedule", {
                state: { userId: items[i].data._id },
            });
            return;
        }
        if (isClient) {
            navigate("/admin-client-details", {
                state: { client: items[i].data },
            });
            return;
        }
        return;
    };

    const renderItems = () => {
        return items.map((item, i) => {
            return (
                <div
                    className="list-item"
                    onClick={(event) => openSchedule(event, i)}
                    key={i}
                >
                    <div className="img-item"><UserOutlined /></div>
                    <h5>{item.title}</h5>
                </div>
            );
        });
    };

    return (
        <div className="list-section background-theme">
            <h2>{heading}</h2>
            {renderItems()}
            <div className="footer"></div>
        </div>
    );
};

export default List;
