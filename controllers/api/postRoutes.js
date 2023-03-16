const router = require('express').Router();
const Post = require('../../models/Post');
const User = require('../../models/User');

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

        // const userData = await User.findOne({ where: { id: post.user_id } });

        res.render('dashboard', {
            post, logged_in: req.session.logged_in
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {

    console.log("Inside update click : ");
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

router.delete('/:id', async (req, res) => {
    console.log("Inside Delete : ^^^^^^^^^^^^^^^^^^" + req.params.id)
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
