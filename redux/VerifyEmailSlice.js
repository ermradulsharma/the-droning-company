import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../util/Constants';



export const Verify_Email = createAsyncThunk('verifyEmail', async (token) => {
    try {
        const response = await fetch(`${SERVER_URL}/verify-email/${token}`, {
            method: 'GET',
        });
        return await response.json();
    } catch (e) {
        console.log(e);
    }

})

const InitialState = {
    loading: false,
    error: null,
    data: null,
    success: null,

}

const VerifyEmailSlice = createSlice({
    name: 'verifyEmail',
    initialState: InitialState,
    extraReducers: (builder) => {
        builder
            .addCase(Verify_Email.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.data = null;
                state.success = null;
            })
            .addCase(Verify_Email.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload.status === 200) {
                    toast.success(payload.message);
                } else {
                    toast.error(payload.message);
                }
            })
            .addCase(Verify_Email.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export default VerifyEmailSlice.reducer;
