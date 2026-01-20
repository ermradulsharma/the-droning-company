import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/AxiosInstance";
import { SERVER_URL } from "../util/Constants";

export const DeactivateAccount = createAsyncThunk(
  "DeactivateAccount",
  async (data) => {
    try {
      const res = await axiosInstance.get(
        `${SERVER_URL}/profile/delete/${data}`
      );
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const initialState = {
  DeactivateAccount_status: "idle",
  DeactivateAccount_data: null,
  DeactivateAccount_error: null,
  redirected_to: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setRedirectedTo: (state, { payload }) => {
      payload?.push("/login");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DeactivateAccount.pending, (state, action) => {
        state.DeactivateAccount_status = "pending";
        state.DeactivateAccount_data = null;
        state.DeactivateAccount_error = null;
      })
      .addCase(DeactivateAccount.fulfilled, (state, { payload }) => {
        state.DeactivateAccount_status = "fulfilled";

        if (payload?.statusCode === 200) {
          state.redirected_to = "/login";
          toast.success(payload?.data?.message);
          localStorage.removeItem("tokens");
          localStorage.removeItem("user_profile");
          localStorage.removeItem("rememberMe");
          window.location.pathname = "/login";
        } else {
          toast.error(payload?.message);
        }
      })
      .addCase(DeactivateAccount.rejected, (state, action) => {
        state.DeactivateAccount_status = "rejected";
      });
  },
});
export const { setRedirectedTo } = profileSlice.actions;
export default profileSlice.reducer;
