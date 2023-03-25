import React from "react";

import { ConfigProvider } from "antd";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.scss";

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#FFB6EA",
                },
            }}
        >
            {/* <LoginPage /> */}
            {/* <RegisterPage /> */}
            <HomePage />
        </ConfigProvider>
    );
}

export default App;
