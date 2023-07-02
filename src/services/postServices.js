import axios from 'axios';
import { getEncodedToken } from '../utils/encodedToken';

const getAllPostService = () => axios.get('/api/posts');

const getUserPostService = (username) =>
  axios.get(`/api/posts/user/${username}`);

const addPostService = (content, postPic, userDetails) => {
  const encodedToken = getEncodedToken();
  const config = {
    headers: { authorization: encodedToken },
  };
  const body = {
    postData: {
      content,
      userId: userDetails?._id,
      postPic
    },
  };
  return axios.post('/api/posts', body, config)
}
const likePostService = ({ _id }) => {
  const encodedToken = getEncodedToken();
  const body = {};
  const config = {
    headers: { authorization: encodedToken },
  };

  return axios.post(`/api/posts/like/${_id}`, body, config);
};

const dislikePostService = ({ _id }) => {
  const encodedToken = getEncodedToken();

  const body = {};
  const config = {
    headers: { authorization: encodedToken },
  };
  return axios.post(`/api/posts/dislike/${_id}`, body, config);
};

export {
  getAllPostService,
  getUserPostService,
  addPostService,
  likePostService,
  dislikePostService,
};
