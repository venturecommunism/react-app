<p>
<a href="https://github.com/feross/standard"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg"/></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-mit-blue.svg"/></a>
</p>

A simple Node.js (v4+) project starter using, eventually, Docker.

*Everything on this project, like markdown files are fakes. They are prefilled to help you integrate your own stuff.*

## Features

- Quick bootstrap with [gulp](http://gulpjs.com/) and [Babel](https://babeljs.io/)
- Testing with [Ava](https://github.com/avajs/ava)
- Prefilled .travis.yml file
- [Coveralls](https://coveralls.io/) support included
- [Standard codestyle](https://github.com/feross/standard)
- [Dockerfile](#run-with-docker) ready to use
- Configuration reader from YML files
- Javascript documentation with [esdoc](https://esdoc.org/)
- Minimal size artifact when building
- Prefilled .md files ([TODO](TODO.md), [CONTRIBUTING](CONTRIBUTING.md), [README](PROJECT_README.md))

## Installation

```javascript
// install yarn
npm install -g yarn

// clone project in the wanted directory
git clone https://github.com/Skahrz/project-skeleton my-app

// position yourself in the folder
cd my-app

// run the bootstrap script
yarn run bootstrap

// run the Ava tests
yarn test

// start the project with the dev configuration
yarn start
```

It installs the dev dependencies for the `.` folder and creates the `./dist` folder with the production dependencies and the minified code.

The `./src` folder contains all the `app`, `conf` and `test` sources. It's the place to play.

The generated `./dist` folder is completely independent and can be delivered in your different environments without moving the entire project sources.

### Building the project

```
yarn run build
```

builds the project for any environments. The configuration to use will be managed while launching the application using

```javascript
// move inside of the dist folder
cd ./dist

// uses the dev configuration file
node app dev

// uses the prod configuration file
node app prod
```

### Usage with Docker

```javascript
// create the docker image from the sources
docker build -t my-app-name .

// run a new container using the my-app-name image with dev configurations
docker run my-app-name

// run a new container using the my-app-name image with prod configurations
docker run -e ENVIRONMENT=prod my-app-name
```

It passes all the files into docker that install the dependencies, build the project, and start the application
