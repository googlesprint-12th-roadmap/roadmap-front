import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
} from 'react';
import styled from 'styled-components';
import { useRoadMap } from '../../hooks/useRoadmap';
import { getLinePositions, MemoizedLines as Lines } from './Lines';
import renderNodes from './Nodes';
import { createTree, getRenderedPositions } from './utils';

export const SUBTREE_DIRECTION = { LEFT: true, RIGHT: false };
export const NODE_TYPE = { MAIN: 'MAIN', SUB: 'SUB' };

export default function RoadMap() {
  const [tree, setTree] = useState();
  const [lines, setLines] = useState([]);
  const renderedNodes = useRef();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { data } = useRoadMap();

  const nodes = useMemo(
    () => renderNodes(tree, renderedNodes.current, 0),
    [tree, screenSize],
  );

  useEffect(() => {
    const onWindowResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  useLayoutEffect(() => {
    if (data && data.nodes) {
      console.log('data:', data);
      renderedNodes.current = data.nodes.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.idx]: {
            ref: null,
            offsetTop: 0,
            offsetLeft: 0,
          },
        }),
        {},
      );
      setTree(createTree(data.nodes, data.rootIdx));
    }
  }, [data]);

  useLayoutEffect(() => {
    tree &&
      renderedNodes.current &&
      getRenderedPositions(tree, renderedNodes.current);
  }, [tree, screenSize]);

  useLayoutEffect(() => {
    tree && setLines(getLinePositions(tree, renderedNodes.current));
  }, [tree, screenSize]);
  console.log('tree:', tree);
  return (
    <Container>
      <Canvas>
        <Lines lines={lines} />
        {nodes}
      </Canvas>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 800px;
`;
const Canvas = styled.div`
  position: relative;
  max-width: 1000px;
  min-width: 720px;
`;
