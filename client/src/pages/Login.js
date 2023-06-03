import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile, tablet } from "../responsive";
import axios from "axios";
import { registerUser } from "../redux/userReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleclick = async (e) => {
    try {
      e.preventDefault();
      console.log("sending !!");
      // login(dispatch, { username, password });

      const response = await axios.post(
        "https://project-1-3a6s.onrender.com/auth/login",
        {
          username,
          password,
        }
      );
      console.log("response in login - ", response);
      dispatch(registerUser(response.data));
      console.log(" navigating ! ");
      navigate("/");
      // console.log("res.data --> ", res.data);
      // dispatch(loginSuccess(res.data));
    } catch (err) {
      // dispatch(loginFailure());
      console.log(" error in login is ", err);
    }

    console.log("sent !! ");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input
            placeholder="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleclick} disabled={isFetching}>
            Login
          </Button>

          {error && <Error>Something went wrong</Error>}
          <Link>Forgot Password</Link>
          <Link>Create a new account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.2)
    ),
    url(https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 35%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  ${tablet({ width: "60%" })}
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 8px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 10px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;
