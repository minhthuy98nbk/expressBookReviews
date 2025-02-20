const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
  var listUser = users.filter(u => u.username === username); 
  return listUser.length !== 0;
}

const authenticatedUser = (username,password)=>{ 
  var listUser = users.filter(u => u.username === username && u.password === password); 
  return listUser.length === 0 ? null : listUser[0];
}

//only registered users can login
regd_users.post("/register", (req,res) => {
  var username = req.body.username;
  var password = req.body.password;
  if (isValid(username)) {
    return res.status(500).json({message: `Username ${username} has exists`});
  }
  users.push({username: username, password: password})
  return res.status(200).json({message: `Username ${username} registers success`});
});

//only registered users can login
regd_users.post("/login", (req,res) => {
  var username = req.body.username;
  var password = req.body.password;
  var user = authenticatedUser(username, password);
  if (!user) {
    return res.status(500).json({message: `Username or password is wrong`});
  }

  let accessToken = jwt.sign({
    data: user
  }, 'access', { expiresIn: 60 * 60 });

  req.session.authorization = {
    accessToken
  };
  return res.status(200).json({
    message: `Username ${username} login success`, 
    accessToken: accessToken
  });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  var isbn = req.params.isbn;
  var review = req.body.review;
  var username = req.user.data.username;

  if (!books || Object.keys(books).length === 0) {
    return res.status(500).json({message: "List book is empty"});
  }
  var bookCheck = books[isbn];
  if (!bookCheck) {
    return res.status(501).json({message: `Book isbn ${isbn} is not available`});
  }
  var typeReview = !bookCheck.reviews[username] ? "add" : "update";
  bookCheck.reviews[username] = review;
  return res.status(200).json({
    message: `User ${username} ${typeReview} review of book ${isbn} success`, 
    book: bookCheck
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
