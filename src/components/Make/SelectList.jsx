import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import {
  depthState,
  emptyNodeCheckState,
  lastSelectIdState,
  nodeListState,
} from '../../atoms/makeListAtoms';
import SelectItem from './SelectItem';
import _ from 'lodash';
import { AddNodeButton, AddNodeForm, AddNodeWrap } from './make.styles';

const SelectList = ({ data, depth }) => {
  const [isShown, setIsShown] = useState(false);
  const [currentCheckId, setCurrentCheckId] = useState(-1);
  const [nodeList, setNodeList] = useRecoilState(nodeListState);
  const [depthList, setDepthList] = useRecoilState(depthState);
  const [emptyNode, setEmptyNode] = useRecoilState(emptyNodeCheckState);
  const [lastId, setLastId] = useRecoilState(lastSelectIdState);

  // 로빈
  const [editing, setEditing] = useState(false);
  const [newNodeText, setNewNodeText] = useState('');

  const addNodeInputRef = useRef(null);

  const handleClickSelectItem = useCallback(
    (id, index) => {
      const tempDepthList = _.cloneDeep(depthList);

      if (data[index].id === currentCheckId) {
        setCurrentCheckId(-1);
        setEmptyNode(false);
        setDepthList([...tempDepthList.slice(0, depth + 1)]);
        return;
      }
      setCurrentCheckId(id);

      if (data[index].children.length === 0) {
        setEmptyNode(true);
        setLastId(id);
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

  // 로빈
  const handleAddNode = (e) => {
    e.preventDefault();

    if (newNodeText.length === 0) {
      return alert('노드의 이름을 적어주세요!');
    }

    const newNode = {
      id: new Date().getTime(),
      url: '',
      desc: '',
      type: 'main',
      title: newNodeText,
      children: [],
      parent: data[0].parent,
    };

    setNewNodeText('');
    setEditing(false);
    setNodeList([
      ...nodeList.map((node) =>
        node.id === newNode.parent
          ? { ...node, children: [...node.children, newNode.id] }
          : node,
      ),
      newNode,
    ]);

    let tempDepthList = _.cloneDeep(depthList);

    tempDepthList[depth] = [...data, newNode];
    const depthIds = tempDepthList[depth].map((node) => node.id);
    const found = tempDepthList[depth - 1].map((node) =>
      node.id === data[0].parent ? { ...node, children: depthIds } : node,
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
                  key={item.id + item.title}
                  data={item}
                  check={currentCheckId === item.id}
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
                addNodeInputRef?.current?.focus();
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
