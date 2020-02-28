const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const users = require('./models/users.model');

passport.use(new LocalStrategy({
  usernameField: 'userName'
}, async (userName, password, done) => {
  try {
    // Check if the username exists
    let user = await users.authenticate(userName);
    if (user.length === 0) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    [user] = user; // Retrieve user object from array
    user.password = user.password.toString();

    // Check if the password is valid
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    delete user.password;
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await users.getUser(id);

    if (user.length === 0) {
      done(null, false, { message: 'The user could not be found' });
    }

    done(null, user[0]);
  } catch (err) {
    done(err, false);
  }
});

module.exports = passport;
