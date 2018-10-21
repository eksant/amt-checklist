# AMT-Checklist (server side)

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

### Endpoint API Auth :
| No | Method   | End Point   | Description       |
| -- | ---------|-------------|-------------------|
| 1  | POST     | /           | Login             |

Access the endpoints by visiting [http://localhost:3030/api/auth](http://localhost:3030/api/auth)

### Endpoint API Admins, Users, Mobil Tangkis, Checklist :
| No | Method   | End Point   | Description       |
| -- | ---------|-------------|-------------------|
| 1  | GET      | /           | Read All Data     |
| 2  | GET      | /:id        | Read Data By Id   |
| 3  | POST     | /add        | Create Data       |
| 4  | PUT      | /update/:id | Update Data By Id |
| 5  | DELETE   | /delete/:id | Delete Data By Id |

Access the endpoints admins by visiting [http://localhost:3030/api/admins](http://localhost:3030/api/admins)
Access the endpoints users by visiting [http://localhost:3030/api/users](http://localhost:3030/api/users)
Access the endpoints mobil tangkis by visiting [http://localhost:3030/api/mobiltangkis](http://localhost:3030/api/mobiltangkis)
Access the endpoints checklist by visiting [http://localhost:3030/api/checklist](http://localhost:3030/api/checklist)

### A Typical Top-Level Directory :
    .
    ├── ...
    ├── config                # This folder contains configuration connection mongodb and graphql.
    ├── graphql               # This folder contains the schema and resolvers.
    ├── middlewares           # This folder contains handle auth and cache.
    ├── models                # This folder contains the schema definitions for our Mongoose models.
    ├── rest                  # This folder contains the routes and controllers
    └── ...
