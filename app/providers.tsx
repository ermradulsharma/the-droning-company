"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { CommonFunctionContextProvider } from "../context/CommonFunctionContext";
import { ToastContextProvider } from "../context/ToastContext";
import { UserContextProvider } from "../context/UserContext";
import { AuthContextProvider } from "../context/AuthContext";
import { ConfirmProvider } from "material-ui-confirm";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <CommonFunctionContextProvider>
                <ToastContextProvider>
                    <UserContextProvider>
                        <AuthContextProvider>
                            <ConfirmProvider>
                                {children}
                            </ConfirmProvider>
                        </AuthContextProvider>
                    </UserContextProvider>
                </ToastContextProvider>
            </CommonFunctionContextProvider>
        </Provider>
    );
}
