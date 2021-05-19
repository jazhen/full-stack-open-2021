import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, loggedInUser, updateBlog, removeBlog }) => {
  const byLikesDescending = (a, b) => b.likes - a.likes;
  const sortedBlogs = blogs.sort(byLikesDescending);

  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          loggedInUser={loggedInUser}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </>
  );
};

export default Blogs;
