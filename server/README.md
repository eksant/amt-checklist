#AMT-Checklist (server side)

### Library :
- Graphql
  - Reference to: https://www.apollographql.com/docs/apollo-server/v1/servers/express.html
- Rest API
  - Reference to: https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
- Redis
  - How to install: https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04
- MongoDB
  - How to install: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

### Usage :
```bash
git clone https://github.com/eksant/amt-checklist.git
cd server
yarn install or npm install
yarn start or npm start
```

### Endpoint API :

### A Typical Top-Level Directory :
    .
    ├── ...
    ├── config                # This folder contains configuration connection mongodb and graphql.
    ├── graphql               # This folder contains the schema and resolvers.
    ├── middlewares           # This folder contains handle auth and cache.
    ├── models                # This folder contains the schema definitions for our Mongoose models.
    ├── rest                  # This folder contains the routes and controllers
    └── ...
