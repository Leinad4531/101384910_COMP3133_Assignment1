const bcrypt = require('bcrypt'); // For password hashing
const { ApolloServer, gql } = require('apollo-server');
const User = require('./models/User');
const Employee = require('./models/Employee');

const resolvers = {
    Query: {
      async login(_, { username, password }) {
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) {
          throw new Error('User not found');
        }
  
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }
  
        // Directly return the user without a token
        return user;
      },
      async getAllEmployees() {
        return await Employee.find({});
      },
      async searchEmployeeById(_, { eid }) {
        return await Employee.findById(eid);
      },
    },
    Mutation: {
      async signup(_, { username, email, password }) {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          throw new Error('Username or Email already exists');
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          username,
          email,
          password: hashedPassword,
        });
  
        await user.save();
        return user;
      },
      async addNewEmployee(_, { first_name, last_name, email, gender, salary }) {
        // Check if email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) throw new Error('Employee with this email already exists');
  
        // Create new employee
        const employee = new Employee({
          first_name,
          last_name,
          email,
          gender,
          salary,
        });
  
        await employee.save();
        return employee;
      },
      async updateEmployeeById(_, { eid, first_name, last_name, email, gender, salary }) {
        // Update employee details
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, { first_name, last_name, email, gender, salary }, { new: true });
        if (!updatedEmployee) throw new Error('Employee not found');
  
        return updatedEmployee;
      },
      async deleteEmployeeById(_, { eid }) {
        // Delete employee
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (!deletedEmployee) throw new Error('Employee not found or already deleted');
  
        return deletedEmployee;
      },
    },
  };
  module.exports = resolvers;