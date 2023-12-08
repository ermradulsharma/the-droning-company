import React, { createContext, useState } from 'react';

const UserContext = createContext();
export default UserContext;

export const UserContextProvider = ({ children }) => {

  const defaultCollapsed = () => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      return localStorage.getItem("isCollapsed") ? localStorage.getItem("isCollapsed") : false;
    } else {
      return false;
    }
  }
  const [ userInitialData, setUserInitialData] = useState({});
  const [drawerCollapsed, setCollapsed] = useState(defaultCollapsed);
  const [tempUserSubscriptionData, setTempUserSubscriptionData] = useState({});

  const setInitialData = (data) => {
    setUserInitialData(data);
  }

  const setDrawerCollapsed = (isCollapsed) => {
      localStorage.setItem('isCollapsed', isCollapsed);
      setCollapsed(isCollapsed);
  }

  return (
    <UserContext.Provider value={{ userInitialData, setInitialData, drawerCollapsed, setDrawerCollapsed, tempUserSubscriptionData, setTempUserSubscriptionData }}>
        {children}
    </UserContext.Provider>
  )
}