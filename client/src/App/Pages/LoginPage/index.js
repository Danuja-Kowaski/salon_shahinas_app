import React from "react";

import { Button, Form, Input } from "antd";

import "./styles.sass";

const LoginPage = () => {
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
                <Button size={"large"} type="primary">
                    Register
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
