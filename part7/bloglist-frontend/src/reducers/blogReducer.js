import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'UPDATE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id);
    default:
      return state;
  }
};

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();

  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  });
};

export const createBlog = (newBlog) => async (dispatch) => {
  const data = await blogService.create(newBlog);

  dispatch({
    type: 'NEW_BLOG',
    data,
  });
};

export const updateBlog = (updatedBlog) => async (dispatch) => {
  const { user } = updatedBlog;

  // the updatedBlog object contains all the same entries as the blog blogSchema
  // but we need to remove the user from the object so that the PUT method works
  const newBlog = {};

  Object.keys(updatedBlog).forEach((key) => {
    if (key !== 'user') {
      newBlog[key] = updatedBlog[key];
    }
  });

  const data = await blogService.update(newBlog);

  // we add back the user info after the update

  data.user = user;

  dispatch({
    type: 'UPDATE_BLOG',
    data,
  });
};

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.remove(id);

  dispatch({
    type: 'REMOVE_BLOG',
    data: { id },
  });
};

export default blogReducer;
