import React, { createContext, useState } from 'react';

const AuthContext = createContext();
export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const existingTokensFn = () => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      return localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : {};
    } else {
      return {};
    }
  }
  const existingTokens = existingTokensFn();
  const encodedString = existingTokens && existingTokens.hasOwnProperty('encodedString') ? existingTokens.encodedString : null;
  const stringEncodedAccess = existingTokens && existingTokens.hasOwnProperty('stringEncodedAccess') ? existingTokens.stringEncodedAccess : null;
  const type = existingTokens && existingTokens.hasOwnProperty('userType') ? existingTokens.userType : false;
  const defaultName = existingTokens && existingTokens.hasOwnProperty('name') ? existingTokens.name : 'Unknown Name';
  const defaultEmail = existingTokens && existingTokens.hasOwnProperty('email') ? existingTokens.email : 'unknown.name@ul.com';
  const defaultUserId = existingTokens && existingTokens.hasOwnProperty('userId') ? existingTokens.userId : null;
  const isEmailVerified = existingTokens && existingTokens.hasOwnProperty('emailVerified') ? existingTokens.emailVerified : null;

  const currentProfileImageFn = () => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      return localStorage.getItem('user_profile') ? localStorage.getItem('user_profile') : null;
    } else {
      return null;
    }
  }
  const currentProfileImage = currentProfileImageFn();
  const [profileImage, setUserProfile] = useState(currentProfileImage);
  const [authTokens, setAuthTokens] = useState(encodedString);
  const [accessToken, setAccessToken] = useState(stringEncodedAccess);
  const [userType, setUserType] = useState(type);
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [userId, setUserId] = useState(defaultUserId);
  const [emailVerified, setEmailVerified] = useState(isEmailVerified);
  const setTokens = (data) => {
      if (typeof window !== 'undefined') {
        if (data && data.hasOwnProperty('rememberMe') && data.rememberMe) {
          localStorage.setItem('rememberMe', data.encodedString);
        } else if (data && data.hasOwnProperty('rememberMe') && !data.rememberMe) {
          localStorage.removeItem('rememberMe');
        }
        if (!data) {
          localStorage.removeItem("tokens");
        } else {
          localStorage.setItem("tokens", JSON.stringify(data));
        }
      }
      setAuthTokens(data && data.hasOwnProperty('encodedString') ? data.encodedString : null);
      setAccessToken(data && data.hasOwnProperty('stringEncodedAccess') ? data.stringEncodedAccess : null);
      setUserType(data && data.hasOwnProperty('userType') ? data.userType : type);
      setName(data && data.hasOwnProperty('name') ? data.name : defaultName);
      setEmail(data && data.hasOwnProperty('email') ? data.email : defaultEmail);
      setUserId(data && data.hasOwnProperty('userId') ? data.userId : defaultUserId);
      setEmailVerified(data && data.hasOwnProperty('emailVerified') ? data.emailVerified : isEmailVerified);
  }

  const setUserProfileImage = (data) =>{
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_profile', data);
      setUserProfile(data);
    }
  }

  const setVerifyEmail = (data) => {
      let token = existingTokens;
      token.emailVerified = data;
      setTokens(token);
  }

  return (
    <AuthContext.Provider value={{ 
        authTokens, 
        accessToken, 
        setAuthTokens: setTokens, 
        name, 
        email, 
        userType, 
        userId, 
        profileImage, 
        setUserProfileImage, 
        emailVerified,
        setVerifyEmail
      }}>
      {children}
    </AuthContext.Provider>
  )
}