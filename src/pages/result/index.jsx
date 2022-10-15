import React from 'react';
import {
  Content,
  Header,
  HeaderButton,
  HeaderTitle,
  Wrapper,
} from './index.style';
import text from './text.json';
const Result = () => {
  return (
    <Wrapper>
      <Header>
        <HeaderTitle>{text['header.title']}</HeaderTitle>
        <HeaderButton>{text['header.button.share']}</HeaderButton>
      </Header>
      <Content>
        
      </Content>
    </Wrapper>
  );
};

export default Result;
