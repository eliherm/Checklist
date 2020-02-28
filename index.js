const chalk = require('chalk'); // Colors terminal text
const server = require('./api/server');

const port = process.env.PORT;

server.listen(port, () => {
  console.log(chalk.green(`Server running at http://${process.env.HOST}:${port}`));
});
