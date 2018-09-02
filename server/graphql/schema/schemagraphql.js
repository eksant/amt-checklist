const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    users: [User!]
    user(id: ID!): User!
    mobiltangkis: [MobilTangki!]
    mobiltangki(id: ID!): MobilTangki!
  }

  type Mutation {
    signIn(username: String!, password: String!): Token!
    createAdmin(admin: UserInput!): User!
    createUser(user: UserInput!): User!
    updateUser(id: ID!, user: UserInput!): User!
    deleteUser(id: ID!): Boolean!
    createMobilTangki(mobiltangki: MobilTangkiInput!): MobilTangki!
    updateMobilTangki(id: ID!, mobiltangki: MobilTangkiInput!): MobilTangki!
    deleteMobilTangki(id: ID!): Boolean!
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

  type Token {
    user: User!
    token: String!
  }

  input SignInInput {
    username: String!
    password: String!
  }

  type MobilTangki {
    _id: ID!
    nopol: String
    KL: String
    year: Int
    status: StatusActive
    createdAt: String
    createdBy: User
  }

  input MobilTangkiInput {
    nopol: String!
    KL: String
    year: Int
    status: StatusActive!
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
