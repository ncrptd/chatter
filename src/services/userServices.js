import axios from 'axios';

const getUserService = (userId) => axios.get(`/api/users/${userId}`);

const getAllUserService = () => axios.get('/api/users');

const getUserPostsService = (username) =>
  axios.get(`/api/posts/user/${username}`);

export { getUserService, getAllUserService, getUserPostsService };
