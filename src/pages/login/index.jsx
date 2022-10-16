import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import request from '../../utils/api';
import { Container, Title } from '../register/index.styles';

const Login = () => {
  const [userInfo, setUserInfo] = useState({ "id": "", "password": "" });
  const [logged, setLogged] = useState(null);

  const isLogged = () => {
    localStorage.getItem('token') ? setLogged(true) : setLogged(false);
  }

  useEffect(() => {
    isLogged();
  }, [])

  const onChange = (e) => {
    const { target: { name, value } } = e;
    setUserInfo({ ...userInfo, [name]: value })
}

  const fetchLogin = async (userInfo) => {
    try {
      const response = await request('/api/v1/account/login', 
      {
          "id": userInfo.id,
          "password": userInfo.password
      });
      return response;
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetchLogin(userInfo);
        console.log(response)
        localStorage.setItem("token", response?.accessToken);
        alert('로그인 되었습니다.')
        navigation('/')
    } catch (err) {
        console.log(err)
    }
  }

  return (
    <Container>
      <div>
        <Title>
          <span>Login</span>
        </Title>
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
          <input
            value="Login"
            type="submit"/>
        </form>
      </div>
    </Container>
  );
};

export default Login;