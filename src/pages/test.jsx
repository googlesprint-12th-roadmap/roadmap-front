import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';

export const TestPage = () => {
  const login = useLogin();
  const register = useRegister();
  const [id, setId] = useState('string');
  const [password, setPw] = useState('string');
  const [nickname, setNickname] = useState('string');

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
              { id, password: pw },
              {
                onSuccess: (d) => {
                  console.log(d);
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
    </div>
  );
};
