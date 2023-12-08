import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/AxiosInstance";

export const getHomePageAdsData = createAsyncThunk(
  "getHomePageAdsData",
  async () => {
    try {
      let res = await axiosInstance.get("/get-banner/home-page");
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getNewsPageAdsData = createAsyncThunk(
  "getNewsPageAdsData",
  async () => {
    try {
      let res = await axiosInstance.get("/get-banner/blog-list");
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getBlogDetailsPageAdsData = createAsyncThunk(
  "getBlogDetailsPageAdsData",
  async () => {
    try {
      let res = await axiosInstance.get("/get-banner/blog-details");
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  }
);
//
export const getJobPageAdsData = createAsyncThunk(
  "getJobPageAdsData",
  async () => {
    try {
      let res = await axiosInstance.get("/get-banner/job-list");
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const getAboutAdsData = createAsyncThunk("getAboutAdsData", async () => {
  try {
    let res = await axiosInstance.get("/get-banner/about-us");
    return res?.data;
  } catch (e) {
    console.log(e);
  }
});

export const getGearReviewsData = createAsyncThunk(
  "getGearReviewsData",
  async () => {
    try {
      let res = await axiosInstance.get("/get-banner/gear-reviews");
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getContactUsData = createAsyncThunk(
  "getContactUsData",
  async () => {
    try {
      let res = await axiosInstance.get("/get-banner/contact-us");
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const getFaqData = createAsyncThunk("getFaqData", async () => {
  try {
    let res = await axiosInstance.get("/get-banner/faq");
    return res?.data;
  } catch (e) {
    console.log(e);
  }
});

export const getDashboardAds = createAsyncThunk(
  "getDashboardAds",
  async (url) => {
    try {
      let res = await axiosInstance.get(`/get-banner/${url}`);
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getDashboardSidebarAds = createAsyncThunk(
  "getDashboardSidebarAds",
  async (url) => {
    try {
      let res = await axiosInstance.get(`/get-banner/${url}`);
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const initialState = {
  getHomePageAdsData_status: "idle",
  getHomePageAdsData_data: null,
  getHomePageAdsData_error: null,
  getNewsPageAdsData_status: "idle",
  getNewsPageAdsData_data: null,
  getNewsPageAdsData_error: null,
  getBlogDetailsPageAdsData_status: "idle",
  getBlogDetailsPageAdsData_data: null,
  getBlogDetailsPageAdsData_error: null,
  getJobPageAdsData_status: "idle",
  getJobPageAdsData_data: null,
  getJobPageAdsData_error: null,
  getAboutAdsData_status: "idle",
  getAboutAdsData_data: null,
  getAboutAdsData_error: null,
  getGearReviewsData_status: "idle",
  getGearReviewsData_data: null,
  getGearReviewsData_error: null,
  getContactUsData_status: "idle",
  getContactUsData_data: null,
  getContactUsData_error: null,
  getFaqData_status: "idle",
  getFaqData_data: null,
  getFaqData_error: null,
  getDashboardAds_status: "idle",
  getDashboardAds_data: null,
  getDashboardAds_error: null,

  getDashboardSidebarAds_status: "idle",
  getDashboardSidebarAds_data: null,
  getDashboardSidebarAds_error: null,
};

const HomePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: {
    //get getDashboardAds
    [getDashboardAds.pending]: (state, action) => {
      state.getDashboardAds_status = "pending";
    },
    [getDashboardAds.fulfilled]: (state, { payload }) => {
      state.getDashboardAds_status = "fulfilled";

      if (payload?.statusCode === 200) {
        state.getDashboardAds_data = payload?.data?.banner_section;
      } else {
      }
    },
    [getDashboardAds.rejected]: (state, action) => {
      state.getDashboardAds_status = "rejected";
      state.getDashboardAds_error = action.error;
    },
    //Home page add data
    [getHomePageAdsData.pending]: (state) => {
      state.getHomePageAdsData_status = "pending";
    },
    [getHomePageAdsData.fulfilled]: (state, { payload }) => {
      state.getHomePageAdsData_status = "fulfilled";
      if (payload?.statusCode === 200) {
        state.getHomePageAdsData_data = payload?.data?.banner_section;
      } else {
      }
    },
    [getHomePageAdsData.rejected]: (state) => {
      state.getHomePageAdsData_status = "rejected";
      state.getHomePageAdsData_error = "Something went wrong";
    },
    [getNewsPageAdsData.pending]: (state) => {
      state.getNewsPageAdsData_status = "pending";
    },
    [getNewsPageAdsData.fulfilled]: (state, { payload }) => {
      state.getNewsPageAdsData_status = "fulfilled";
      if (payload?.statusCode === 200) {
        state.getNewsPageAdsData_data = payload?.data?.banner_section;
      } else {
      }
    },
    [getNewsPageAdsData.rejected]: (state) => {
      state.getNewsPageAdsData_status = "rejected";
      state.getNewsPageAdsData_error = "Something went wrong";
    },
    [getBlogDetailsPageAdsData.pending]: (state) => {
      state.getBlogDetailsPageAdsData_status = "pending";
    },
    [getBlogDetailsPageAdsData.fulfilled]: (state, { payload }) => {
      state.getBlogDetailsPageAdsData_status = "fulfilled";
      if (payload?.statusCode === 200) {
        state.getBlogDetailsPageAdsData_data = payload?.data?.banner_section;
      } else {
      }
    },
    [getBlogDetailsPageAdsData.rejected]: (state) => {
      state.getBlogDetailsPageAdsData_status = "rejected";
      state.getBlogDetailsPageAdsData_error = "Something went wrong";
    },
    //job page
    [getJobPageAdsData.pending]: (state) => {
      state.getJobPageAdsData_status = "pending";
    },
    [getJobPageAdsData.fulfilled]: (state, { payload }) => {
      state.getJobPageAdsData_status = "fulfilled";
      if (payload?.statusCode === 200) {
        state.getJobPageAdsData_data = payload?.data?.banner_section;
      } else {
      }
    },
    [getJobPageAdsData.rejected]: (state) => {
      state.getJobPageAdsData_status = "rejected";
      state.getJobPageAdsData_error = "Something went wrong";
    },
    //about us page add
    [getAboutAdsData.pending]: (state) => {
      state.getAboutAdsData_status = "pending";
    },
    [getAboutAdsData.fulfilled]: (state, { payload }) => {
      state.getAboutAdsData_status = "fulfilled";
      if (payload?.statusCode === 200) {
        state.getAboutAdsData_data = payload?.data?.banner_section;
      } else {
      }
    },
    [getAboutAdsData.rejected]: (state) => {
      state.getAboutAdsData_status = "rejected";
      state.getAboutAdsData_error = "Something went wrong";
    },
    //gear review
    [getGearReviewsData.pending]: (state) => {
      state.getGearReviewsData_status = "pending";
    },
    [getGearReviewsData.fulfilled]: (state, { payload }) => {
      state.getGearReviewsData_status = "fulfilled";
      if (payload?.statusCode === 200) {
        state.getGearReviewsData_data = payload?.data?.banner_section;
      } else {
      }
    },
    [getGearReviewsData.rejected]: (state) => {
      state.getGearReviewsData_status = "rejected";
      state.getGearReviewsData_error = "Something went wrong";
    },

    //conatct us
    [getContactUsData.pending]: (state) => {
      state.getContactUsData_status = "pending";
    },
    [getContactUsData.fulfilled]: (state, { payload }) => {
      state.getContactUsData_status = "fulfilled";
      if (payload?.statusCode === 200) {
        state.getContactUsData_data = payload?.data?.banner_section;
      } else {
      }
    },
    [getContactUsData.rejected]: (state) => {
      state.getContactUsData_status = "rejected";
      state.getContactUsData_error = "Something went wrong";
    },
    //faq
    [getFaqData.pending]: (state) => {
      state.getFaqData_status = "pending";
    },
    [getFaqData.fulfilled]: (state, { payload }) => {
      state.getFaqData_status = "fulfilled";
      if (payload?.statusCode === 200) {
        state.getFaqData_data = payload?.data?.banner_section;
      } else {
      }
    },
    [getFaqData.rejected]: (state) => {
      state.getFaqData_status = "rejected";
      state.getFaqData_error = "Something went wrong";
    },
    // dashboard sidebar adds
    [getDashboardSidebarAds.pending]: (state) => {
      state.getDashboardSidebarAds_status = "pending";
    },
    [getDashboardSidebarAds.fulfilled]: (state, { payload }) => {
      state.getDashboardSidebarAds_status = "fulfilled";
      if (payload?.statusCode === 200) {
        state.getDashboardSidebarAds_data = payload?.data?.banner_section;
      } else {
      }
    },
    [getDashboardSidebarAds.rejected]: (state) => {
      state.getDashboardSidebarAds_status = "rejected";
      state.getDashboardSidebarAds_error = "Something went wrong";
    },
  },
});

export default HomePageSlice.reducer;
