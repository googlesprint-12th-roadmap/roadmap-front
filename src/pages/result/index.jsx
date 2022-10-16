import React from 'react';
import {
  Content,
  Header,
  HeaderButton,
  HeaderTitle,
  Wrapper,
} from './index.style';
import { useRoadmapContainerContext } from './ResultContext';
import text from './text.json';
const Result = () => {
  const { RoadmapContainer } = useRoadmapContainerContext();
  return (
    <Wrapper>
      <Header>
        <HeaderTitle>{text['header.title.rightLabel']}</HeaderTitle>
        <HeaderButton>{text['header.button.share']}</HeaderButton>
      </Header>
      <Content>
        <RoadmapContainer />
      </Content>
    </Wrapper>
  );
};

export default Result;
