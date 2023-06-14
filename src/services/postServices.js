import axios from 'axios';
import { getEncodedToken } from '../utils/encodedToken';

const getAllPostService = () => axios.get('/api/posts');

const likePostService = ({ _id }) => {
  const token = getEncodedToken();
  return axios.post(
    `/api/posts/like/${_id}`,
    {},
    {
      headers: { authorization: token },
    }
  );
};

export { getAllPostService, getEncodedToken, likePostService };
