import { configureStore, t } from "@reduxjs/toolkit";
import homePageSlice from "./homePageSlice";
import ProfileSlice from "./profileSlice";
import verifyEmailSlice from "./verifyEmailSlice";
// import globalReducer from "./globalSlice";

// export const store = configureStore({
//   reducer: {
//      verifyEmail: verifyEmailSlice,
//      home:homePageSlice,
//      profile:profileSlice
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
export const store = configureStore({
  reducer: {
    verifyEmail: verifyEmailSlice,
    home: homePageSlice,
    profile: ProfileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
