import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import {
  currentSelectViewState,
  depthState,
  emptyNodeCheckState,
  lastSelectIdState,
  nodeListState,
  currentSelectedIdState,
} from '../../atoms/makeListAtoms';
import SelectItem from './SelectItem';
import _ from 'lodash';
import { AddNodeButton, AddNodeForm, AddNodeWrap } from './Make.styles';

const SelectList = ({ data, depth }) => {
  const [isShown, setIsShown] = useState(false);
  // recoil 전역 상태로 변경
  const [currentCheckId, setCurrentCheckId] = useRecoilState(
    currentSelectedIdState,
  );
  const [nodeList, setNodeList] = useRecoilState(nodeListState);
  const [depthList, setDepthList] = useRecoilState(depthState);
  const [emptyNode, setEmptyNode] = useRecoilState(emptyNodeCheckState);

  const [currentSelect, setCurrentSelect] = useRecoilState(
    currentSelectViewState,
  );
  const [lastId, setLastId] = useRecoilState(lastSelectIdState);

  // 로빈
  const [editing, setEditing] = useState(false);
  const [newNodeText, setNewNodeText] = useState('');

  const addNodeInputRef = useRef(null);

  const handleClickSelectItem = useCallback(
    (idx, index) => {
      const tempDepthList = _.cloneDeep(depthList);
      setCurrentSelect(depth);

      if (data[index].idx === currentCheckId) {
        setCurrentCheckId(-1);
        setEmptyNode(false);
        setDepthList([...tempDepthList.slice(0, depth + 1)]);
        return;
      }
      setCurrentCheckId(idx);

      if (data[index].children.length === 0) {
        setEmptyNode(true);
        setLastId(idx);
        setDepthList([...tempDepthList.slice(0, depth + 1)]);
        return;
      }

      const tempCurrenDepth = [...data[index].children].map(
        (idx) => nodeList.filter((item) => item.idx === idx)[0],
      );
      setEmptyNode(false);

      setDepthList(tempDepthList.slice(0, depth + 1).concat([tempCurrenDepth]));
    },
    [currentCheckId, depthList],
  );

  // 로빈
  const handleAddNode = (e) => {
    e.preventDefault();

    if (newNodeText.length === 0) {
      return alert('노드의 이름을 적어주세요!');
    }

    const newNode = {
      idx: new Date().getTime(),
      url: '',
      desc: '',
      type: 'MAIN',
      title: newNodeText,
      children: [],
      parent: data[0].parent,
    };

    setNewNodeText('');
    setEditing(false);
    setNodeList([
      ...nodeList.map((node) =>
        node.idx === newNode.parent
          ? { ...node, children: [...node.children, newNode.idx] }
          : node,
      ),
      newNode,
    ]);
    console.log(newNode);

    let tempDepthList = _.cloneDeep(depthList);

    tempDepthList[depth] = [...data, newNode];
    const depthIds = tempDepthList[depth].map((node) => node.idx);
    const found = tempDepthList[depth - 1].map((node) =>
      node.idx === data[0].parent ? { ...node, children: depthIds } : node,
    );
    tempDepthList[depth - 1] = found;

    setDepthList(tempDepthList);
  };

  return (
    <Container>
      <ListContainer
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
                  key={item.idx + item.title}
                  data={item}
                  check={currentCheckId === item.idx}
                  clickFunc={handleClickSelectItem}
                  index={index}
                />
              );
            })}
        </ul>
      </ListContainer>
      {depth > 0 && (
        <AddNodeWrap>
          {editing ? (
            <AddNodeForm>
              <form onSubmit={handleAddNode}>
                <input
                  onChange={(e) => setNewNodeText(e.target.value)}
                  type="text"
                  value={newNodeText}
                  ref={addNodeInputRef}
                />
                <button type="submit">추가</button>
              </form>
              <button
                onClick={() => {
                  setEditing(false);
                  setNewNodeText('');
                }}
              >
                취소
              </button>
            </AddNodeForm>
          ) : (
            <AddNodeButton
              onClick={() => {
                setEditing(true);
                setTimeout(() => {
                  addNodeInputRef?.current?.focus();
                }, 100);
              }}
            >
              <div></div>
              <p>노드를 추가해주세요!</p>
            </AddNodeButton>
          )}
        </AddNodeWrap>
      )}
    </Container>
  );
};

export default SelectList;

const Container = styled.div`
  padding-left: 1rem;
  padding-right: 0.5rem;

  padding-bottom: 1rem;
`;

const ListContainer = styled.div`
  min-width: 50rem;
  height: 35rem;
  overflow-y: scroll;

  padding-left: 1rem;
  padding-right: 0.5rem;
  padding-top: 1rem;

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
