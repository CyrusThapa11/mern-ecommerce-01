import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: coral;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  /* background-color: teal; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  /* transform: translateX(-200vw); */
  transition: transform 1.5s ease;
  transform: translateX(${(props) => props.si * -100}vw);
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #${(props) => props.bg};
`;
const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 60px;
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIosOutlinedIcon />
      </Arrow>
      <Wrapper si={slideIndex}>
        {sliderItems.map((item) => {
          return (
            <Slide bg={item.bg} key={item.id}>
              <ImageContainer>
                <Image
                  src="https://images.pexels.com/photos/1676102/pexels-photo-1676102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  //   img={item.img}
                />
              </ImageContainer>
              <InfoContainer>
                <Title> {item.title} </Title>
                <Desc>{item.desc}</Desc>
                <Button>SHOW NOW</Button>
              </InfoContainer>
            </Slide>
          );
        })}

        {/* <Slide bg="fcf1ed">
          <ImageContainer>
            <Image src="https://images.pexels.com/photos/1676102/pexels-photo-1676102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          </ImageContainer>
          <InfoContainer>
            <Title>Popular SALE</Title>
            <Desc>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatum pariatur suscipit blanditiis repellat, cumque sunt?
            </Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="fbf0f4">
          <ImageContainer>
            <Image src="https://images.pexels.com/photos/1676102/pexels-photo-1676102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          </ImageContainer>
          <InfoContainer>
            <Title>Winter SALE</Title>
            <Desc>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatum pariatur suscipit blanditiis repellat, cumque sunt?
            </Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide> */}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIosOutlinedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
