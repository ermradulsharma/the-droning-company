import { configureStore, t } from "@reduxjs/toolkit";
import HomePageSlice from "./HomePageSlice";
import ProfileSlice from "./profileSlice";
import VerifyEmailSlice from "./VerifyEmailSlice";
// import globalReducer from "./globalSlice";

// export const store = configureStore({
//   reducer: {
//      verifyEmail: VerifyEmailSlice,
//      home:HomePageSlice,
//      profile:profileSlice
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
export const store = configureStore({
  reducer: {
    verifyEmail: VerifyEmailSlice,
    home: HomePageSlice,
    profile: ProfileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
