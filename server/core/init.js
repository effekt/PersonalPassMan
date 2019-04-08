const bcrypt = require('bcrypt-nodejs');
const User = require(global.config.root + '/models/user');

module.exports = function() {
    User.findOne({email: 'jesse.wheeler@georgebrown.ca'}, {}, function(err, user) {
        if (user)
            return;

        bcrypt.hash('password', null, null, function(err, password) {
            User.create({email: 'jesse.wheeler@georgebrown.ca', password: password, firstName: 'Jesse', lastName: 'Wheeler'}, function(err, docs) {
                console.log('Created user jesse.wheeler@georgebrown.ca:password');
            });
        });
    });
}