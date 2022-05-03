import React from "react";
import { Avatar, Button, Typography } from "antd";
import styled from "styled-components";
import { signOut } from 'firebase/auth';
import { authentication } from '../firebase/config';

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83);

    .username {
        color: #fff;
        margin-left: 10px;
    }
`;

export default function UserInfo() {
    return (
        <WrapperStyled>
            <div>
                <Avatar>Mouse Animate</Avatar>
                <Typography.Text className="username">Mouse Animate</Typography.Text>
            </div>
            <Button ghost onClick={() => signOut(authentication)}>Đăng xuất</Button>
        </WrapperStyled>
    );
}
