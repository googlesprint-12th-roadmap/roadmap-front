import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import SelectItem from './SelectItem';

const SelectList = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <Container
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      isShown={isShown}
    >
      <ul>
        <SelectItem name={'HTTP'} check={true} />
        <SelectItem name={'JS'} />
        <SelectItem name={'TS'} />
        <SelectItem
          name={'Understand the concepts Hoisting, Evdsfsdfsdfdsfsd'}
        />
        <SelectItem name={'CSS'} />
        <SelectItem name={'CSS'} />
        <SelectItem name={'CSS'} />
        <SelectItem name={'CSS'} />
        <SelectItem name={'CSS'} />
        <SelectItem name={'CSS'} />
        <SelectItem name={'JS'} />
        <SelectItem name={'TS'} />
        <SelectItem
          name={'Understand the concepts Hoisting, Evdsfsdfsdfdsfsd'}
        />
        <SelectItem name={'CSS'} />
      </ul>
    </Container>
  );
};

export default SelectList;

const Container = styled.div`
  min-width: 50rem;
  height: 43rem;
  overflow-y: scroll;

  padding-left: 1rem;
  padding-right: 0.5rem;

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  ${(props) =>
    props.isShown &&
    css`
      ::-webkit-scrollbar-thumb {
        background: #d9d9d9;
      }
    `}
`;
