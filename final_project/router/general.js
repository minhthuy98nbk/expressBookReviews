const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
 
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  if (!books || Object.keys(books).length === 0) {
    return res.status(500).json({message: "List book is empty"});
  }
  var listBookName = Object.values(books).map(b => b.title);
  return res.status(200).json({
    message: `Success`,
    data: listBookName
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
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
    data: bookCheck
  });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  if (!books || Object.keys(books).length === 0) {
    return res.status(500).json({message: "List book is empty"});
  }
  var author = req.params.author;
  var listBook = Object.values(books).filter(b => b.author.toLowerCase() === author.toLowerCase());
  if (!listBook || listBook.length === 0) {
    return res.status(501).json({message: `Author ${author} has no book`});
  }
  return res.status(200).json({
    message: `Success`,
    data: listBook
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  if (!books || Object.keys(books).length === 0) {
    return res.status(500).json({message: "List book is empty"});
  }
  var title = req.params.title;
  var listBook = Object.values(books).filter(b => b.title.toLowerCase() === title.toLowerCase());
  if (!listBook || listBook.length === 0) {
    return res.status(501).json({message: `There is not a book with title ${title}`});
  }
  return res.status(200).json({
    message: `Success`,
    data: listBook
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
