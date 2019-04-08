const Password = require(global.config.root + '/models/password');

module.exports = function(app) {
    const endpointName = global.config.api + "password";

    app.post(endpointName, function(req, res) {
        req.body.createdBy = req.user._id;
        Password.create(req.body, function(err, pass) {
            if (err)
                return global.util.res(res, false, err.message);
            global.util.res(res, true, "Password added", pass);
        });
    })

    app.get(endpointName, function(req, res) {
        Password.find({ createdBy: req.user._id })
        .exec((err, docs) => {
            if (err)
                return global.util.res(res, false, err.message);
            if (docs.length) {
                global.util.res(res, true, "Passwords retrieved.", docs);
            } else {
                global.util.res(res, true, "No passwords added.", []);
            }
        })
    })
}
