const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Dogs are great',
    author: 'Jason Zhen',
    url: 'images.google.com',
    likes: 5,
  },
  {
    title: 'Video games tutorial',
    author: 'Watson',
    url: 'ign.com',
    likes: 9,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'goodbye',
    url: 'mywebsite.com',
    likes: '2',
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
