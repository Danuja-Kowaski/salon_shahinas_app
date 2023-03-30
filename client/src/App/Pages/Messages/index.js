import { React, useState, useEffect } from "react";

import { Divider, Skeleton, Input } from "antd";

import "./styles.sass";

const Messages = () => {
    const { Search } = Input;
    const [showMsg, setShowMsg] = useState(false);

    const [msgArr, setMsgArr] = useState([
        {
            text: "Hi this is Jane",
            received: true,
        },
        {
            text: "How can we help you today?",
            received: true,
        },
    ]);

    useEffect(() => {
        setTimeout(() => {
            setShowMsg(true);
        }, 1000);
    }, []);

    const onSearch = (msg) => {
        const message = {
            text: msg,
            received: false,
        };
        setMsgArr([...msgArr, message]);
    };

    const renderMessages = () => {
        if (showMsg) {
            return msgArr.map((item) => (
                <div
                    className={`message-item ${
                        item.received ? "left" : "right"
                    }`}
                >
                    <p>{item.text}</p>
                </div>
            ));
        }
        return <Skeleton />;
    };

    return (
        <div className="messages-section">
            <h4>Message Us</h4>
            <Divider />
            <div className="messages-wrapper">{renderMessages()}</div>
            <div className="message-input">
                <Search
                    placeholder="Type message"
                    allowClear
                    enterButton="Send"
                    size="large"
                    onSearch={onSearch}
                />
            </div>
        </div>
    );
};

export default Messages;
