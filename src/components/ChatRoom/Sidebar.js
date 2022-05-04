import React from "react";
import { Row, Col } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from 'styled-components';

// When the compiler encounters this component, it will compile a corresponding div tag on the DOM case,
// and the div tag has a class rendered by style components.
const SidebarStyled = styled.div`
    background-color: #3f0e40;
    color: #fff;
    height: 100vh;
`;

export default function Sidebar() {
    return (
        <SidebarStyled>
            <Row>
                <Col span={24}>
                    <UserInfo />
                </Col>
                <Col span={24}>
                    <RoomList />
                </Col>
            </Row>
        </SidebarStyled>
    );
}
