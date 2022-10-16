import React from 'react';
import styled from 'styled-components';
import { testRoadmapData } from '../../__test__/fakeRoadmapData';

const RoadmapContainer = () => {
  console.log(generateData());
  const nodes = drawGraph(generateData().list, [], 0);
  return <Wrapper>{nodes}</Wrapper>;
};

export default RoadmapContainer;

const getLevel = (data, map, rootId, level = 0) => {
  if (data?.id === rootId || data?.parent === null) return level;
  return getLevel(data?.parent, map, rootId, level + 1);
};

const processData = () => {
  const data = testRoadmapData();
  const willBeProcessed = data.list.map((d) => d);
  return React.useMemo(() => {
    const dataIdMap = Object.values(willBeProcessed).reduce(
      (final, current) => {
        final[current.id] = current;
        return final;
      },
      /**@type{{[key:number]: import('../../types.d').Node}}*/ ({}),
    );
    willBeProcessed.forEach((d) => {
      d.parent = d.parent ? dataIdMap[d.parent] : null;
      d.children = d.children.map((c) => dataIdMap[c]);
      d.mainChildrens = d.children.filter((c) => c.type === 'main');
      d.subChildrens = d.children.filter((c) => c.type === 'sub');
      d.level = getLevel(d, dataIdMap, data.rootId, 0);
    });
    return { ...data, list: willBeProcessed };
  }, [data]);
};
const generateData = (width) => {
  const data = processData();
  return data;
};

// level!
const drawGraph = (data, result = [], level = 0) => {
  const levels = data
    .filter((d) => d.level === level && d.type === 'main')
    .map((d, i) => drawMainNode(d, i));
  console.log(level, levels);
  if (!levels.length) return result;
  return drawGraph(
    data,
    [
      ...result,
      <LevelWrapper
        key={level + 'main'}
        data-testid={level + 'mainNodeWrapper'}
      >
        {levels}
      </LevelWrapper>,
    ],
    level + 1,
  );
};

const drawMainNode = (node, i) => {
  const MainNodeFragMent = (
    <MainNodeContentWrapper data-testid="MainNodeContentWrapper">
      <MainNodeContent data-testid="MainNodeContent">
        <MainNodeText>{node.desc}</MainNodeText>
      </MainNodeContent>
    </MainNodeContentWrapper>
  );
  if (!node.subChildrens.length) {
    return <MainNode key={node.id}>{MainNodeFragMent}</MainNode>;
  }
  return (
    <React.Fragment key={node.id}>
      <MainNode className="mainNpde">
        {i % 2 == 0 && (
          <SubNodeWrapper>
            {node.subChildrens.map((d) => (
              <SubNode>
                <SubNodeText>{d.desc}</SubNodeText>
              </SubNode>
            ))}
          </SubNodeWrapper>
        )}
        {MainNodeFragMent}
        {i % 2 == 1 && (
          <SubNodeWrapper>
            {node.subChildrens.map((d) => (
              <SubNode>{d.desc}</SubNode>
            ))}
          </SubNodeWrapper>
        )}
      </MainNode>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 1400px;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const MainNodeText = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #ffffff;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
`;

const MainNodeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 191px;
  min-height: 68px;
  max-height: 68px;
  background: rgb(255, 148, 187);
  box-shadow: 3px 6px 12px rgba(184, 42, 93, 0.42), inset 5px 4px 10px #ffe1ec,
    inset -10px -5px 20px #ff85b1;
  border-radius: 30px;
  height: 100%;
`;

const MainNodeContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
`;

const LevelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 200px;
  padding: 50px 0px; ;
`;

const MainNode = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
  height: 100%;
`;

const SubNode = styled.div`
  overflow: hidden;
  width: 129px;
  height: 46px;
  left: 610px;
  top: 279px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: rgba(255, 99, 155, 0.42);
  box-shadow: 3px 6px 12px rgba(184, 42, 93, 0.42), inset 5px 4px 10px #ffe1ec,
    inset -10px -5px 20px #ff85b1;
  border-radius: 30px;
`;

const SubNodeText = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #ffffff;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

const SubNodeWrapper = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 20px;
  height: 100%;
`;
