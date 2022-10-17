import React from 'react';
import styled from 'styled-components';

const Button = ({ text, onClick }) => {
  return <Container onClick={onClick}>{text}</Container>;
};

export default Button;

const Container = styled.button`
  padding: 5px 15px 5px 15px;
  margin-left: 5px;
  margin-right: 5px;
  border: none;
  border-radius: 10px;

  font-size: 16px;
  font-weight: 600;

  background-color: #ffa4c5;
  :hover {
    background-color: #ff639b;
  }
  color: white;
  cursor: pointer;
`;
