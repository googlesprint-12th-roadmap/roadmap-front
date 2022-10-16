import axios from 'axios';
import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';
import { useSaveRoadmap } from '../hooks/useRoadmap';
import { testRoadmapData } from '../__test__/fakeRoadmapData';
export const TestPage = () => {
  const login = useLogin();
  const register = useRegister();
  const [id, setId] = useState('string');
  const [password, setPw] = useState('string');
  const [nickname, setNickname] = useState('string');
  const saveRoadmap = useSaveRoadmap();

  return (
    <div>
      <div>
        <input value={id} onChange={(e) => setId(e.target.value)} key="id" />
        <input
          value={password}
          onChange={(e) => setPw(e.target.value)}
          key="pw"
        />
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
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
                  axios.defaults.headers.post['Authorization'] = d?.accessToken;
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
              { roadMap: testRoadmapData() },
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
    </div>
  );
};
