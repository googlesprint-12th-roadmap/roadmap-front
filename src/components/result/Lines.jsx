import React from 'react';
import styled from 'styled-components';
import { NODE_TYPE, SUBTREE_DIRECTION } from './Roadmap';

const LINE_WIDTH = {
  main: 5,
  sub: 3,
};
export const getLinePositions = (head, renderedNodes) => {
  if (!head || head.children.length === 0) return null;
  const renderedHead = renderedNodes[head.id];
  const lines = head.children.map((child) =>
    child.type === NODE_TYPE.MAIN
      ? {
          type: child.type,
          startPos: renderedHead.midpointBottom,
          endPos: renderedNodes[child.id].midpointTop,
        }
      : child.type === NODE_TYPE.SUB &&
        renderedHead.subtreeDirection === SUBTREE_DIRECTION.LEFT
      ? {
          type: child.type,
          startPos: renderedHead.midpointLeft,
          endPos: renderedNodes[child.id].midpointRight,
        }
      : {
          type: child.type,
          startPos: renderedHead.midpointRight,
          endPos: renderedNodes[child.id].midpointLeft,
        },
  );
  return lines.concat(
    head.children.reduce((prev, child) => {
      const childLines = getLinePositions(child, renderedNodes);
      return childLines ? [...prev, ...childLines] : prev;
    }, []),
  );
};

const Line = ({ type, startPos, endPos }) => {
  return (
    <line
      x1={startPos.x}
      y1={startPos.y}
      x2={endPos.x}
      y2={endPos.y}
      stroke="rgba(255, 164, 197, 1)"
      strokeWidth={LINE_WIDTH[type] + 'px'}
    />
  );
};

const Lines = ({ lines }) => {
  return (
    <SVG>
      {lines &&
        lines.map((line, index) => (
          <Line
            key={index}
            type={line.type}
            startPos={line.startPos}
            endPos={line.endPos}
          />
        ))}
    </SVG>
  );
};
export const MemoizedLines = React.memo(Lines);

const SVG = styled.svg`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
