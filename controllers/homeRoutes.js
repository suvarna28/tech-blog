const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
        },
      ],
    });

    const post = postData.get({ plain: true });

    // console.log("&&&&&&&%%%%%%%%%%%%%%%%%%%" + JSON.stringify(post));

    res.render('eachpost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/createpost', (req, res) => {
  res.render('createpost');
});

router.get('/addcomment/:id', async (req, res) => {
  const postData = await Post.findByPk(req.params.id);

  const post = postData.get({ plain: true });
  
  res.render('addcomment', {
    post,
    logged_in: req.session.logged_in
  });
});

router.get('/editcomment/:id', async (req, res) => {

  // console.log("&&&&&&&%%%%%%%%%%%%%%%%%%%^^^^^^^^^^^^^^^^^");

  const commentData = await Comment.findByPk(req.params.id);

  const comment = commentData.get({ plain: true });
  
  res.render('editcomment', {
    comment,
    logged_in: req.session.logged_in
  });
});

router.get('/update/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });

    res.render('update', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: parseInt(req.session.user_id)
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['contents', 'date_created'],
        },
      ],
    });

    if (!postData) {
      res
        .status(400)
        .json({ message: 'No user posts found.' });
      return;
    }

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;