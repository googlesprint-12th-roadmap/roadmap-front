import React from 'react';
import { useParams } from 'react-router-dom';
import RoadMap from '../../components/result/Roadmap';
import { useDeleteRoadmap, useRoadMap } from '../../hooks/useRoadmap';
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
          <EditLinkContainer />
        </HeaderLinkWrapper>
      </Header>
      <Content>
        <RoadMap />
      </Content>
    </Wrapper>
  );
};

const DeleteLinkContainer = () => {
  const data = useRoadMap();
  const deleteRoadMap = useDeleteRoadmap();
  const { roadmapId } = useParams();

  if (!data?.data) {
    return <></>;
  }
  return <HeaderLink>{text['header.link.delete']}</HeaderLink>;
};
const EditLinkContainer = () => {
  const data = useRoadMap();
  console.log(data);
  if (data?.data?.canEdit) {
    return (
      <HeaderLink onClick={() => alert(text['header.link.commingSoon'])}>
        {text['header.link.edit']}
      </HeaderLink>
    );
  }
  return <></>;
};

export default Result;
