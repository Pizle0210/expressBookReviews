const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a new user
public_users.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the username is already taken
    if (!isValid(username)) {
        return res.status(409).json({ message: "Username already exists" });
    }

    try {

        // Create a new user object
        const newUser = {
            username,
            password,
        };

        // Add the new user to the users array
        users.push(newUser);

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(300).json({books});
});



// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    // Find the book with the given ISBN
    const book = books[isbn];

    if (book) {
        // If the book is found, return it
        return res.status(200).json(book);
    } else {
        // If the book is not found, return a 404 Not Found response
        return res.status(404).json({ message: "Book not found" });
    }
});

  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();

    // Find all books by the given author
    const booksByAuthor = Object.values(books).filter(book => book.author.toLowerCase() === author);

    if (booksByAuthor.length > 0) {
        // If books are found, return them
        return res.status(200).json(booksByAuthor);
    } else {
        // If no books are found, return a 404 Not Found response
        return res.status(404).json({ message: "No books found by this author" });
    }
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();

    // Find the book with the given title
    const book = Object.values(books).find(book => book.title.toLowerCase() === title);

    if (book) {
        // If the book is found, return it
        return res.status(200).json(book);
    } else {
        // If the book is not found, return a 404 Not Found response
        return res.status(404).json({ message: "Book not found with this title" });
    }
});


//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    // Find the book with the given ISBN
    const book = books[isbn];

    if (book && book.reviews) {
        // If the book and its reviews are found, return the reviews
        return res.status(200).json(book.reviews);
    } else {
        // If no reviews are found for the book, return a 404 Not Found response
        return res.status(404).json({ message: "No reviews found for this book" });
    }
});


module.exports.general = public_users;
