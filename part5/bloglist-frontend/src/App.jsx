import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';
import storage from './utils/storage';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

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

  const notifyWith = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await loginService.login({ username, password });

      setUser(loggedInUser);
      storage.saveUser(loggedInUser);
    } catch (exception) {
      notifyWith('wrong username or password', 'error');
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
      notifyWith(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        'success'
      );
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error');
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
      notifyWith(exception.response.data.error, 'error');
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error');
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
        <Notification notification={notification} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user.name} logged in
      <button type="button" onClick={handleLogout}>
        logout
      </button>
      {blogForm()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            loggedInUser={user}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
};

export default App;
