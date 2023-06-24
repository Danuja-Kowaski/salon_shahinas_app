import { React, useState, useEffect } from "react";

import { Divider, Skeleton, Input } from "antd";

import "./styles.sass";

const Messages = () => {
    const { Search } = Input;
    const [showMsg, setShowMsg] = useState(false);
    const [messageInput, setMessageInput] = useState("");

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
        setMessageInput("");
    };

    const renderMessages = () => {
        if (showMsg) {
            return msgArr.map((item, index) => (
                <div
                    className={`message-item ${
                        item.received ? "left" : "right"
                    }`}
                    key={index}
                >
                    <p>{item.text}</p>
                </div>
            ));
        }
        return <Skeleton />;
    };

    const setInput = (e) => {
        setMessageInput(e.target.value);
    };

    return (
        <div className="messages-section background-theme">
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
                    onChange={setInput}
                    value={messageInput}
                />
            </div>
        </div>
    );
};

export default Messages;
