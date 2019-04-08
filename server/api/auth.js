const jwt = require('jsonwebtoken');
const User = require(global.config.root + '/models/user');
const bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {
    const endpointName = global.config.api + "auth";

    app.post(endpointName, function(req, res) {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err)
                return global.util.res(res, false, err.message);
            if (!user)
                return global.util.res(res, false, 'Could not find user with matching credentials.');
            bcrypt.compare(req.body.password, user.password, (err, success) => {
                if (err)
                    return global.util.res(res, false, err.message);
                if (!success)
                    return global.util.res(res, false, "Could not find user with matching credentials.");
                jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET || global.config.JWT_SECRET, { expiresIn: '8h'}, (err, token) => {
                    if (err)
                        return global.util.res(res, false, err.message);
                    User.findOneAndUpdate({_id: user._id}, {loginToken: token}, (err, user) => {
                        if (err)
                            return global.util.res(res, false, err.message);
                        return global.util.res(res, true, "Successfully logged in.", {token: token, user: user});
                    })
                })
            })
        })
    })

    app.get(endpointName + "/validate", function(req, res) {
        if (req.user && req.headers.authorization) {
            User.findOne({loginToken: req.headers.authorization.split(" ")[1], _id: req.user._id}, (err, user) => {
                if (err)
                    return global.util.res(res, false, err.message);
                if (!user)
                    return res.sendStatus(401);
                global.util.res(res, true, 'Login token is valid.', user);
            })
        }
    })

    app.post(endpointName + '/register', function(req, res) {
        bcrypt.hash(req.body.password, null, null, function(err, password) {
            req.body.password = password;
            User.create(req.body, (err, doc) => {
                if (err)
                    return global.util.res(res, false, err.message);
                return global.util.res(res, true, "Successfully registered.", doc);
            })
        })
    })
}
