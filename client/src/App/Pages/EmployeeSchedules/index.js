import { React, useEffect, useState } from "react";
import axios from "axios";

import List from "../common/List";

const EmployeeSchedules = () => {
    const [employees, setEmployees] = useState([]);
    const items = [];

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        try {
            const res = await axios.get(`http://localhost:5500/api/emps`, {});
            setEmployees(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getItems = () => {
        employees.forEach((employee) => {
            items.push({
                link: "",
                title: employee.empName,
                data: employee,
            });
        });
        return items;
    };

    return (
        <>
            {employees && employees.length > 0 ? (
                <div className="employee-schedules-section">
                    <List
                        items={getItems()}
                        heading="Employee Schedules"
                        isEmployees={true}
                    />
                </div>
            ) : null}
        </>
    );
};

export default EmployeeSchedules;
