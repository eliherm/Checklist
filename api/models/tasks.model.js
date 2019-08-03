const connection = require('../db/knexConnection');

class tasksModel {
  static getTasks(id) {
    return connection('tasks').select('id', 'description', 'completed', 'starred').where('userId', id);
  }

  static getTask(id) {
    return connection('tasks').select('id', 'description', 'completed', 'starred').where('id', id);
  }

  static addTask(newTask) {
    return connection('tasks').insert(newTask);
  }

  static updateTask(id, newData) {
    return connection('tasks').where('id', id).update(newData);
  }

  static removeTask(id) {
    return connection('tasks').where('id', id).del();
  }
}

module.exports = tasksModel;
