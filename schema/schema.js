const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    login(username: String!, password: String!): User
    getAllEmployees: [Employee]
    searchEmployeeById(eid: ID!): Employee
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addNewEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee
    updateEmployeeById(eid: ID!, first_name: String, last_name: String, email: String, gender: String, salary: Float): Employee
    deleteEmployeeById(eid: ID!): String
  }
`;
module.exports = typeDefs;