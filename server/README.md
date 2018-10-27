# AMT-Checklist (server side)

### Top-Level Dependencies :
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
| No | Method   | End Point   | Description                                     |
| -- | ---------|-------------|-------------------------------------------------|
| 1  | GET      | /           | Read All Data                                   |
| 2  | GET      | /user       | Special endpoint for read all checklist by self |
| 3  | GET      | /:id        | Read Data By Id                                 |
| 4  | POST     | /add        | Create Data                                     |
| 5  | PUT      | /update/:id | Update Data By Id                               |
| 6  | DELETE   | /delete/:id | Delete Data By Id                               |

Access the endpoints admins by visiting [http://localhost:3030/api/admins](http://localhost:3030/api/admins)  
Access the endpoints users by visiting [http://localhost:3030/api/users](http://localhost:3030/api/users)  
Access the endpoints mobil tangkis by visiting [http://localhost:3030/api/mobiltangkis](http://localhost:3030/api/mobiltangkis)  
Access the endpoints checklist by visiting [http://localhost:3030/api/checklist](http://localhost:3030/api/checklist)  

### Endpoint API Approval Checklist :
| No | Method   | End Point     | Description                       |
| -- | ---------|---------------|-----------------------------------|
| 1  | PUT      | /approval/:id | Approval checklist by admins role |

Access the endpoints by visiting [http://localhost:3030/api/checklist](http://localhost:3030/api/checklist)  

### Schema Query GraphQL :
| No | Query                                                                      | Description                                       |
|----|----------------------------------------------------------------------------|---------------------------------------------------|
| 1  | admins: [User!]                                                            | Read All Data Admins                              |
| 2  | admin(id: ID!): User!                                                      | Read Data Admin By Id                             |
| 3  | users: [User!]                                                             | Read All Data Users                               |
| 4  | user(id: ID!): User!                                                       | Read Data User By Id                              |
| 5  | mobiltangkis: [MobilTangki!]                                               | Read All Data Mobil Tangkis                       |
| 6  | mobiltangki(id: ID!): MobilTangki!                                         | Read Data Mobil Tangki By Id                      |
| 8  | checklists: [CheckList!]                                                   | Read All Data Checklist (Data depend role token)  |
| 9  | checklist(id: ID!): CheckList!                                             | Read Data Checklist By Id                         |

### Schema Mutation GraphQL :
| No | Query                                                                      | Description                       |
|----|----------------------------------------------------------------------------|-----------------------------------|
| 1  | signIn(username: String!, password: String!): UserLogin!                   | Login                             |
| 2  | createAdmin(admin: AdminInput!): User!                                     | Create Admin                      |
| 3  | createUser(user: UserInput!): User!                                        | Create User                       |
| 4  | createMobilTangki(mobiltangki: MobilTangkiInput!): MobilTangki!            | Create Mobil Tangki               |
| 5  | createCheckList(checklist: CheckListInput!): CheckList!                    | Create Checklist                  |
| 6  | updateAdmin(id: ID!, admin: AdminInput!): User!                            | Update Admin By Id                |
| 7  | updateUser(id: ID!, user: UserInput!): User!                               | Update User By Id                 |
| 8  | updateMobilTangki(id: ID!, mobiltangki: MobilTangkiInput!): MobilTangki!   | Update Mobil Tangki By Id         |
| 9  | updateCheckList(id: ID!, checklist: CheckListInput!): CheckList!           | Update Checklist By Id            |
| 10 | deleteAdmin(id: ID!): Boolean                                              | Delete Admin By Id                |
| 11 | deleteUser(id: ID!): Boolean                                               | Delete User By Id                 |
| 12 | deleteMobilTangki(id: ID!): Boolean                                        | Delete Mobil Tangki By Id         |
| 13 | deleteCheckList(id: ID!): Boolean                                          | Delete Checklist By Id            |
| 14 | approvalCheckList(id: ID!, approval: ApprovalChecklistInput!): CheckList!  | Approval Checklist By Admins Role |

Access the graphql by visiting [http://localhost:3030/graphql](http://localhost:3030/graphql)  

### A Typical Top-Level Directory :
    .
    ├── ...
    ├── config                # This folder contains configuration connection mongodb and graphql.
    ├── docs                  # This folder contains the documents and json format import insomnia.
    ├── graphql               # This folder contains the schema and resolvers.
    ├── middlewares           # This folder contains handle auth and cache.
    ├── models                # This folder contains the schema definitions for our Mongoose models.
    ├── rest                  # This folder contains the routes and controllers.
    └── ...
