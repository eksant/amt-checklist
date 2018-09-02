const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
  }

  type Mutation {
    signIn(username: String!, password: String!): Token!
    createAdmin(admin: UserInput!): User!
    createUser(user: UserInput!): User!
    updateUser(id: ID!, user: UserInput!): User!
    updateUserByAdmin(id: ID!, user: UserInput!): User!
    deleteUser(id: ID!): Boolean!
    deleteUserByAdmin(id: ID!): Boolean!
  }

  type User {
    _id: ID!
    username: String
    NIP: String
    fullName: String
    email: String
    mobile: String
    password: String
    roles: RoleAccess
    status: StatusActive
    imgUrl: String
    createdAt: String
    createdBy: User
  }

  type Token {
    user: User!
    token: String!
  }

  input SignInInput {
    username: String!
    password: String!
  }

  input UserInput {
    NIP: String!
    fullName: String
    email: String!
    mobile: String
    username: String!
    password: String
    roles: RoleAccess!
    status: StatusActive!
    imgUrl: String
  }

  enum StatusActive {
    Active
    NonActive
  }

  enum RoleAccess {
    Superadmin
    Admin
    Sopir
    Kernet
  }
`
