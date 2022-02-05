import React from "react";
import styled from "styled-components";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import BottomNavigation from "@mui/material/BottomNavigation";
import RoomIcon from "@mui/icons-material/Room";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.h1`
  display: flex;
`;
const SocialIcon = styled.h1`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
// const Logo = styled.h1``;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Lama</Logo>
        <Desc>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum error
          nobis iure optio, temporibus sapiente saepe aut iusto modi adipisci?
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <FacebookOutlinedIcon />
          </SocialIcon>

          <SocialIcon color="E60023">
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>

      <Center>
        <Title>UseFul Links</Title>

        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Men Fashion</ListItem>
          <ListItem>Women Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>WishList</ListItem>
          <ListItem>Term & Condition</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          {" "}
          <RoomIcon style={{ marginRight: "10px" }} /> 731 Dixie Path , South
          Torontoo
        </ContactItem>
        <ContactItem>
          {" "}
          <LocalPhoneIcon style={{ marginRight: "10px" }} /> +2 123 83 02{" "}
        </ContactItem>
        <ContactItem>
          {" "}
          <MailOutlineOutlinedIcon style={{ marginRight: "10px" }} />{" "}
          contact@vismoke Sanji
        </ContactItem>

        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
