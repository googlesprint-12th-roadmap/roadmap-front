import React, { useState } from 'react';
import styled from 'styled-components';

const Login = () => {
  const [userInfo, setUserInfo] = useState({ "id": "", "password": "" });

  const onChange = (e) => {
    const { target: { name, value } } = e;
    setUserInfo({ ...userInfo, [name]: value })
}

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Container>
      <div>
        <span>Login</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder='아이디'
            onChange={(e) => onChange(e)}
            required />
          <input
            type="password"
            name="password"
            placeholder='비밀번호'
            onChange={(e) => onChange(e)}
          />
          <button
            type="submit">
            Login
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Login;

const Container = styled.section`
  width: 100%;
  text-align: center;

  div {
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  span {
    margin: 20px auto;
    text-align: left;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 0 auto;
  }

  input {
    border: 0;
    padding: 10px;
    border-bottom: 1px solid #FF639B;
  }
  
  input[type="password"] {
    margin-bottom: 20px;
  }
`
