import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { depthState, nodeListState } from '../../atoms/makeListAtoms';
import SelectItem from './SelectItem';
import _ from 'lodash';

const SelectList = ({ data, depth }) => {
  const [isShown, setIsShown] = useState(false);
  const [currentCheckId, setCurrentCheckId] = useState(-1);
  const [depthList, setDepthList] = useRecoilState(depthState);
  const [nodeList, setNodeList] = useRecoilState(nodeListState);

  const handleClickSelectItem = useCallback(
    (id, index) => {
      if (data[index].id === currentCheckId) {
        return;
      }
      setCurrentCheckId(id);

      const tempDepthList = _.cloneDeep(depthList);
      if (data[index].children.length === 0) {
        setDepthList([...tempDepthList.slice(0, depth + 1)]);
        return;
      }

      const tempCurrenDepth = [...data[index].children].map(
        (id) => nodeList.filter((item) => item.id === id)[0],
      );

      setDepthList(tempDepthList.slice(0, depth + 1).concat([tempCurrenDepth]));
    },
    [currentCheckId, depthList],
  );

  return (
    <Container
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      isShown={isShown}
    >
      <ul>
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <SelectItem
                key={item.id + item.title}
                data={item}
                check={currentCheckId === item.id}
                clickFunc={handleClickSelectItem}
                index={index}
              />
            );
          })}
      </ul>
    </Container>
  );
};

export default SelectList;

const Container = styled.div`
  min-width: 50rem;
  height: 43rem;
  overflow-y: scroll;

  padding-left: 1rem;
  padding-right: 0.5rem;

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  ${(props) =>
    props.isShown &&
    css`
      ::-webkit-scrollbar-thumb {
        background: #d9d9d9;
      }
    `}
`;
