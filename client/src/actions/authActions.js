import axios from "axios";
import setAxiosAuthToken from "../utils/setAxiosAuthToken";
import { push } from "connected-react-router";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  AUTH_LOGIN_USER_SUCCESS
} from "./types";

// Sign In User
export const signInUser = (userData, redirectTo) => dispatch => {
  setAxiosAuthToken("");
  axios
    .post("/api/v1/users/auth/token/login", userData)
    .then(res => {
      const { auth_token } = res.data;
      localStorage.setItem("token", auth_token);
      setAxiosAuthToken(auth_token);
      dispatch(getCurrentUser(redirectTo));
    })
    .catch(err => {
      console.log("error", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = (user, organization, redirectTo) => dispatch => {
  console.log("setCurrentUser");

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("organization", JSON.stringify(organization));
  dispatch({
    type: SET_CURRENT_USER,
    payload: {
      user: user,
      organization: organization
    }
  });

  if (redirectTo !== "") {
    console.log("redirect");
    dispatch(push(redirectTo));
  }
};

export const getCurrentUser = redirectTo => dispatch => {
  console.log("getCurrentUser");
  axios
    .get("/api/v1/users/me/")
    .then(res => {
      console.log(res.data, "get");
      const user = {
        username: res.data["username"],
        email: res.data["email"]
      };
      console.log("user", user, res.data["organizations"][0], redirectTo);
      dispatch(setCurrentUser(user, res.data["organizations"][0], redirectTo));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const unsetCurrentUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("organization");
  return {
    type: UNSET_CURRENT_USER
  };
};

// Log user out
export const signOutUser = () => dispatch => {
  setAxiosAuthToken("");
  dispatch(unsetCurrentUser());
  dispatch(push("/login"));
};
