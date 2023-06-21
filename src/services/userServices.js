import axios from 'axios';
import { getEncodedToken } from './postServices';

const getUserService = (userId) => axios.get(`/api/users/${userId}`);

const getAllUserService = () => axios.get('/api/users');

const getUserPostsService = (username) =>
  axios.get(`/api/posts/user/${username}`);

  const userEditService = (userData) => {
    const encodedToken = getEncodedToken();

    const config = {
      headers: {
        authorization: encodedToken
      }
    };
    const body = {
      userData
    }

    return axios.post(`/api/users/edit`,body, config)
  }
export { getUserService, getAllUserService, getUserPostsService , userEditService};
