const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Dogs are great',
    author: 'Jason',
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

const initialUsers = [
  {
    username: 'Poppy',
    name: 'Percy',
    password: 'pass123',
  },
  {
    username: 'mozart',
    name: 'Monty',
    password: 'pass123',
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

const usersInDb = async () => {
  const users = await User.find({});

  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
