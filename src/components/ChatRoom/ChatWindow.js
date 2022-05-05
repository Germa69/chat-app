import React, { useContext } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Tooltip, Input } from "antd";
import Message from "./Message";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid rgba(230, 230, 230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__title {
            margin: 0;
            font-weight: bold;
        }

        &__desc {
            font-size: 12px;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const WrapperStyled = styled.div`
    height: 100vh;
`;

const FormStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`;

const ContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: calc(100% - 56px);
    padding: 12px;
`;

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;

export default function ChatWindow() {
    const { selectedRoom, members } = useContext(AppContext);

    return (
        <WrapperStyled>
            <HeaderStyled>
                <div className="header__info">
                    <p className="header__title">{selectedRoom.name}</p>
                    <span className="header__desc">
                        {selectedRoom.description}
                    </span>
                </div>
                <ButtonGroupStyled>
                    <Button icon={<UserAddOutlined />} type="text">
                        Mời
                    </Button>
                    <Avatar.Group size="small" maxCount={2}>
                        {members.map((member) => (
                            <Tooltip title={member.displayName} key={member.id}>
                                <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                </ButtonGroupStyled>
            </HeaderStyled>
            <ContentStyled>
                <MessageListStyled>
                    <Message
                        text="Test"
                        photoURL={null}
                        displayName="Anh"
                        createdAt={21212165465}
                    />
                    <Message
                        text="Test 2"
                        photoURL={null}
                        displayName="Anh 2"
                        createdAt={21212165466}
                    />
                    <Message
                        text="Test 3"
                        photoURL={null}
                        displayName="Anh 3"
                        createdAt={21212165467}
                    />
                    <Message
                        text="Test 4"
                        photoURL={null}
                        displayName="Anh 4"
                        createdAt={21212165468}
                    />
                    <Message
                        text="Test 5"
                        photoURL={null}
                        displayName="Anh 5"
                        createdAt={21212165469}
                    />
                </MessageListStyled>
                <FormStyled>
                    <Form.Item>
                        <Input
                            placeholder="Nhập tin nhắn..."
                            bordered={false}
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Button type="primary">Gửi</Button>
                </FormStyled>
            </ContentStyled>
        </WrapperStyled>
    );
}
