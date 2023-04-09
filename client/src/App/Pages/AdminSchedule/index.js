import { React } from "react";

import { DatePicker } from "antd";
import dayjs from "dayjs";

import "./styles.sass";

const AdminSchedule = () => {
    const updateDate = (value) => {
        if (!value) {
            return;
        }
        console.log("dateValue", dayjs(value).format("DD/MM/YYYY"));
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
            <div className="info-wrapper">
                <div className="info-item">
                    <h6>08:00 am - 09:00 am</h6>
                    <div className="info-details">
                        <p>Employee 04</p> <p> Client: Jane Doe</p>
                    </div>
                    <div className="info-details">
                        <p>Employee 04</p> <p> Client: Jane Doe</p>
                    </div>
                </div>
                <div className="info-item">
                    <h6>08:00 am - 09:00 am</h6>
                    <div className="info-details">
                        <p>Employee 04</p> <p> Client: Jane Doe</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSchedule;
