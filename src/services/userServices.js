import axios from 'axios';
import { getEncodedToken } from '../utils/encodedToken';
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

  return axios.post(`/api/users/edit`, body, config)
}

const followUserService = (followUserId) => {
  const encodedToken = getEncodedToken();
  const config = {
    headers: {
      authorization: encodedToken
    }
  }

  return axios.post(`/api/users/follow/${followUserId}`, {}, config)
}
const unFollowUserService = (followUserId) => {
  const encodedToken = getEncodedToken();
  const config = {
    headers: {
      authorization: encodedToken,

    }
  }

  return axios.post(`/api/users/unfollow/${followUserId}`, {}, config)
}


export { getUserService, getAllUserService, getUserPostsService, userEditService, followUserService, unFollowUserService };
