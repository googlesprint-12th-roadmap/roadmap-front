import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  depthState,
  nodeListState,
  currentSelectedIdState,
} from '../../atoms/makeListAtoms';

const NodeOption = () => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentType, setCurrentType] = useState('MAIN');
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentDesc, setCurrentDesc] = useState('');

  const [nodeList, setNodeList] = useRecoilState(nodeListState);
  const [depthList, setDepthList] = useRecoilState(depthState);
  const [currentSelectedId, setCurrentSelectedId] = useRecoilState(
    currentSelectedIdState,
  );

  useEffect(() => {
    if (currentSelectedId !== -1) {
      const currentNode = nodeList.find(
        (item) => item.idx === currentSelectedId,
      );
      if (currentNode) {
        setCurrentTitle(currentNode.title);
        setCurrentUrl(currentNode.url);
        setCurrentDesc(currentNode.desc);
        setCurrentType(currentNode.type);
      }
    }
  }, [currentSelectedId]);

  const handleNodeUpdate = () => {
    if (!currentTitle.length) {
      alert('노드의 제목을 입력해주세요.');
      return;
    }
    const newNodeList = nodeList.map((item) => {
      if (item.idx === currentSelectedId) {
        return {
          ...item,
          title: currentTitle,
          desc: currentDesc,
          url: currentUrl,
          type: currentType,
        };
      }
      return item;
    });
    setNodeList(newNodeList);

    const newDepthList = depthList.map((item1) => {
      return item1.map((item2) => {
        if (item2.idx === currentSelectedId) {
          return {
            ...item2,
            title: currentTitle,
            desc: currentDesc,
            url: currentUrl,
            type: currentType,
          };
        }
        return item2;
      });
    });
    setDepthList(newDepthList);
  };

  const handleNodeDelete = () => {};

  const handleRodeMapSubmit = () => {};

  return (
    <Container>
      <EditNode>
        <Title>
          Edit Node
          <Button onClick={handleNodeUpdate}>변경 내용 저장</Button>
        </Title>
        <ContentWrapper>
          <Content>
            <ContentName>제목</ContentName>
            <ContentInput
              placeholder="제목을 입력해주세요"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
            ></ContentInput>
            <Button
              isSelected={currentType === 'MAIN'}
              onClick={() => setCurrentType('MAIN')}
            >
              메인
            </Button>
            <Button
              isSelected={currentType === 'SUB'}
              onClick={() => setCurrentType('SUB')}
            >
              서브
            </Button>
          </Content>
          <Content>
            <ContentName>관련 URL</ContentName>
            <ContentInput
              placeholder="URL을 입력해주세요"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
            ></ContentInput>
          </Content>
          <Content>
            <ContentName>설명</ContentName>
            <ContentInput
              placeholder="해당 내용에 대해 자세한 설명을 입력해주세요."
              value={currentDesc}
              onChange={(e) => setCurrentDesc(e.target.value)}
            ></ContentInput>
          </Content>
        </ContentWrapper>
      </EditNode>
      <Options>
        <Title>Options</Title>
        <ContentWrapper>
          <Button>선택한 노드 삭제</Button>
          <Button>미리보기</Button>
          <Button>로드맵 저장</Button>
        </ContentWrapper>
      </Options>
    </Container>
  );
};

export default NodeOption;

const Container = styled.section`
  display: flex;

  margin-right: 5rem;
  justify-content: space-between;
`;
const EditNode = styled.div`
  width: 40%;
`;

const Options = styled.div`
  width: 40%;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2.4rem;
  font-weight: 700;

  padding-bottom: 1rem;
  border-bottom: 1px solid #000;
`;

const ContentWrapper = styled.div`
  margin-top: 3rem;
`;
const Content = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
  align-items: center;
`;
const ContentName = styled.div`
  min-width: 10rem;
  font-size: 2.4rem;
  font-weight: 400;
`;
const ContentInput = styled.input`
  min-height: 35px;
  max-width: 60rem;
  flex-grow: 1;
  padding: 0 1rem 0 1rem;

  border: none;
  border-radius: 10px;

  background-color: #efefef;
`;

const Button = styled.button`
  padding: 5px 15px 5px 15px;
  margin-left: 5px;
  margin-right: 5px;
  border: none;
  border-radius: 10px;

  font-size: 16px;
  font-weight: 600;

  background-color: ${(props) => (props.isSelected ? '#ff639b' : '#ffa4c5')};
  :hover {
    background-color: #ff639b;
  }
  color: white;
  cursor: pointer;
`;
