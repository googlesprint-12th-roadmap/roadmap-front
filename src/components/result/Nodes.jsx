import React from 'react';
import styled from 'styled-components';
import { NODE_TYPE, SUBTREE_DIRECTION } from './Roadmap';

const createGroup = (head, renderedNodes, subtreeDirection) => {
  renderedNodes[head.idx].subtreeDirection = subtreeDirection;
  return (
    head && (
      <Group className="group">
        {head?.children?.length > 0 && (
          <>
            <Subtree $direction={subtreeDirection}>
              {head.children
                .filter((node) => node.type === NODE_TYPE.SUB)
                .map((node) => (
                  <SubNode
                    key={node.idx}
                    ref={(element) => (renderedNodes[node.idx].ref = element)}
                  >
                    <SubNodeTitle>{node.title}</SubNodeTitle>
                  </SubNode>
                ))}
            </Subtree>
          </>
        )}
        <MainNode ref={(element) => (renderedNodes[head.idx].ref = element)}>
          <MainNodeTitle>{head.title}</MainNodeTitle>
        </MainNode>
      </Group>
    )
  );
};

const createLevel = (mainNodes, renderedNodes, depth) => {
  // console.log('rendering level, nodes:', mainNodes);
  if (mainNodes.length === 0 || !renderedNodes) return <></>;
  const groups = mainNodes.map((mainNode, index) =>
    createGroup(mainNode, renderedNodes, index > 0),
  );
  return (
    <>
      <Level> {groups}</Level>
      {createLevel(
        mainNodes.reduce(
          (prev, mainNode) => [
            ...prev,
            ...mainNode.children.filter(
              (child) => child.type === NODE_TYPE.MAIN,
            ),
          ],
          [],
        ),
        renderedNodes,
        depth + 1,
      )}
    </>
  );
};

const renderNodes = (head, renderedNodes) =>
  createLevel([head], renderedNodes, 0);

const Level = styled.div`
  display: flex;
  width: 100%;
  min-height: 200px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  * {
    color: white;
  }
`;
const Group = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  justify-content: center;
  align-items: center;
`;
const Subtree = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 120%;
  gap: 10px;
  padding: 20px;
  order: ${(props) =>
    props.$direction === SUBTREE_DIRECTION.LEFT ? '1' : '3'};
`;

const MainNode = styled.div`
  order: 2;
  width: 191px;
  height: 68px;
  padding: 10px;
  background: rgba(255, 0, 92, 0.6);
  box-shadow: 3px 6px 12px rgba(128, 13, 54, 0.42), inset 5px 4px 10px #ffe0eb,
    inset -10px -5px 20px #ff5391;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SubNode = styled.div`
  background: rgba(255, 99, 155, 0.6);
  box-shadow: 3px 6px 12px rgba(184, 42, 93, 0.42),
    inset 5px 4px 10px rgba(255, 225, 236, 1),
    inset -10px -5px 20px rgba(255, 133, 177, 1);
  padding: 10px;
  height: 46px;
  width: 129px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainNodeTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 29.05px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const SubNodeTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 24.2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default renderNodes;
