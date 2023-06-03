import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/userReducer";

const Container = styled.div`
  height: 60px;
  /* background-color: black; */

  /* we can write media queries this way  */

  /* @media only screen and (max-width: 390px) {
  display: none;
  } */

  /* or eles : */

  /* import the function and write the style ! */
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 26px;
  padding: 5px;
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: 2 })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: " 10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cartttt.quantity);
  console.log("quantity", quantity);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const LogoutUser = async () => {
    dispatch(logoutUser());
    console.log("LogoutUser", LogoutUser);
  };

  return (
    <Container>
      <Wrapper>
        {/* Navbar */}
        <Left>
          {" "}
          <Language>EN</Language>{" "}
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "grey", fontSize: 15 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>Vinsmoke</Logo>
          </Link>
        </Center>
        <Right>
          {user && user.currentUser && user.currentUser.accessToken ? (
            <> </>
          ) : (
            <Link to="/register">
              <MenuItem>Register</MenuItem>
            </Link>
          )}
          {user && user.currentUser && user.currentUser.accessToken ? (
            <></>
          ) : (
            <Link to="/login">
              <MenuItem>Log in</MenuItem>
            </Link>
          )}
          {user && user.currentUser && user.currentUser.accessToken ? (
            <>
              <button onClick={LogoutUser}>LOGOUT</button>
            </>
          ) : (
            <></>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
