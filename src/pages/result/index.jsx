import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  BackToEditButton,
} from './index.style';
import text from './text.json';
const Result = () => {
  const navigate = useNavigate();
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
          <BackToEditButton onClick={() => navigate('/make')}>
            계속 편집하기
          </BackToEditButton>
        </HeaderTitleWrapper>
        <HeaderLinkWrapper>
          <DeleteLinkContainer />
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
  const navigate = useNavigate();
  const deleteRoadMap = useDeleteRoadmap();
  const { roadmapId } = useParams();

  if (!data?.data || !roadmapId || !data?.data.canEdit) {
    return <></>;
  }

  return (
    <HeaderLink
      onClick={() =>
        deleteRoadMap.mutate(
          {
            idx: +roadmapId,
          },
          {
            onSuccess: () => {
              navigate('/make');
            },
          },
        )
      }
    >
      {text['header.link.delete']}
    </HeaderLink>
  );
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
