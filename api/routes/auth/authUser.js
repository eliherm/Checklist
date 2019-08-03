const passport = require('../../passport-config');

function authUser(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if(info) {
      return res.json({ success: false, message: info.message });
    }
    if (err) { return next(err); }
    if(!user) { return res.redirect('/login'); }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  })(req, res, next);
}

module.exports = authUser;
