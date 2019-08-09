const Mock = require('mockjs');

module.exports = function(app) {
  app.get('/user', function(rep, res) {
    const userData = require('./json/user/user.json');
    delete require.cache[require.resolve('./json/user/user.json')];
    res.json(userData);
  });
};
