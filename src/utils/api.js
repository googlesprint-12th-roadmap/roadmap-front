import axios from 'axios';
const BASE_URL = "https://7c5a-219-255-199-146.jp.ngrok.io"

const request = async (url, dataset) => {
    const res = await axios({
        method: 'post',
        url: `${BASE_URL}${url}`,
        data: dataset,
    })
    const result = res.data;
    return result;
}

export default request;