import axios from 'axios';

const getAllPostService = () => axios.get('/api/posts');

export { getAllPostService };
