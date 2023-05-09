import { React, useEffect, useState } from "react";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { getSavedEmployees, getSavedClients } from "../../utils";

import "./styles.sass";

const AdminSchedule = () => {
    const { state } = useLocation();
    const [scheduleInfo, setScheduleInfo] = useState([]);
    const [date, setDate] = useState(dayjs());
    const employees = getSavedEmployees();
    const clients = getSavedClients();

    const isAdmin = state?.isAdmin;

    console.log("isAdmin", isAdmin);

    useEffect(() => {
        getEmployeeAppointments();
    }, []);

    const getEmployeeAppointments = async () => {
        if (!isAdmin) {
            try {
                const res = await axios.get(
                    `http://localhost:5500/api/emp/${state.userId}`,
                    {}
                );
                console.log("emp appointments", res.data);
                setScheduleInfo(res.data.appointments);
            } catch (error) {
                console.log(error);
            }
            return;
        }
        try {
            const res = await axios.get(
                `http://localhost:5500/api/appointments`,
                {}
            );
            console.log("emp appointments", res.data);
            setScheduleInfo(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateDate = (value) => {
        if (!value) {
            return;
        }
        setDate(dayjs(value));
        console.log("dateValue", dayjs(value).format("DD/MM/YYYY"));
    };

    const compare = (a, b) => {
        if (dayjs(a.bookingDate).isBefore(dayjs(b.bookingDate))) {
            return -1;
        }
        if (dayjs(a.bookingDate).isAfter(dayjs(b.bookingDate))) {
            return 1;
        }
        return 0;
    };

    const findName = (id, arr) => {
        return arr.find((item) => item._id === id);
    };

    const renderInfo = () => {
        let currentBookings = scheduleInfo.filter((item) => {
            return dayjs(item.bookingDate).isSame(date, "day");
        });
        currentBookings.sort(compare);
        console.log("current bookings", currentBookings);

        return currentBookings.map((item) => {
            const time = dayjs(item.bookingDate).format("h:mm A");
            const endTime = dayjs(item.bookingDate)
                .add(1, "hour")
                .format("h:mm A");
            return (
                <>
                    <div className="info-item">
                        <h6>
                            {time} - {endTime}
                        </h6>
                        <div className="info-details">
                            <p>{findName(item.emp_id, employees)?.empName}</p>
                            <p>
                                Client:{" "}
                                {findName(item.user_id, clients)?.username}
                            </p>
                        </div>
                    </div>
                </>
            );
        });
    };

    return (
        <div className="admin-schedule-section">
            <div className="schedule-header">
                <h2>Check Date</h2>
                <span>
                    <DatePicker
                        size={"large"}
                        format={"DD/MM/YYYY"}
                        onChange={updateDate}
                        defaultValue={dayjs()}
                    />
                </span>
            </div>
            <div className="info-wrapper">{renderInfo()}</div>
            <div className="footer"></div>
        </div>
    );
};

export default AdminSchedule;
