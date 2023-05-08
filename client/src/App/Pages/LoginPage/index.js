import { React, useEffect } from "react";

import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { getLoggedInUser } from "../../utils";
import "./styles.sass";

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("current user", getLoggedInUser());
    }, []);

    const setUser = (userInfo) => {
        // Save user data in local storage
        localStorage.setItem("user", JSON.stringify(userInfo));
    };

    // Login
    const onFinish = async (values) => {
        try {
            const res = await axios.post("http://localhost:5500/api/login", {
                username: values.username,
                password: values.password,
            });
            console.log(res.data);
            setUser(res.data.user);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="login-section">
            <div className="form-wrapper">
                <div className="form-sub-wrapper">
                    <h3>Sign in</h3>
                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            className="username-input"
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className="password-input"
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item className="submit-btn">
                            <Button
                                size={"large"}
                                type="primary"
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className="register-text">
                <p>Don't have an account?</p>
                <a href="/register">
                    <Button size={"large"} type="primary">
                        Register
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default LoginPage;
