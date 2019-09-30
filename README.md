# Checklist

A checklist application with an authentication system. The backend is a REST API and sessions are established using cookies.

## Getting Started

Instructions to setup a local copy of the project.

### Prerequisites

* [NodeJS](https://nodejs.org/en/) 
* [MySQL](https://www.mysql.com/)
* [Redis](https://redis.io/)
* [Knex.js](https://knexjs.org/)
* [Parcel](https://parceljs.org/)

### Installation and Setup

Install dependencies via npm

```
$ npm install
```

Create a .env file in the root directory

```
NODE_ENV='development'
PORT=3000
DB_HOST='127.0.0.1'
DB_NAME='checklist'
DB_USER='root'
DB_PASSWORD='secret'
```

Get a local copy of the SQL tables using the knex migrate feaure

```
$ knex migrate:latest
```

Start the server

```
$ npm start
```

## Built With

* [Express](https://expressjs.com/) - Web framework for NodeJS
* [KnexJS](https://knexjs.org/) - SQL query builder
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Hashing and salting of passwords
* [Passport](http://www.passportjs.org/) - Authentication middleware for express
* [Express validator](https://express-validator.github.io/) - Validation and sanitization
* [EJS](https://ejs.co/) - Javascript templating for client

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## License

* [MIT](LICENSE)

