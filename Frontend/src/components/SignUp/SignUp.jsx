import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { registerUser } from "../../Actions/User";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passowrd, setPassoword] = useState("");

  const alert = useAlert();

  const { error, user, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, passowrd));
    console.log(user);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, dispatch]);

  return (
    <div className="singnup-container">
      <center>
        <h3>SignUp Form</h3>
      </center>
      <form onSubmit={handleSubmit}>
        {" "}
        <div class="mb-3">
          <label for="ControlInput1" class="form-label">
            Enter Name
          </label>
          <input
            type="text"
            class="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="ControlInput1"
            placeholder="Enter Your Name"
          />
        </div>
        <div class="mb-3">
          <label for="ControlInput2" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="ControlInput2"
            placeholder="Enter Your Email"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">
            password
          </label>
          <input
            type="password"
            value={passowrd}
            onChange={(e) => setPassoword(e.target.value)}
            class="form-control"
            id="password"
            placeholder="enter your Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          SignUp
        </button>
      </form>
      <br />
      <Link to="/login">
        <Typography> Already Have an Account? </Typography>
      </Link>
    </div>
  );
};

export default SignUp;
