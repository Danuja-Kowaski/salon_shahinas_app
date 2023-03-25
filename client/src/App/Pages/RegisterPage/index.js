import React from "react";

import { Button, Form, Input } from "antd";

import "./styles.sass";

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log("Success:", values);
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
                <Button type="primary" size={"large"}>
                    Login
                </Button>
            </div>
        </div>
    );
};

export default RegisterPage;
