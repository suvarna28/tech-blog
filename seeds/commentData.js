const Comment = require('../models/Comment');

const commentData = [
    {
        contents: 'Helpful.',
        date_created: '2023-2-12',
        post_id: 1,
        user_id: 1,  
    },
    {
        contents: 'Very Helpful.',
        date_created: '2023-3-14',
        post_id: 2,
        user_id: 2,
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;