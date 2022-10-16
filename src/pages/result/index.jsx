import React from 'react';
import RoadMap from '../../components/result/Roadmap';
import {
  Content,
  Header,
  HeaderLink,
  HeaderLinkWrapper,
  HeaderTitleMain,
  HeaderTitleSub,
  HeaderTitleWrapper,
  Wrapper,
} from './index.style';
import text from './text.json';
const Result = () => {
  return (
    <Wrapper>
      <Header>
        <HeaderTitleWrapper>
          <HeaderTitleMain>{text['header.title.main']}</HeaderTitleMain>
          <HeaderTitleSub>{text['header.title.sub']}</HeaderTitleSub>
        </HeaderTitleWrapper>
        <HeaderLinkWrapper>
          <HeaderLink>{text['header.link.text']}</HeaderLink>
        </HeaderLinkWrapper>
      </Header>
      <Content>
        <RoadMap />
      </Content>
    </Wrapper>
  );
};

export default Result;
