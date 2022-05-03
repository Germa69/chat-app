import React, { useEffect } from "react";
import { Avatar, Button, Typography } from "antd";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

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
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                
                // Dữ liệu sau khi convert từ 1 docs của firebase thành kiểu dữ liệu thông thường JS
                console.log({data, snapshot, docs: snapshot.docs});
            }
        );

        // Clear function
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <WrapperStyled>
            <div>
                <Avatar>Mouse Animate</Avatar>
                <Typography.Text className="username">
                    Mouse Animate
                </Typography.Text>
            </div>
            <Button ghost onClick={() => signOut(auth)}>
                Đăng xuất
            </Button>
        </WrapperStyled>
    );
}
