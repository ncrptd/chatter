import axios from 'axios';
import { getEncodedToken } from '../utils/encodedToken';

const getAllPostService = () => axios.get('/api/posts');
const getUserPostService = (username) =>
  axios.get(`/api/posts/user/${username}`);
const likePostService = ({ _id }) => {
  const token = getEncodedToken();
  const body = {};
  const config = {
    headers: { authorization: token },
  };

  return axios.post(`/api/posts/like/${_id}`, body, config);
};

const dislikePostService = ({ _id }) => {
  const token = getEncodedToken();

  const body = {};
  const config = {
    headers: { authorization: token },
  };
  return axios.post(`/api/posts/dislike/${_id}`, body, config);
};

export {
  getAllPostService,
  getUserPostService,
  getEncodedToken,
  likePostService,
  dislikePostService,
};
