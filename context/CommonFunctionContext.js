import React, {useState, createContext, useMemo } from "react";

const CommonFunctionContext = createContext();

export default CommonFunctionContext;

export const  CommonFunctionContextProvider =({ children }) => {

  const backgroundStatusColor = (status) => {

      if (status === 'Active') {
          return 'badge-success';
      }

      if (status === 'Pending Approval') {
          return 'badge-warning';
      }

      if (status === 'Rejected') {
          return 'badge-danger';
      }

      return 'badge-success';
  }

  const [location, setSearchLocation] = useState('');
  const [locationString, setLocationString] = useState('');
  /* const hideToast = useCallback(
      () => toast.dismiss()
  );

  const showToastSuccess = useCallback (
    (message) => toast.success(message, {
      position: "bottom-center",
      closeOnClick: true,
      hideProgressBar: true
    })
  ); */
  const currentUrlFn = () =>{
		if (typeof window  !== 'undefined') {
		  return window.location.href
		}
	};

  return (
    <CommonFunctionContext.Provider value={{backgroundStatusColor, location, setSearchLocation, locationString, setLocationString, currentUrlFn}}>
      {children}
    </CommonFunctionContext.Provider>
  );
}
