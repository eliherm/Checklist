# Checklist

A simple checklist application. 

## Getting Started

Instructions to get a copy of the project up and running on your local machine.

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
NODE_ENV=''
PORT=
DB_HOST=''
DB_NAME=''
DB_USER=''
DB_PASSWORD=''
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

* [Express](https://expressjs.com/) - The web framework used
* [KnexJS](https://knexjs.org/) - SQL Query builder

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## License

* [MIT](LICENSE)

