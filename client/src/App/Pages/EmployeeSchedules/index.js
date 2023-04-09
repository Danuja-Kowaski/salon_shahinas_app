import { React } from "react";

import List from "../common/List";

const EmployeeSchedules = () => {
    const items = [
        {
            link: "#",
            title: "Employee 1",
        },
        {
            link: "#",
            title: "Employee 2",
        },
        {
            link: "#",
            title: "Employee 3",
        },
        {
            link: "#",
            title: "Employee 4",
        },
        {
            link: "#",
            title: "Employee 5",
        },
        {
            link: "#",
            title: "Employee 6",
        },
    ];

    return (
        <div className="employee-schedules-section">
            <List items={items} heading="Employee Schedules" />
        </div>
    );
};

export default EmployeeSchedules;
