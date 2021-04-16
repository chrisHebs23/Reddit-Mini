import { combineReducers } from "redux";
import subredditsReducer from "../features/subreddits/subredditSlice";

const rootReducer = combineReducers({
  subreddits: subredditsReducer,
});

export default rootReducer;
