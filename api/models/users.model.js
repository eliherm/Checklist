const connection = require('../db/knexConnection');

class usersModel {
  static getUsers() {
    return connection('users').select('id', 'firstName', 'lastName', 'userName', 'email');
  }

  static getUser(id) {
    return connection('users').select('id', 'firstName', 'lastName', 'userName', 'email').where('id', id);
  }

  static findUserName(userName) {
    return connection('users').select('id').where('userName', userName);
  }

  static addUser(newUser) {
    return connection('users').insert(newUser);
  }

  static updateUser(id, newData) {
    return connection('users').where('id', id).update(newData);
  }

  static removeUser(id) {
    return connection('users').where('id', id).del();
  }

  static authenticate(userName) {
    return connection('users').select('id', 'firstName', 'lastName', 'userName', 'email', 'password').where('userName', userName);
  }
}

module.exports = usersModel;
