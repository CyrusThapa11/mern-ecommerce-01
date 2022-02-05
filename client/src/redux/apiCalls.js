import { loginStart, loginFailure, loginSuccess } from "./userReducer";
import { pulicRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await pulicRequest.post("/auth/login", user);
    console.log("res.data --> ", res.data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
