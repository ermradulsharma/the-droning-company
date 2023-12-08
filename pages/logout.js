import React from "react";
import { useRouter } from "next/router";
import useAuthContext from "../hooks/useAuthContext";
const Logout = () => {
	let router = useRouter();
    const { setAuthTokens } = useAuthContext();
    setAuthTokens();
    if (typeof window !== 'undefined') {
        localStorage.removeItem('tokens');
        localStorage.removeItem('user_profile');
        router.push('/');
    }
    return (null)
}
export default Logout;