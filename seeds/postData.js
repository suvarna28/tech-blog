const Post = require('../models/Post');

const postData = [
    {
        title: 'Why is mvc so important',
        content: 'MVC allows developers to maintain a true separation of concerns.',
        date_created: '2023-3-15',
        user_id: 1,
    },
    {
        title: 'Authentication Vs Authorization',
        content: 'Authentication means confirming your own identity whereas authorization means being allowed access to the system.',
        date_created: '2023-3-14',
        user_id: 2,
    },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;