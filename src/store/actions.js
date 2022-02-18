import axios from "axios";
import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
} from "./constants";

import { backend_URL } from "../libs/functions";

export const loginAction = (loginInput, setRedirect, setMessage) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LOGIN_REQUEST });
    try {
      const { data } = await axios.post(backend_URL + "/login", loginInput);
      setRedirect("/list");
      window.localStorage.setItem("roomatch", JSON.stringify({myId: data._id, token: data.token}));
      dispatch({ type: FETCH_LOGIN_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: FETCH_LOGIN_ERROR, payload: e });
      setMessage(e.response.data.message)
    }
  };
};

export const restoreSession = (body, setRedirect) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LOGIN_REQUEST });
    try {
      const { data } = await axios.post(backend_URL + "/update", body);
      window.localStorage.setItem("roomatch", JSON.stringify({myId: data._id, token: data.token}));
      setRedirect("/list");
      console.log(data)
      dispatch({ type: FETCH_LOGIN_SUCCESS, payload: data });
    } catch (e) {
      console.log(e)
      dispatch({ type: FETCH_LOGIN_ERROR, payload: e });
    }
  };
};

export const updateAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LOGIN_REQUEST });
    try {
      const { data } = await axios.post(backend_URL + "/update", body);
      window.localStorage.setItem("roomatch", JSON.stringify({myId: data._id, token: data.token}));
      dispatch({ type: FETCH_LOGIN_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: FETCH_LOGIN_ERROR, payload: e });
    }
  };
};

export const newRoom = (body, setRedirect) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LOGIN_REQUEST });
    try {
      const { data } = await axios.post(backend_URL + "/rooms", body);
      window.localStorage.setItem("roomatch", JSON.stringify({myId: data._id, token: data.token}));
      setRedirect("/profile");
      dispatch({ type: FETCH_LOGIN_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: FETCH_LOGIN_ERROR, payload: e });
    }
  };
};

export const deleteRoom = (roomId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LOGIN_REQUEST });
    try {
      const { data } = await axios.delete(backend_URL + "/rooms/" + roomId);
      window.localStorage.setItem("roomatch", JSON.stringify({myId: data._id, token: data.token}));
      dispatch({ type: FETCH_LOGIN_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: FETCH_LOGIN_ERROR, payload: e });
    }
  };
};



export const likeDislike = (body, roomId, type) => {
  return async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    try {
      const { data } = await axios.patch(
        backend_URL + `/rooms/${roomId}/${type}`,
        body
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: USER_UPDATE_ERROR, payload: e });
    }
  };
};

export const peoplelikeDislike = (body, userId, type) => {
  return async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    try {
      const { data } = await axios.patch(
        backend_URL + `/users/${userId}/${type}`,
        body
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: USER_UPDATE_ERROR, payload: e });
    }
  };
};

export const changeChar = (body, userId) => {
  return async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    try {
      const { data } = await axios.patch(
        backend_URL + `/users/${userId}`,
        body
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: USER_UPDATE_ERROR, payload: e });
    }
  };
};
