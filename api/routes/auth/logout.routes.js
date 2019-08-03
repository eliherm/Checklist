function logout(req, res, next) {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.clearCookie('checklist.sid');
    res.redirect('/');
  });
}

module.exports = logout;
