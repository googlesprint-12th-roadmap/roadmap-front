import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useLogin = () => {
  return useMutation(login);
};

const login = ({ id, password }) =>
  axios.post(`/api/v1/account/login`, { id, password });
