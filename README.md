# Controk Frontend Web

[![travis-badge]][travis]
[![codecov-badge]][codecov]
[![codeclimate-badge]][codeclimate]
[![license-badge]][license]

[![dependencies-badge]][dependencies]
[![dev-dependencies-badge]][dev-dependencies]
[![docker]]()

## We used...

#### [Angular 1 Style Guide][angular-style-guide]

#### [Idiomatic.js][idiomatic-js]

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

**Note**: This is the Frontend Web part of the Controk system and may have some features faked for demonstrative purposes. [Click here](https://github.com/jourdanrodrigues/controk-docker) for the fully working system.

### Prerequisites

These instructions will build the environment to run commands on the project.

* [NodeJS][node-link]
* [NPM](https://www.npmjs.com/)

### Installing

#### Manual

- Create `.env` file, based on `.env.example`, and set your environment as you wish;
- `npm install`;
- `npm run standalone` (for demonstration only);
- `npm start` (for when you have the [WebService](https://github.com/jourdanrodrigues/controk-webservice) and the [Socket](https://github.com/jourdanrodrigues/controk-socket) running);

#### Based on "docker"

- The next command will give you a running server. Needing anything specific, change in `docker-compose.yml`;
- `docker-compose build`;
- `docker-compose up`.

The server must be running at [http://localhost:8888/].

## Running the tests

### Manual

- Create a ".env" file base on ".env.example" in the project's root;
- Make sure you have [Google Chrome](https://www.google.com.br/chrome/browser/desktop/)
- `npm test`.

### Based on "docker"

- Open the `docker-compose.yml` file with your favorite text editor and change the `frontend-web` service command to `npm test`;
- `docker-compose up`.

## Deployment

Clone the project:

`git clone https://github.com/jourdanrodrigues/controk-frontend-web`

Build the project with docker compose:

`docker-compose build`

Raise the project:

`docker-compose up`

## Built With

* [AngularJS](https://angularjs.org/)
* [NodeJS][node-link]
* [Gulp](http://gulpjs.com/)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/jourdanrodrigues/controk-frontend-web/tags). 

## Authors

* **Jourdan Rodrigues** - *Initial work* - [Jourdan Rodrigues](https://github.com/jourdanrodrigues/)

See also the list of [contributors][contributors] who participated in this project.

[idiomatic-js]: https://github.com/rwaldron/idiomatic.js
[angular-style-guide]: https://github.com/johnpapa/angular-styleguide
[travis-badge]: https://travis-ci.org/controk-sys/frontend-web.svg?branch=master
[travis]: https://travis-ci.org/controk-sys/frontend-web?branch=master
[codecov-badge]: https://codecov.io/gh/controk-sys/frontend-web/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/controk-sys/frontend-web
[license-badge]: https://img.shields.io/github/license/controk-sys/frontend-web.svg
[license]: https://github.com/controk-sys/frontend-web/blob/master/LICENSE
[docker]: https://img.shields.io/docker/automated/controk-sys/frontend-web.svg
[dependencies-badge]: https://david-dm.org/controk-sys/frontend-web.svg
[dependencies]: https://david-dm.org/controk-sys/frontend-web
[dev-dependencies-badge]: https://david-dm.org/controk-sys/frontend-web/dev-status.svg
[dev-dependencies]: https://david-dm.org/controk-sys/frontend-web?type=dev
[codeclimate-badge]: https://codeclimate.com/github/controk-sys/frontend-web/badges/gpa.svg
[codeclimate]: https://codeclimate.com/github/controk-sys/frontend-web
[node-link]: https://nodejs.org/en/
