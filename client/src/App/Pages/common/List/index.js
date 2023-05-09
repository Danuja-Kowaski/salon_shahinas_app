import { React } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.sass";

const List = ({ items, heading, isEmployees }) => {
    console.log("items in comp", items);

    const navigate = useNavigate();

    const openSchedule = (_, i) => {
        if (!isEmployees) return;
        navigate("/admin-schedule", { state: { userId: items[i].data._id } });
    };

    const renderItems = () => {
        return items.map((item, i) => {
            return (
                <div
                    className="list-item"
                    onClick={(event) => openSchedule(event, i)}
                    key={i}
                >
                    <div className="img-item"></div>
                    <h5>{item.title}</h5>
                </div>
            );
        });
    };

    return (
        <div className="list-section">
            <h2>{heading}</h2>
            {renderItems()}
            <div className="footer"></div>
        </div>
    );
};

export default List;
