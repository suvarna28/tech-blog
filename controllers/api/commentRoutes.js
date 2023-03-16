const router = require('express').Router();
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');
const User = require('../../models/User');
// const withAuth = require('../../utils/auth');

// Create new comment
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

// Edit existing comment
router.put('/edit/:id', async (req, res) => {
    try {
        var date = new Date();

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

        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete existing comment
router.get('/deletecomment/:id', async (req, res) => {
    try {
        const commentHere = await Comment.findByPk(req.params.id);

        const comment = commentHere.get({ plain: true });

        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.redirect(`/post/${comment["post_id"]}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;