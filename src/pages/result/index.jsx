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
          <HeaderTitleMain>
            <span>{text['header.title.main']}</span>
          </HeaderTitleMain>
          <HeaderTitleSub>
            <span>{text['header.title.sub']}</span>
          </HeaderTitleSub>
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
