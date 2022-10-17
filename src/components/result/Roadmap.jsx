import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { nodeListState } from '../../atoms/makeListAtoms';
import { useRoadMap } from '../../hooks/useRoadmap';
import { getLinePositions, MemoizedLines as Lines } from './Lines';
import renderNodes from './Nodes';
import { createTree, getRenderedPositions, initializeNodeRefs } from './utils';

export const SUBTREE_DIRECTION = { LEFT: true, RIGHT: false };
export const NODE_TYPE = { MAIN: 'MAIN', SUB: 'SUB' };

export default function RoadMap() {
  const [tree, setTree] = useState();
  const [lines, setLines] = useState([]);
  const renderedNodes = useRef();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { data } = useRoadMap();
  const nodesFromEditing = useRecoilValue(nodeListState);
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
      renderedNodes.current = initializeNodeRefs(data.nodes);
      setTree(createTree(data.nodes, data.rootIdx));
    } else if (nodesFromEditing.length > 0) {
      renderedNodes.current = initializeNodeRefs(nodesFromEditing);
      console.log('renderedNodes:', renderedNodes);
      setTree(createTree(nodesFromEditing, nodesFromEditing[0].idx));
    } else
      fetch('/mock_data.json')
        .then((res) => res.json())
        .then((data) => {
          renderedNodes.current = initializeNodeRefs(data);
          console.log('renderedNodes:', renderedNodes);
          setTree(createTree(data, 0));
        });
  }, [data]);

  useLayoutEffect(() => {
    tree &&
      renderedNodes.current &&
      getRenderedPositions(tree, renderedNodes.current);
  }, [tree, screenSize]);

  useLayoutEffect(() => {
    tree && setLines(getLinePositions(tree, renderedNodes.current));
  }, [tree, screenSize]);
  console.log(
    'data from query',
    data,
    'from editing:',
    nodesFromEditing,
    'tree:',
    tree,
  );

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
