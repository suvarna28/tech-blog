const User = require('../models/User');

const userdata = [
    {
        username: 'suva',
        password: 'suva',
    },
    {
        username: 'shreya',
        password: 'suva',
    },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
