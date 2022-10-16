import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Line, { getLinePositions } from './Lines';
import renderNodes from './Nodes';
import { createTree } from './utils';

export const SUBTREE_DIRECTION = { LEFT: true, RIGHT: false };
export const NODE_TYPE = { MAIN: 'main', SUB: 'sub' };

const getRenderedPositions = (tree, renderedNodes) =>
  tree &&
  renderedNodes &&
  Object.keys(renderedNodes).forEach((id) => {
    const node = renderedNodes[id];
    node.offsetTop = node.ref.offsetTop;
    node.offsetLeft = node.ref.offsetLeft;
    node.midpointTop = {
      x: node.ref.offsetLeft + node.ref.clientWidth / 2,
      y: node.ref.offsetTop,
    };
    node.midpointBottom = {
      x: node.ref.offsetLeft + node.ref.clientWidth / 2,
      y: node.ref.offsetTop + node.ref.clientHeight,
    };
    node.midpointLeft = {
      x: node.ref.offsetLeft,
      y: node.ref.offsetTop + node.ref.clientHeight / 2,
    };
    node.midpointRight = {
      x: node.ref.offsetLeft + node.ref.clientWidth,
      y: node.ref.offsetTop + node.ref.clientHeight / 2,
    };
  });

export default function RoadMap() {
  const [tree, setTree] = useState();
  const [lines, setLines] = useState([]);
  const renderedNodes = useRef();
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const onWindowResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  useEffect(() => {
    fetch('./mock_data.json')
      .then((res) => res.json())
      .then((data) => {
        renderedNodes.current = data.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.id]: {
              ref: null,
              offsetTop: 0,
              offsetLeft: 0,
            },
          }),
          {},
        );
        setTree(createTree(data));
      });
  }, []);

  useEffect(() => {
    tree &&
      renderedNodes.current &&
      getRenderedPositions(tree, renderedNodes.current);
  }, [tree, screenSize]);

  useEffect(() => {
    tree && setLines(getLinePositions(tree, renderedNodes.current));
  }, [tree, screenSize]);

  return (
    <Container>
      <Canvas>
        {renderNodes(tree, renderedNodes.current, 0)}
        <SVG>
          {lines &&
            lines.map((line, index) => (
              <Line key={index} startPos={line.startPos} endPos={line.endPos} />
            ))}
        </SVG>
      </Canvas>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid black;
  width: 1000px;
  height: 800px;
`;
const Canvas = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
