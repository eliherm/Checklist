const userTasks = require('../models/tasks.model');

class tasksController {
  // Retrieve all tasks
  static async getTasks(req, res, next) {
    try {
      let tasks = await userTasks.getTasks(req.user.id);
      res.json(tasks);
    } catch(err) {
      err.resStatus = 500;
      err.clientMessage = { error: `The tasks list for ${req.user.id} could not be retrieved` };
      next(err);
    }
  }

  // Retrieve a single task
  static async getTask(req, res, next) {
    try{
      let requestId = req.params.taskId;
      let task = await userTasks.getTask(requestId);

      if (task.length === 0) {
        return res.status(404).json({ error: `Task with id = ${requestId} was not found` });
      }

      res.json(task);
    } catch (err) {
      err.resStatus = 500;
      err.clientMessage = { error: 'The task could not be retrieved' };
      next(err);
    }
  }

  // Add a task
  static async postTask(req, res, next) {
    try {
      let taskInfo = req.body;
      taskInfo.userId = req.user.id;

      let taskId = await userTasks.addTask(taskInfo); // Store task in DB
      [ taskId ] = taskId; // Desructure id from array

      res.json({ success: true, message: 'A new task was added', taskId: taskId });
    } catch(err) {
      err.resStatus = 500;
      err.clientMessage = { error: 'The task could not be added' };
      next(err);
    }
  }

  // Update specified fields of a task
  static async updateTask(req, res, next) {
    try {
      let requestId = req.params.taskId;
      let updateInfo = req.body;

      // Check for empty req body
      if (Object.keys(updateInfo).length === 0) {
        return res.status(400).json({ error: 'No fields provided' });
      }

      let DBResponse = await userTasks.updateTask(requestId, updateInfo);

      if (DBResponse === 0) {
        return res.status(404).json({ error: `Task with id = ${requestId} was not found` });
      }

      res.json({ success: true, message: `Task with id = ${requestId} was updated` });
    } catch (err) {
      err.resStatus = 500;
      err.clientMessage = {error: 'The task could not be updated'};
      next(err);
    }
  }

  // Delete a task
  static async deleteTask(req, res, next) {
    try {
      let requestId = req.params.taskId;
      let DBResponse = await userTasks.removeTask(requestId);

      if (DBResponse === 0) {
        return res.status(404).json({ error: `Task with id = ${requestId} was not found` });
      }

      res.json({ success: true, message: `Task with id = ${requestId} was deleted`});
    } catch (err) {
      err.resStatus = 500;
      err.clientMessage = {error: 'The task could not be deleted'};
      next(err);
    }
  }
}

module.exports = tasksController;
