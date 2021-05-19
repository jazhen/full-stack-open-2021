import axios from 'axios';
import storage from '../utils/storage';

const baseUrl = '/api/blogs';

const getConfig = () => ({
  headers: { Authorization: `bearer ${storage.loadUser().token}` },
});

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, getConfig());

  return response.data;
};

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog);

  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());

  return response.data;
};

export default { getAll, create, update, remove };
