const dotenv = require('dotenv').config();

const options = {
    client: 'mysql',
    connection: {
        host: process.env.SQLhost,
        user: process.env.SQLuser,
        password: process.env.SQLpwd,
        database: process.env.SQLdatabase
    }
}

module.exports = {
    options
}