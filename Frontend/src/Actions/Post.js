import axios from "axios";
import { API } from "../Api/api";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await API.get(`/api/v1/post/${id}`);

    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

//===============================================

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });

    const { data } = await API.put(
      `/api/v1/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "addComentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

//==================================== New post=======================

export const createNewPost = (title, caption) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const { data } = await API.post(
      `/api/v1/post/upload/`,
      {
        title,
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

//====================================get New post =======================

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetPostRequest",
    });

    const { data } = await API.get(`/api/v1/post/get/allPosts`);
    console.log(data);
    dispatch({
      type: "GetPostSuccess",
      payload: data.posts,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "GetPostFailure",
      payload: error.response.data.message,
    });
  }
};
