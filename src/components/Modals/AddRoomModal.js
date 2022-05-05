import React, { useContext } from "react";
import { Form, Modal, Input } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const {
        user: { uid },
    } = useContext(AuthContext);
    // Retrieve data through Object form
    const [form] = Form.useForm();

    const handleOk = async () => {
        // Add new room to firebase
        await addDoc(collection(db, "rooms"), {
            ...form.getFieldValue(),
            members: [uid],
            createdAt: serverTimestamp(),
        });

        // Reset form value
        form.resetFields();

        setIsAddRoomVisible(false);
    };

    const handleCancel = () => {
        // Reset form value
        form.resetFields(); 

        setIsAddRoomVisible(false);
    };

    return (
        <div>
            <Modal
                title="Tạo phòng"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
