import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';
import { useDeleteRoadmap, useSaveRoadmap } from '../hooks/useRoadmap';
import { testRoadmapData } from '../__test__/fakeRoadmapData';
export const TestPage = () => {
  const login = useLogin();
  const register = useRegister();
  const [id, setId] = useState('string');
  const [password, setPw] = useState('string');
  const [nickname, setNickname] = useState('string');
  const [roadmapName, setRoadmapName] = useState('string');
  const [deleteId, setDeleteId] = useState('0');
  const saveRoadmap = useSaveRoadmap();
  const deleteRoadmap = useDeleteRoadmap();
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div>
          id :{' '}
          <input value={id} onChange={(e) => setId(e.target.value)} key="id" />
        </div>
        password :
        <input
          value={password}
          onChange={(e) => setPw(e.target.value)}
          key="pw"
        />
      </div>
      <div>
        nickname :
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          key="nk"
        />
      </div>
      <div>
        roadmapName :
        <input
          value={roadmapName}
          onChange={(e) => setRoadmapName(e.target.value)}
          key="nk"
        />
      </div>
      <div>
        deleteId :
        <input
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          key="nk"
        />
      </div>
      <div>
        <button
          onClick={() =>
            login.mutate(
              { id, password },
              {
                onSuccess: (d) => {
                  axios.defaults.headers.common['Authorization'] =
                    d?.data?.accessToken;
                },
              },
            )
          }
        >
          login
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            register.mutate(
              { id, password, nickname },
              {
                onSuccess: (d) => {
                  console.log(d);
                },
              },
            )
          }
        >
          register
        </button>
      </div>
      <div>
        <span>fakeRoadmapData</span>
        <div>{JSON.stringify(testRoadmapData())}</div>
      </div>
      <div>
        save roadmap :{' '}
        <button
          onClick={() =>
            saveRoadmap.mutate(
              {
                nodes: testRoadmapData().list,
                rootIdx: testRoadmapData().rootIdx,
                name: roadmapName,
              },
              {
                onSuccess: (d) => {
                  console.log(d);
                },
              },
            )
          }
        >
          save Roadmap
        </button>
      </div>
      <div>
        delete roadmap :{' '}
        <button
          onClick={() =>
            deleteRoadmap.mutate(
              {
                idx: +deleteId,
              },
              {
                onSuccess: (d) => {
                  console.log(d);
                  navigate('/make');
                },
              },
            )
          }
        >
          delete Roadmap
        </button>
      </div>
    </div>
  );
};
