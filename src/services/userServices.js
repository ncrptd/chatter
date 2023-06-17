import axios from 'axios';

const getAllUserService = () => axios.get('/api/users');

export { getAllUserService };
