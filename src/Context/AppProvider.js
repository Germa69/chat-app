import React, { useContext, useMemo, useState } from "react";
import useFireStore from "../hooks/useFireStore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);

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

    return (
        <AppContext.Provider
            value={{ rooms, isAddRoomVisible, setIsAddRoomVisible }}
        >
            {children}
        </AppContext.Provider>
    );
}
