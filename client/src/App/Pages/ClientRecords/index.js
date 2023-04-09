import { React } from "react";

import List from "../common/List";

const ClientRecords = () => {
    const items = [
        {
            link: "#",
            title: "Jane Doe",
        },
        {
            link: "#",
            title: "Jane Doe",
        },
        {
            link: "#",
            title: "Jane Doe",
        },
        {
            link: "#",
            title: "Jane Doe",
        },
        {
            link: "#",
            title: "Jane Doe",
        },
        {
            link: "#",
            title: "Jane Doe",
        },
    ];

    return (
        <div className="client-record-section">
            <List items={items} heading="My Client Records" />
        </div>
    );
};

export default ClientRecords;
