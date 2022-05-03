import React from "react";
import { Row, Col } from "antd";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatRoom() {
    return (
        <div>
            <Row>
                <Col xl={5} md={0} sm={0} xs={0}>
                    <Sidebar />
                </Col>
                <Col xl={19} md={24} sm={24} xs={24}>
                    <ChatWindow />
                </Col>
            </Row>
        </div>
    );
}
