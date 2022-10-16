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
`;
const MainNode = styled.div``;
const SubNode = styled.div``;
const Subtree = styled.div`
  order: ${(props) => (props.direction === SUBTREE_DIRECTION.LEFT ? '0' : '2')};
`;
