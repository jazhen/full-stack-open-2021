import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

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
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser');

    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON);

      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const notifyWith = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.create(newBlog);
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
        user: blogToUpdate.user.id,
        author: blogToUpdate.author,
        title: blogToUpdate.title,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1,
      };
      const returnedBlog = await blogService.update(
        blogToUpdate.id,
        updatedBlog
      );
      setBlogs(
        blogs.map((blog) => (blog.id !== blogToUpdate.id ? blog : returnedBlog))
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

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedInBlogAppUser',
        JSON.stringify(loggedInUser)
      );
      blogService.setToken(loggedInUser.token);

      setUser(loggedInUser);
    } catch (exception) {
      notifyWith('wrong username or password', 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser');

    setUser(null);
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
