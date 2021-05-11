// Load the full build.
const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? {}
    : _.chain(blogs)
        .groupBy('author')
        .map((val, key) => ({ author: key, blogs: val.length }))
        .maxBy((obj) => obj.blogs)
        .value();
};

const mostLikes = (blogs) => {
  return blogs.length === 0
    ? {}
    : _.chain(blogs)
        .groupBy('author')
        .map((val, key) => ({
          author: key,
          likes: val.reduce((likes, obj) => likes + obj.likes, 0),
        }))
        .maxBy((obj) => obj.likes)
        .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
