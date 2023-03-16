const router = require('express').Router();
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');
const User = require('../../models/User');

router.post('/:id', async (req, res) => {
    try {
        var date = new Date();
        const commentData = await Comment.create({
            contents: req.body.content,
            date_created: date,
            post_id: req.params.id,
            user_id: req.session.user_id,
        });

        res.status(200).json("Comment added.");
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        var date = new Date();

        // console.log("***************************** ");

        await Comment.update(
            {
                contents: req.body.content,
                date_created: date,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )

        const commentData = await Comment.findByPk(req.params.id);

        const comment = commentData.get({ plain: true });

        // // const comment = commentData.get({ plain: true });

        // console.log("***************************** " + comment);

        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/deletecomment/:id', async (req, res) => {
    console.log("Inside Delete : ^^^^^^^^^^^^^^^^^^" + req.params.id)
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
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