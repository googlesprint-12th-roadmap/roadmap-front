import React from 'react';
import styled, { css } from 'styled-components';

const SelectItem = ({ data, clickFunc, check, index }) => {
  return (
    <Container check={check} onClick={() => clickFunc(data.idx, index)}>
      <Marked></Marked>
      <Name>{data.title}</Name>
    </Container>
  );
};

export default SelectItem;

const Container = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;

  border-radius: 1rem;
  background-color: #fff;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    background-color: #efefef;
  }

  ${(props) =>
    props.check &&
    css`
      background-color: #efefef;
      font-weight: 700;
      ::before {
        content: '';
        position: absolute;
        top: 1.2rem;
        right: 1.4rem;
        background-image: url('/images/Subtract.png');
        width: 1.6rem;
        height: 1.6rem;
      }
    `}
`;

const Marked = styled.div`
  min-width: 1.5rem;
  min-height: 1.5rem;
  background-color: #ffa4c5;
  border-radius: 50%;
  margin-right: 1.4rem;
`;

const RotateCheckMarked = styled.div``;

const Name = styled.span`
  font-size: 2.4rem;
  line-height: 2.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
