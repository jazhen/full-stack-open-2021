import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Blog from './components/Blog';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { createBlog, initializeBlogs } from './reducers/blogReducer';
import { loadUser } from './reducers/loginReducer';
import Menu from './components/Menu';

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  const routeMatch = useRouteMatch('/blogs/:id');
  const blogMatchingRoute = routeMatch
    ? blogs.find((blog) => blog.id === routeMatch.params.id)
    : null;

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const addBlog = async (newBlog) => {
    dispatch(createBlog(newBlog));
    blogFormRef.current.toggleVisibility();
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  if (!user) {
    return (
      <div className="w-full flex flex-col items-center">
        <h1 className="m-8">Log in to Blog App</h1>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <Menu user={user} />
      <div>
        <h2>blog app</h2>
        <Notification />
      </div>
      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={blogMatchingRoute} loggedInUser={user} />
        </Route>
        <Route path="/">
          {blogForm()}
          <Blogs loggedInUser={user} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
