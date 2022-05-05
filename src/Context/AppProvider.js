import React, { useContext, useMemo, useState } from "react";
import useFireStore from "../hooks/useFireStore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState("");

    const {
        user: { uid },
    } = useContext(AuthContext);

    /**
     * {
     *  name: 'room name',
     *  description: 'mo ta',
     *  members: [uid, uid1, ...]
     * }
     */
    const roomsCondition = useMemo(() => {
        return {
            fieldName: "members",
            operator: "array-contains",
            compareValue: uid,
        };
    }, [uid]);

    const rooms = useFireStore("rooms", roomsCondition);

    const selectedRoom = useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    );

    const usersCondition = useMemo(() => {
        return {
            fieldName: "uid",
            operator: "in",
            compareValue: selectedRoom.members,
        };
    }, [selectedRoom.members]);

    const members = useFireStore("users", usersCondition);

    return (
        <AppContext.Provider
            value={{
                rooms,
                members,
                selectedRoom,
                isAddRoomVisible,
                setIsAddRoomVisible,
                selectedRoomId,
                setSelectedRoomId,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
