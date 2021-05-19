import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';
import storage from './utils/storage';

import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll();

      setBlogs(allBlogs);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedInUser = storage.loadUser();

    setUser(loggedInUser);
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await loginService.login({ username, password });

      setUser(loggedInUser);
      storage.saveUser(loggedInUser);
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5));
    }
  };

  const handleLogout = () => {
    storage.logoutUser();
    setUser(null);
  };

  const addBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);

      blogFormRef.current.toggleVisibility();

      setBlogs(blogs.concat(createdBlog));

      dispatch(
        setNotification(
          `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
          'success',
          5
        )
      );
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5));
    }
  };

  const updateBlog = async (blogToUpdate) => {
    try {
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
        user: blogToUpdate.user.id,
      };

      await blogService.update(blogToUpdate.id, updatedBlog);

      setBlogs(
        blogs.map((blog) =>
          blog.id === updatedBlog.id
            ? {
                ...updatedBlog,
                likes: updatedBlog.likes,
                user: blogToUpdate.user,
              }
            : blog
        )
      );
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5));
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5));
    }

    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} logged in
      <button type="button" onClick={handleLogout}>
        logout
      </button>
      {blogForm()}
      <Blogs
        blogs={blogs}
        loggedInUser={user}
        updateBlog={updateBlog}
        removeBlog={removeBlog}
      />
    </div>
  );
};

export default App;
