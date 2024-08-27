const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    { username: 'alice', password: 'password123' },
    { username: 'bob', password: 'password456' }
];

const isValid = (username) => {
    // Check if the username is already in use
    return !users.some(user => user.username === username);
};


const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    // Find the user by username
    const user = users.find(user => user.username === username);
    
    if (user) {
        // Check if the provided password matches the stored password
        return user.password === password; // Returns true if passwords match, false otherwise
    } else {
        // If no user found, return false
        return false;
    }
};




// // Function to check username and password (assumes plain text passwords for this example)
// const authenticatedUser = (username, password) => {
//     const user = users.find(user => user.username === username);
//     return user && user.password === password;
// };


//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Authenticate user
    const isAuthenticated = authenticatedUser(username, password);

    if (isAuthenticated) {
        // Respond with success if authenticated
        return res.status(200).json({ message: "Login successful" });
    } else {
        // Respond with error if authentication fails
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
