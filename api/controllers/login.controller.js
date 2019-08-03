class loginController {
  static async notifyClient(req, res, next) {
    try{
      res.json({ success: true, message: 'Login successful' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = loginController;
