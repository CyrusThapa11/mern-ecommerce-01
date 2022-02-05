import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: 13px;
  font-weight: 500;
`;

const Anouncement = () => {
  return (
    <Container>
      <h2>Anouncement</h2>
      Super Deal ! Free shipping !
    </Container>
  );
};

export default Anouncement;
