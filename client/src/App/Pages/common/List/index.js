import { React } from "react";

import "./styles.sass";

const List = ({ items, heading }) => {
    console.log(items);
    const renderItems = () => {
        return items.map((item) => {
            return (
                <a href={item.link}>
                    <div className="list-item">
                        <div className="img-item"></div>
                        <h5>{item.title}</h5>
                    </div>
                </a>
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
