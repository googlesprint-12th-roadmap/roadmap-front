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
          {head?.children?.length > 0 && (
            <Subtree direction={subtreeDirection}>
              {head.children
                .filter((node) => node.type === NODE_TYPE.SUB)
                .map((node) => (
                  <SubNode
                    key={node.id}
                    ref={(element) => (renderedNodes[node.id].ref = element)}
                  >
                    {node.label}
                  </SubNode>
                ))}
            </Subtree>
          )}
          <MainNode ref={(element) => (renderedNodes[head.id].ref = element)}>
            {head.label}
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
  height: 200px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  * {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    box-sizing: border-box;
  }
  > * {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const MainNode = styled.div`
  width: 191px;
  height: 68px;
  padding: 100px;
  background: rgba(255, 0, 92, 0.42);
  box-shadow: 3px 6px 12px rgba(128, 13, 54, 0.42), inset 5px 4px 10px #ffe0eb,
    inset -10px -5px 20px #ff5391;
  border-radius: 30px;
`;
const SubNode = styled.div`
  background: rgba(255, 99, 155, 0.42);
  box-shadow: 3px 6px 12px rgba(184, 42, 93, 0.42), inset 5px 4px 10px #ffe1ec,
    inset -10px -5px 20px #ff85b1;
  border-radius: 30px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;
const Subtree = styled.div`
  order: ${(props) => (props.direction === SUBTREE_DIRECTION.LEFT ? '0' : '2')};
`;
