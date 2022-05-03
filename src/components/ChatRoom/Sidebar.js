import React from "react";
import { Row, Col } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from 'styled-components';

// Khi chương trình biên dịch gặp component này sẽ biên dịch ra 1 thẻ div tương ứng trên case DOM,
// và thẻ div có 1 class do style components render
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
