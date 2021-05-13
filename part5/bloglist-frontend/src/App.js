import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();

      setBlogs(blogs);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notifyWith = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notifyWith('wrong username or password', 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser');

    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const createdBlog = await blogService.create(newBlog);

      setBlogs(blogs.concat(createdBlog));
      setNewBlog({ title: '', author: '', url: '' });
      notifyWith(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        'success'
      );
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error');
    }
  };

  const handleBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value,
    });
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <BlogForm
        addBlog={addBlog}
        newBlog={newBlog}
        handleBlogChange={handleBlogChange}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
