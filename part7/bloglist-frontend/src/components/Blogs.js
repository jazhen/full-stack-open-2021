import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const Blogs = ({ loggedInUser }) => {
  const blogs = useSelector((state) => state.blogs);
  const byLikesDescending = (a, b) => b.likes - a.likes;
  const sortedBlogs = blogs.sort(byLikesDescending);

  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          isOwner={loggedInUser.username === blog.user.username}
        />
      ))}
    </>
  );
};

export default Blogs;
