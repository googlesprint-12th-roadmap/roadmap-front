import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useRegister = () => {
  return useMutation(register);
};

const register = ({ id, password, nickname }) =>
  axios.post(`/api/v1/account/login`, { id, password, nickname });
