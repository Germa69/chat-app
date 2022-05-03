import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authentication } from "../components/firebase/config";
import { Spin } from 'antd';

// Cấu hình contextAPI để các components có hiển thị thông tin user
export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authentication, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                });
                setIsLoading(false);
                navigate("/");
                return;
            }

            // reset user info
            setUser({});
            setIsLoading(false);
            navigate("/login");
        });

        // Clear function
        return () => {
            unsubscribe();
        };
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
        </AuthContext.Provider>
    );
}
