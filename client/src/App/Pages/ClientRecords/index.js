import { React, useState, useEffect } from "react";
import axios from "axios";

import List from "../common/List";

const ClientRecords = () => {
    const [clients, setClients] = useState([]);
    const items = [];

    useEffect(() => {
        getClients();
    }, []);

    const getClients = async () => {
        try {
            const res = await axios.get(`http://localhost:5500/api/clients`, {});
            setClients(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getItems = () => {
        clients.forEach((client) => {
            items.push({
                link: "",
                title: client.username,
                data: client,
            });
        });
        return items;
    };


    return (
        <div className="client-record-section">
            <List 
                items={getItems()} 
                heading="My Client Records" 
                isClient={true}
            />
        </div>
    );
};

export default ClientRecords;
