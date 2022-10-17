import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../utils/api';
import { Container, Title } from './index.styles';

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    nickname: '',
    password: '',
  });
  const navigation = useNavigate();

  const fetchRegister = async (userInfo) => {
    try {
      const response = await request('/api/v1/account/register', {
        id: userInfo.id,
        nickname: userInfo.nickname,
        password: userInfo.password,
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchRegister(userInfo);
      alert('회원가입이 완료되었습니다.');
      navigation('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <div>
        <Title>
          <span>Register</span>
        </Title>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="text"
            name="id"
            placeholder="아이디"
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={(e) => onChange(e)}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    </Container>
  );
};

export default Register;
