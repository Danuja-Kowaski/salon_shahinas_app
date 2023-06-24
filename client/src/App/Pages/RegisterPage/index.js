import { React, useEffect } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { getLoggedInUser } from "../../utils";

import "./styles.sass";

const RegisterPage = () => {
    const navigate = useNavigate();
    const user = getLoggedInUser();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, []);
    // Register
    const onFinish = async (values) => {
        try {
            const res = await axios.post("http://localhost:5500/api/register", {
                username: values.username,
                email: values.email,
                password: values.password,
                user_type: "CLIENT",
            });
            console.log(res.data);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="register-section background-theme">
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
                            className="email-input"
                            label="Email Address"
                            name="email"
                            rules={[{ type: "email", required: true }]}
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
                                type="primary"
                                size={"large"}
                                htmlType="submit"
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className="register-text">
                <p>If you already have an account</p>
                <a href="/login">
                    <Button type="primary" size={"large"}>
                        Login
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default RegisterPage;
