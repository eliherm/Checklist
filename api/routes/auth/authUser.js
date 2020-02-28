const passport = require('../../passport-config');

function authUser(req, res, next) {
  // eslint-disable-next-line consistent-return
  passport.authenticate('local', (err, user, info) => {
    if (info) {
      return res.json({ success: false, message: info.message });
    }
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }

    req.login(user, (error) => {
      if (error) {
        return next(error);
      }
      return next();
    });
  })(req, res, next);
}

module.exports = authUser;
