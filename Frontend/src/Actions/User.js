import axios from "axios";
import { API } from "../Api/api";
import Cookies from "js-cookie";
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await API.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", data.token);
    Cookies.set("token", data.token, { expires: 86400 });

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

//=================== Register ====================================================

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });

    const { data } = await API.post(
      "/api/v1/register",
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", data.token);
    Cookies.set("token", data.token, { expires: 86400 });
    dispatch({
      type: "RegisterSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response.data.message,
    });
  }
};

//==================================================================================

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await API.get("/api/v1/me");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

//=================================== Logout User =============================

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    await API.get("/api/v1/logout");

    localStorage.removeItem("token");

    Cookies.set("token", null);

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};
