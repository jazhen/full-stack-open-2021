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

const update = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog);

  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig());

  return response.data;
};

const blogService = {
  getAll,
  create,
  update,
  remove,
};

export default blogService;
