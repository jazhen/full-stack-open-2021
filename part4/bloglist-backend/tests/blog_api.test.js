const supertest = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const helper = require('./tests_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);

  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((blog) => blog.title);

    expect(titles).toContain('Dogs are great');
  });
});

describe('viewing a specific blog', () => {
  test('the unique identifier property of the blog posts is named id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });
});

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const usersAtStart = await helper.usersInDb();

    const userForToken = {
      username: usersAtStart[0].username,
      id: usersAtStart[0].id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      title: 'This is my new blog',
      author: 'Mason',
      url: 'tumblr.com',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('This is my new blog');
  });

  test('blog without a likes should default to 0', async () => {
    const usersAtStart = await helper.usersInDb();

    const userForToken = {
      username: usersAtStart[0].username,
      id: usersAtStart[0].id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      title: 'This is my new blog',
      author: 'Mason',
      url: 'tumblr.com',
    };

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`);

    expect(addedBlog.body.likes).toBe(0);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('fails with status code 401 if auth token is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const userForToken = {
      username: usersAtStart[0].username,
      id: usersAtStart[0].id,
    };

    const token = undefined;

    const newBlog = {
      author: 'Opal',
      likes: 20,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('fails with status code 400 if data is incomplete', async () => {
    const usersAtStart = await helper.usersInDb();

    const userForToken = {
      username: usersAtStart[0].username,
      id: usersAtStart[0].id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      author: 'Opal',
      likes: 20,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

// describe('deletion of a blog', () => {
//   test('succeeds with status code 204 if id is valid', async () => {
//     const blogsAtStart = await helper.blogsInDb();
//     const blogToDelete = blogsAtStart[0];

//     await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

//     const blogsAtEnd = await helper.blogsInDb();

//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

//     const titles = blogsAtEnd.map((blog) => blog.title);

//     expect(titles).not.toContain(blogToDelete.title);
//   });
// });

// describe('updating of a blog', () => {
//   test('succeeds with status code 204 if id is valid', async () => {
//     const blog = {
//       likes: 99,
//     };

//     const blogsAtStart = await helper.blogsInDb();
//     const blogToUpdate = blogsAtStart[0];

//     const updatedBlog = await api
//       .put(`/api/blogs/${blogToUpdate.id}`)
//       .send(blog);
//     expect(updatedBlog.body.likes).toBe(99);

//     const blogsAtEnd = await helper.blogsInDb();
//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
//   });
// });

afterAll(() => {
  mongoose.connection.close();
});
