/*
*
* JWT(Json Web Token) authentication implementated with Angular and Nodejs.
* Home: https://github.com/jixiangcn/angular-jwt-node#readme
*
*/

const mongoose = require('mongoose');
const User = mongoose.model('User', {
    name: 'string',
    password: 'string',
    token: 'string'
});

module.exports = User;