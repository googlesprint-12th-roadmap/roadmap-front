import React, { useState } from 'react';
import { AddNodeButton, AddNodeContainer, AddNodeForm, NodeList } from './index.styles';

const data = [{
    id: 'uuid1',
    url: '',
    desc: '',
    type: '',
    label: 'How does the internet work?',
    childeren: [],
    parent: []
},{
    id: 'uuid2',
    url: '',
    desc: '',
    type: '',
    label: 'What is hosting?',
    childeren: [],
    parent: []
},{
    id: 'uuid3',
    url: '',
    desc: '',
    type: '',
    label: 'What is HTTP?',
    childeren: [],
    parent: []
},
{
    id: 'uuid4',
    url: '',
    desc: '',
    type: '',
    label: 'Browsers and how they work?',
    childeren: [],
    parent: []
},
{
    id: 'uuid5',
    url: '',
    desc: '',
    type: '',
    label: 'DNS and how it works?',
    childeren: [],
    parent: []
}]

const Make = () => {
    const [nodeDatas, setNodeDatas] = useState(data);
    const [editing, setEditing] = useState(false);
    const [newNode, setNewNode] = useState('');
    const onAddNode = (e) => {
        e.preventDefault();
        const newNodeDatas = [...nodeDatas, {
            id: 'uuid6',
            url: '',
            desc: '',
            type: '',
            label: newNode,
            childeren: [],
            parent: []
        }];
        setNodeDatas(newNodeDatas);
        setNewNode('');
        setEditing(false);
    }

    return (
        <AddNodeContainer>
            <NodeList>
                {
                    nodeDatas.map(item => (
                        <li>
                            <img
                                width="11"
                                height="11"
                                src='/circle.svg'/>
                            <span>{item.label}</span> 
                            <span>{' >'}</span>
                        </li>
                    ))
                }
            </NodeList>
                {
                    editing ? (
                        <AddNodeForm>
                            <form onSubmit={(e) => onAddNode(e)}>
                                <input
                                    onChange={(e) => setNewNode(e.target.value)} 
                                    type="text"/>
                                <button
                                    type="submit">추가</button>
                            </form>
                            <button onClick={() => setEditing(false)}>취소</button>
                        </AddNodeForm>
                    ) : (
                        <AddNodeButton onClick={() => setEditing(true)}>
                            <p>+ 노드를 추가해주세요!</p>
                        </AddNodeButton>
                    )
                }
        </AddNodeContainer>
    );
};

export default Make;