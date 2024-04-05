import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/loginThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    showLoading: false,
    showFailure: false,
  },
  reducers: {
    setshowFailure(state, action) {
      state.showFailure = action.payload;
    },
    setShowLoading(state, action) {
      state.showLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginThunk.pending, (state, action) => {
      state.showLoading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.showLoading = false;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.showLoading = false;
      state.showFailure = true;
    });
  },
});

export const userReducer = userSlice.reducer;

export const { setshowFailure, setShowLoading } = userSlice.actions;
