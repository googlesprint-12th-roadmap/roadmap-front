import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import {
  depthState,
  emptyNodeCheckState,
  lastSelectIdState,
  nodeListState,
} from '../../atoms/makeListAtoms';
import _ from 'lodash';
import { AddNodeButton, AddNodeForm, AddNodeWrap } from './Make.styles';

const EmptyList = () => {
  const [nodeList, setNodeList] = useRecoilState(nodeListState);
  const [depthList, setDepthList] = useRecoilState(depthState);
  const [emptyNode, setEmptyNode] = useRecoilState(emptyNodeCheckState);
  const [lastId, setLastId] = useRecoilState(lastSelectIdState);

  // 로빈
  const [editing, setEditing] = useState(false);
  const [newNodeText, setNewNodeText] = useState('');

  const addNodeInputRef = useRef(null);

  // 로빈
  const handleAddNode = (e) => {
    e.preventDefault();

    if (newNodeText.length === 0) {
      return alert('노드의 이름을 적어주세요!');
    }

    let newNode = {
      idx: new Date().getTime(),
      url: '',
      desc: '',
      type: 'MAIN',
      title: newNodeText,
      children: [],
      parent: lastId,
    };

    let tempDepthList = _.cloneDeep(depthList);

    if (nodeList.length === 0) {
      newNode = { ...newNode, parent: new Date().getTime() };
      tempDepthList = [[newNode]];
    } else {
      tempDepthList = [...tempDepthList, [newNode]];
    }

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

    if (tempDepthList.length > 1) {
      const depthIds = tempDepthList[tempDepthList.length - 1].map(
        (item) => item.idx,
      );

      const found = tempDepthList[tempDepthList.length - 2].map((node) =>
        node.idx === newNode.parent ? { ...node, children: depthIds } : node,
      );
      tempDepthList[tempDepthList.length - 2] = found;
    }

    setDepthList(tempDepthList);
    setEmptyNode(false);
  };

  return (
    <ListContainer>
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
    </ListContainer>
  );
};

export default EmptyList;

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

  ${AddNodeWrap} {
    margin-top: 0;
    margin-top: 0;
  }
`;
