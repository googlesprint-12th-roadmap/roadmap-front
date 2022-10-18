import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { nodeListState } from '../../atoms/makeListAtoms';
import RoadMap from '../../components/result/Roadmap';
import { useDeleteRoadmap, useRoadMap } from '../../hooks/useRoadmap';
import {
  BackToEditButton,
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
  const navigate = useNavigate();
  const { roadmapId } = useParams();
  const nodesFromEditing = useRecoilValue(nodeListState);

  return (
    <Wrapper>
      <Header>
        <HeaderTitleWrapper>
          <HeaderTitleContainer />
          <HeaderTitleSub>
            <span>{text['header.title.sub']}</span>
          </HeaderTitleSub>
          {!roadmapId && nodesFromEditing.length > 0 && (
            <BackToEditButton onClick={() => navigate('/make')}>
              계속 편집하기
            </BackToEditButton>
          )}
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

const HeaderTitleContainer = () => {
  const data = useRoadMap();
  return (
    <HeaderTitleMain>
      <span>{data?.data?.name ?? text['header.title.main']}</span>
    </HeaderTitleMain>
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
