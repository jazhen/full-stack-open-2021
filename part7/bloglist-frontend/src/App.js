import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

// import blogService from './services/blogs';
import loginService from './services/login';
import storage from './utils/storage';

import { setNotification } from './reducers/notificationReducer';
import { createBlog, initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
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
      dispatch(createBlog(newBlog));

      blogFormRef.current.toggleVisibility();

      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          'success',
          5
        )
      );
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5));
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  if (!user) {
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
      <Blogs loggedInUser={user} />
    </div>
  );
};

export default App;
