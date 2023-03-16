const User = require('../models/User');

const userdata = [
    {
        username: 'john',
        password: 'john',
    },
    {
        username: 'kelly',
        password: 'kelly',
    },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
