import axios from 'axios';

const request = async (url, dataset) => {
  const res = await axios({
    method: 'post',
    url: `${url}`,
    data: dataset,
  });
  const result = res.data;
  return result;
};

export default request;
