const router = require('express').Router();
const Post = require('../../models/Post');
const User = require('../../models/User');

// Create new post route
router.post('/createpost', async (req, res) => {
    try {
        var date = new Date();
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            date_created: date,
            user_id: req.session.user_id,
        });

        const post = postData.get({ plain: true });

        res.render('dashboard', {
            post, logged_in: req.session.logged_in
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update existing post route
router.put('/:id', async (req, res) => {
    try {
        var date = new Date();
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )

        res.render('dashboard', {
            postData, logged_in: req.session.logged_in
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete existing post route
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!post) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
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
        res.status(500).json(err);
    }
});

module.exports = router;
