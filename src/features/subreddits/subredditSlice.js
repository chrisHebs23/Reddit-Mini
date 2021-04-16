import { createSlice } from "@reduxjs/toolkit";
import { getSubreddits } from "../../api";

export const initialState = {
  loading: false,
  hasErrors: false,
  subreddits: [],
};

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState,
  reducers: {
    getSubredditsLoad(state) {
      state.loadingSubs = true;
    },
    getSubredditsSuccess(state, { payload }) {
      state.subreddits = payload;
      state.loadingSubs = false;
      state.hasErrors = false;
    },
    getSubredditsFailure(state) {
      state.loadingSubs = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getSubredditsLoad,
  getSubredditsSuccess,
  getSubredditsFailure,
} = subredditsSlice.actions;

export default subredditsSlice.reducer;
export const subredditsSelector = (state) => state.subreddits;

export function fetchSubreddits() {
  return async (dispatch) => {
    dispatch(getSubredditsLoad());
    try {
      const data = await getSubreddits();
      dispatch(getSubredditsSuccess(data));
    } catch (e) {
      dispatch(getSubredditsFailure());
      console.log(e);
    }
  };
}
