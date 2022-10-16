import React from 'react';
import styled from 'styled-components';
import { NODE_TYPE, SUBTREE_DIRECTION } from './Roadmap';

export default function renderNodes(head, renderedNodes, depth) {
  // console.log('rendering nodes...', head, renderedNodes);
  if (!head || !renderedNodes) return;
  const subtreeDirection = !!(depth % 2);
  renderedNodes[head.id].subtreeDirection = subtreeDirection;
  return (
    head && (
      <>
        <Level>
          <Subtree direction={!subtreeDirection} />
          {head?.children?.length > 0 && (
            <Subtree direction={subtreeDirection}>
              {head.children
                .filter((node) => node.type === NODE_TYPE.SUB)
                .map((node) => (
                  <SubNode
                    key={node.id}
                    ref={(element) => (renderedNodes[node.id].ref = element)}
                  >
                    <SubNodeTitle>{node.label}</SubNodeTitle>
                  </SubNode>
                ))}
            </Subtree>
          )}
          <MainNode ref={(element) => (renderedNodes[head.id].ref = element)}>
            <MainNodeTitle>{head.label}</MainNodeTitle>
          </MainNode>
        </Level>
        {head?.children?.length > 0 &&
          renderNodes(
            head.children.find((node) => node.type === NODE_TYPE.MAIN),
            renderedNodes,
            depth + 1,
          )}
      </>
    )
  );
}

const Level = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  > * {
    color: white;
  }
`;
const Subtree = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 120%;
  gap: 10px;
  padding: 20px;
  order: ${(props) => (props.direction === SUBTREE_DIRECTION.LEFT ? '1' : '3')};
`;

const MainNode = styled.div`
  order: 2;
  width: 191px;
  height: 68px;
  padding: 10px;
  background: rgba(255, 0, 92, 0.42);
  box-shadow: 3px 6px 12px rgba(128, 13, 54, 0.42), inset 5px 4px 10px #ffe0eb,
    inset -10px -5px 20px #ff5391;
  border-radius: 30px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SubNode = styled.div`
  background: rgba(255, 99, 155, 0.42);
  box-shadow: 3px 6px 12px rgba(184, 42, 93, 0.42),
    inset 5px 4px 10px rgba(255, 225, 236, 1),
    inset -10px -5px 20px rgba(255, 133, 177, 1);
  border-radius: 30px;
  height: 46px;
  width: 129px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainNodeTitle = styled.div`
  font-size: 24px;
  line-height: 29.05px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const SubNodeTitle = styled.div`
  font-size: 20px;
  line-height: 24.2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
