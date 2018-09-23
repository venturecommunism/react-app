FROM node:6.10-alpine

# Enviroment variables
ENV HOMEDIR /data
ENV ENVIRONMENT dev

RUN mkdir -p ${HOMEDIR}
WORKDIR ${HOMEDIR}

# install all dependencies
ADD package.json ./
RUN yarn install

# add the source files and build the project
ADD . .
RUN yarn run build

# start the project
CMD ["sh", "-c", "node ./dist/app.js ${ENVIRONMENT}"]
