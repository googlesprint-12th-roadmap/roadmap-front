import React from 'react';
import styled from 'styled-components';
import { NODE_TYPE, SUBTREE_DIRECTION } from './Roadmap';

const LINE_WIDTH = {
  MAIN: 5,
  SUB: 3,
};
export const getLinePositions = (head, renderedNodes) => {
  if (!head || head.children.length === 0) return null;
  const renderedHead = renderedNodes[head.idx];
  const lines = head.children.map((child) =>
    renderedHead.ref
      ? child.type === NODE_TYPE.MAIN
        ? {
            type: child.type,
            startPos: renderedHead.midpointBottom,
            endPos: renderedNodes[child.idx].midpointTop,
          }
        : child.type === NODE_TYPE.SUB &&
          renderedHead.subtreeDirection === SUBTREE_DIRECTION.LEFT
        ? {
            type: child.type,
            startPos: renderedHead.midpointLeft,
            endPos: renderedNodes[child.idx].midpointRight,
          }
        : {
            type: child.type,
            startPos: renderedHead.midpointRight,
            endPos: renderedNodes[child.idx].midpointLeft,
          }
      : null,
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
        lines.map(
          (line, index) =>
            line.type &&
            line.startPos &&
            line.endPos && (
              <Line
                key={index}
                type={line.type}
                startPos={line.startPos}
                endPos={line.endPos}
              />
            ),
        )}
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
