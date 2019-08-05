const bcrypt = require('bcrypt');
const saltRounds = 10;

const users = require('../models/users.model');

class usersController {
  // Retrieve all users
  static async getAllUsers(req, res, next) {
    try {
      let userList = await users.getUsers();
      res.json(userList);
    } catch(err) {
      err.resStatus = 500;
      err.clientMessage = { error: 'The users list could not be retrieved' };
      next(err);
    }
  }

  // Retrieve a single user
  static async getUser(req, res, next) {
    try{
      let requestId = req.params.userId;
      let user = await users.getUser(requestId);

      if (user.length === 0) {
        return res.status(404).json({ error: `User with id = ${requestId} was not found` });
      }

      [ user ] = user; // Destructure user from array
      res.json({ success: true, user: user });
    } catch (err) {
      err.resStatus = 500;
      err.clientMessage = { error: 'The user could not be retrieved' };
      next(err);
    }
  }

  // Add a user
  static async postUser(req, res, next) {
    try {
      let userInfo = req.body;
      delete userInfo.passwordConfirm;

      // Check if the user name exists
      let userNameMatch = await users.findUserName(userInfo.userName);
      if (userNameMatch.length !== 0) {
        let validationErrors = [{ param: 'userName', msg: 'The username is taken' }];
        return res.status(422).json({ validationErrors: validationErrors });
      }

      userInfo.password = await bcrypt.hash(userInfo.password, saltRounds); // Hash the password

      await users.addUser(userInfo); // Store user in DB
      delete userInfo.password;

      res.json({ success: true, message: 'A new user was added' });
    } catch(err) {
      err.resStatus = 500;
      err.clientMessage = { error: 'The user could not be added' };
      next(err);
    }
  }

  // Update specified fields of a user
  static async updateUser(req, res, next) {
    try {
      let requestId = req.params.userId;
      let updateInfo = req.body;

      // Check for empty req body
      if (Object.keys(updateInfo).length === 0) {
        return res.status(400).json({ error: 'No fields provided' });
      }

      // Check if the user name exists
      if (updateInfo.userName !== req.user.userName) {
        let userNameMatch = await users.findUserName(updateInfo.userName);
        if (userNameMatch.length !== 0) {
          let validationErrors = [{ param: 'userName', msg: 'The username is taken' }];
          return res.status(422).json({ validationErrors: validationErrors });
        }
      }

      let DBResponse = await users.updateUser(requestId, updateInfo);

      if (DBResponse === 0) {
        return res.status(404).json({ error: `User with id = ${requestId} was not found` });
      }

      res.json({ success: true, message: `User with id = ${requestId} was updated` });
    } catch (err) {
      err.resStatus = 500;
      err.clientMessage = {error: 'The user could not be updated'};
      next(err);
    }
  }

  // Delete a user
  static async deleteUser(req, res, next) {
    try {
      let requestId = req.params.userId;
      let DBResponse = await users.removeUser(requestId);

      if (DBResponse === 0) {
        return res.status(404).json({ error: `User with id = ${requestId} was not found` });
      }

      res.json({ message: `User with id = ${requestId} was deleted`});
    } catch (err) {
      err.resStatus = 500;
      err.clientMessage = {error: 'The user could not be deleted'};
      next(err);
    }
  }
}

module.exports = usersController;
