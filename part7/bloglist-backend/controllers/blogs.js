const middleware = require('../utils/middleware');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    return response.status(400).send({ error: 'title or url missing' });
  }

  if (!blog.likes) {
    blog.likes = 0;
  }

  const user = request.user;

  blog.user = user;

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);

  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    // get user associated with the blog
    const blog = await Blog.findById(request.params.id);

    // the blog with that id doesn't exist
    if (!blog) response.status(404).end();

    // get user that's making the request
    const user = request.user;

    if (blog.user.toString() !== user.id.toString()) {
      return response
        .status(401)
        .json({ error: 'only the creator can delete blogs' });
    }

    await blog.remove();

    user.blogs = user.blogs.filter(
      (blog) => blog.id.toString() !== request.params.id.toString()
    );

    await user.save();

    response.status(204).end();
  }
);

blogsRouter.put('/:id', async (request, response) => {
  const newBlog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });

  response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
