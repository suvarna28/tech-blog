const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPost = require('./postData');

const seedAll = async () => {
    await sequelize.sync({ force: false });

    await seedUser();

    await seedPost();

    process.exit(0);
};

seedAll();
