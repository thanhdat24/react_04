import Login from "../Login/Login";
import React from "react";
import Register from "../Register/Register";
import SlideDown from "../../HOC/Modal/SlideDown";
import { useDispatch } from "react-redux";

export default function DemoHOCModal() {
  // const LoginWithSlideDown = new SlideDown(Login);

  /* Sử dụng dưới dạng thẻ thì sử dụng function  */
  const LoginWithSlideDown = () => new SlideDown(Login);

  const dispatch = useDispatch();
  return (
    <div>
      {/* Button trigger modal */}
      <button
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <Login />,
          });
        }}
        type="button"
        className="btn btn-primary btn-lg mr-3"
        data-toggle="modal"
        data-target="#modelId"
      >
        Login
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <Register />,
          });
        }}
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        Register
      </button>
      {/* {LoginWithSlideDown} */}
      {/* Sử dụng dưới dạng thẻ thì sử dụng function  */}
      <LoginWithSlideDown />
    </div>
  );
}
