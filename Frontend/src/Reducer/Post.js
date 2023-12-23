import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("likeRequest", (state) => {
      state.loading = true;
    })
    .addCase("likeSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("likeFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("addCommentRequest", (state) => {
      state.loading = true;
    })
    .addCase("addComentSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("addCommentFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("newPostRequest", (state) => {
      state.loading = true;
    })
    .addCase("newPostSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("newPostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("GetPostRequest", (state) => {
      state.loading = true;
    })
    .addCase("GetPostSuccess", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("GetPostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
    });
});
