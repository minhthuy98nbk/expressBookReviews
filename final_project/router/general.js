const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
 
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  new Promise((resolve, reject) => {
    if (!books || Object.keys(books).length === 0) {
      reject("List book is empty");
    } else {
      resolve(Object.values(books).map(b => b.title));
    }
  })
    .then(listBookName => {
      res.status(200).json({
        message: "Success",
        data: listBookName
      });
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

// Get all books
public_users.get('/', function (req, res) {
  new Promise((resolve, reject) => {
    if (!books || Object.keys(books).length === 0) {
      reject("List book is empty");
    } else {
      resolve(Object.values(books).map(b => b.title));
    }
  })
    .then(listBookName => {
      res.status(200).json({
        message: "Success",
        data: listBookName
      });
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  new Promise((resolve, reject) => {
    if (!books || Object.keys(books).length === 0) {
      reject("List book is empty");
    }
    const isbn = req.params.isbn;
    const bookCheck = books[isbn];
    if (!bookCheck) {
      reject(`Book isbn ${isbn} is not available`);
    } else {
      resolve(bookCheck);
    }
  })
    .then(bookDetails => {
      res.status(200).json({
        message: "Success",
        data: bookDetails
      });
    })
    .catch(error => {
      res.status(501).json({ message: error });
    });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  new Promise((resolve, reject) => {
    if (!books || Object.keys(books).length === 0) {
      reject("List book is empty");
    }
    const author = req.params.author;
    const listBook = Object.values(books).filter(b => b.author.toLowerCase() === author.toLowerCase());
    if (!listBook || listBook.length === 0) {
      reject(`Author ${author} has no book`);
    } else {
      resolve(listBook);
    }
  })
    .then(listBook => {
      res.status(200).json({
        message: "Success",
        data: listBook
      });
    })
    .catch(error => {
      res.status(501).json({ message: error });
    });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  new Promise((resolve, reject) => {
    if (!books || Object.keys(books).length === 0) {
      reject("List book is empty");
    }
    const title = req.params.title;
    const listBook = Object.values(books).filter(b => b.title.toLowerCase() === title.toLowerCase());
    if (!listBook || listBook.length === 0) {
      reject(`There is not a book with title ${title}`);
    } else {
      resolve(listBook);
    }
  })
    .then(listBook => {
      res.status(200).json({
        message: "Success",
        data: listBook
      });
    })
    .catch(error => {
      res.status(501).json({ message: error });
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  if (!books || Object.keys(books).length === 0) {
    return res.status(500).json({message: "List book is empty"});
  }
  var isbn = req.params.isbn;
  var bookCheck = books[isbn];
  if (!bookCheck) {
    return res.status(501).json({message: `Book isbn ${isbn} is not available`});
  }
  return res.status(200).json({
    message: `Success`,
    data: bookCheck.reviews
  });
});

module.exports.general = public_users;
