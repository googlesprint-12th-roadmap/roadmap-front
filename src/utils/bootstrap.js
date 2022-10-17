import axios from 'axios';

export const bootstrap = () => {
  axios.defaults.baseURL = 'https://047a-219-255-199-146.jp.ngrok.io';
};
