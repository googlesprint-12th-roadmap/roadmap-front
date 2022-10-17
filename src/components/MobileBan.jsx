import React from 'react';
import styled from 'styled-components';

const MobileBan = () => {
  return (
    <Container>
      <TextWrapper>
        <Text>
          모바일 버전은 <br /> 아직 준비중입니다!
        </Text>
        <Logo>Roady.io</Logo>
      </TextWrapper>
    </Container>
  );
};

export default MobileBan;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: none;
  z-index: 999999;
  background-color: #ffa4c5;
  @media (max-width: 576px) {
    display: block;
  }
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const Text = styled.h1`
  font-size: 30px;
  font-weight: 600;
  line-height: 40px;
  color: white;
  text-align: center;
`;

const Logo = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 40px;
  color: white;
  text-align: center;
  text-shadow: 1px 1px 5px rgb(255, 255, 255, 0.6);
`;
