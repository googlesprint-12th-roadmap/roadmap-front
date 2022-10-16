import React from 'react';
import { NODE_TYPE, SUBTREE_DIRECTION } from './Roadmap';

export const getLinePositions = (head, renderedNodes) => {
  if (!head || head.children.length === 0) return null;
  const renderedHead = renderedNodes[head.id];
  const lines = head.children.map((child) =>
    child.type === NODE_TYPE.MAIN
      ? {
          startPos: renderedHead.midpointBottom,
          endPos: renderedNodes[child.id].midpointTop,
        }
      : child.type === NODE_TYPE.SUB &&
        renderedHead.subtreeDirection === SUBTREE_DIRECTION.LEFT
      ? {
          startPos: renderedHead.midpointLeft,
          endPos: renderedNodes[child.id].midpointRight,
        }
      : {
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

export default function Line({ startPos, endPos }) {
  return (
    <line
      x1={startPos.x}
      y1={startPos.y}
      x2={endPos.x}
      y2={endPos.y}
      stroke="black"
    />
  );
}
