# coding challenge

working local development for NestJs, Kafka, PostgreSQL on top of docker-compose

## Quick Start

- Clone this repo
- Install npm packages - _for IDE type checking_.

```bash
cd nestjs-postgres-boilerplate
yarn install --frozen-lockfile
```

- Build and run the Docker image for development

```bash
yarn docker-compose:dev
```

### API swagger
can be accessed from `http://localhost:3000/doc`

- Access the app at http://localhost:3000.
- Make file changes and it will automatically rebuild the app.

### Running All Tests

```bash
yarn docker-compose:test
```

### Build For Production

```bash
yarn docker-compose:prod
```

## objectives

sample REST API for 
- retrieve all orders
- get one order by its id
- create a new order

Order creation will create a new event in kafka topic called `orders.notification` with message type `order.placed`
Notification service listen to this specific topic and handle the event 

## common infrastructure

you can find under `/common` a few infrastructure services that serve the following cases:
- kafka decorators which can be used to decorate any function listen to any specific topic 
- kafka module a global module that expose kafka service that can be used to send different event to the kafka stream
- filters (entity not found) which catch any entity not found error and return 404 http response 

## testing 
only orders service is tested the reason why is that this is almost where all the logic happens however this is super minimal approach to see through and just make sure all dots are connected and **not enough by any mean for a production service
**

