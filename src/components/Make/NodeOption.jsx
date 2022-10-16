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
  const [currentType, setCurrentType] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentDesc, setCurrentDesc] = useState('');

  const [nodeList, setNodeList] = useRecoilState(nodeListState);
  const [depthList, setDepthList] = useRecoilState(depthState);
  const [currentSelectedId, setCurrentSelectedId] = useRecoilState(
    currentSelectedIdState,
  );

  useEffect(() => {
    if (currentSelectedId === -1) {
      setCurrentTitle('');
      setCurrentUrl('');
      setCurrentDesc('');
      setCurrentType('');
    } else {
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

  // 노드 옵션 수정 함수
  const handleNodeUpdate = () => {
    if (!currentTitle.length) {
      return alert('노드의 제목을 입력해주세요.');
    }
    if (currentSelectedId === -1) {
      return alert('노드를 선택해주세요.');
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

  // 선택한 노드 삭제 함수
  // 추후 더 간결한 코드로 수정 필요
  const handleNodeDelete = () => {
    if (currentSelectedId === -1) {
      return alert('노드를 선택해주세요.');
    }
    const SelectedNode = nodeList.find(
      (item) => item.idx === currentSelectedId,
    );
    if (SelectedNode.idx === SelectedNode.parent) {
      return alert('루트 노드는 삭제할 수 없습니다.');
    }

    // 연쇄적인 children을 계속 탐색하는 로직
    const toBeDeleted = [];
    let queue = [];
    queue.push(currentSelectedId);

    while (queue.length) {
      let currentId = queue.shift();
      let currentNode = nodeList.find((item) => item.idx === currentId);
      queue = [...queue, ...currentNode.children];
      toBeDeleted.push(currentId);
    }

    // 부모 노드의 children 배열 수정
    const parentId = SelectedNode.parent;

    const newNodeList = nodeList
      .filter((item) => !toBeDeleted.includes(item.idx))
      .map((x) => {
        if (x.idx === parentId) {
          const newChildren = x.children.filter((y) => y !== currentSelectedId);
          return { ...x, children: newChildren };
        }
        return x;
      });

    setNodeList(newNodeList);
    const newDepthList = depthList.map((item1) =>
      item1
        .filter((item2) => !toBeDeleted.includes(item2.idx))
        .map((x) => {
          if (x.idx === parentId) {
            const newChildren = x.children.filter(
              (y) => y !== currentSelectedId,
            );
            return { ...x, children: newChildren };
          }
          return x;
        }),
    );
    setDepthList(newDepthList);
  };

  // TODO
  // 로드맵 저장 기능
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
          <Button onClick={handleNodeDelete}>선택한 노드 삭제</Button>
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
