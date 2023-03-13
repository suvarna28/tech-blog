const router = require('express').Router();
const Post = require('../../models/Post');

router.post('/createpost', async (req, res) => {
    try {
        var date = new Date();
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            date_created: date
        });

        // req.session.save(() => {
        //     req.session.user_id = userData.id;
        //     req.session.logged_in = true;
        // });

        const post = postData.get({ plain: true });

        res.render('dashboard', {
            post, logged_in: true
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
        postData, logged_in: true
    });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//   router.delete('/:book_id', (req, res) => {
//     Book.destroy({
//       where: {
//         book_id: req.params.book_id,
//       },
//     })
//       .then((deletedBook) => {
//         res.json(deletedBook);
//       })
//       .catch((err) => res.json(err));
//   });

module.exports = router;
