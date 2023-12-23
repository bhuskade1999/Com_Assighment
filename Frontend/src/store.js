import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducer/user";
import { likesReducer } from "./Reducer/Post";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: likesReducer,
  },
});

export default store;
