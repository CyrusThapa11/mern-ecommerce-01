import React, { useState } from "react";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userReducer";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.2)
    ),
    url(https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940);

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 8px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [User, setUser] = useState(null);
  const dispatch = useDispatch();
  // const { isFetching, error } = useSelector((state) => state);
  const navigate = useNavigate();
  const UserRegister = async (e) => {
    console.log("UserRegister");
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://project-1-3a6s.onrender.com/auth/register",
        User
      );
      console.log("response - ", response);
      dispatch(registerUser(response.data));
      console.log(" navigating ! ");
      navigate("/");

      // setProducts(respo.data);
    } catch (err) {
      console.log("ERROR1 - ", err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <Form>
          <Input
            onChange={(e) =>
              setUser({ ...User, [e.target.name]: e.target.value })
            }
            name="Firstname"
            placeholder="First Name"
          />
          <Input
            onChange={(e) =>
              setUser({ ...User, [e.target.name]: e.target.value })
            }
            name="Lastname"
            placeholder="Last Name"
          />
          <Input
            onChange={(e) =>
              setUser({ ...User, [e.target.name]: e.target.value })
            }
            name="username"
            placeholder="Username"
          />
          <Input
            onChange={(e) =>
              setUser({ ...User, [e.target.name]: e.target.value })
            }
            name="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) =>
              setUser({ ...User, [e.target.name]: e.target.value })
            }
            name="password"
            placeholder="Password"
          />
          <Input
            onChange={(e) =>
              setUser({ ...User, [e.target.name]: e.target.value })
            }
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <Agreement>
            By creating an account , I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={UserRegister}>Create</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
