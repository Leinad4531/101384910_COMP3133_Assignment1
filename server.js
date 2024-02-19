const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers');
const bcrypt = require('bcrypt'); // For password hashing
const mongoose = require('mongoose');

const server = new ApolloServer({ typeDefs, resolvers });

// MongoDB connection string
const MONGO_URI = 'mongodb+srv://danieladebayo2004:Akindun123@mydb.2uoqtoa.mongodb.net/Comp3133_assignment1?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
