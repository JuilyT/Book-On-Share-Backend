const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const emailController = require('./email/email.controller');

const bookRoutes = express.Router();
const userRoutes = express.Router();

const PORT = 4001;

let Book = require('./model/book.model');
let User = require('./model/user.model');

app.use(cors());
app.use(bodyParser.json());

var bookDataConn      = mongoose.createConnection('mongodb://127.0.0.1:27017/books', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
var userDataConn     = mongoose.createConnection('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

var BookModel    = bookDataConn.model('Book', Book);
var UserModel    = userDataConn.model('User', User);

bookDataConn.once('open', function() {
    console.log("MongoDB book database connection established successfully");
})
userDataConn.once('open', function() {
    console.log("MongoDB user database connection established successfully");
})

bookRoutes.route('/').get(function(req, res) {
    const {status, borrowerId, page, title} = req.query;
    const searchQuery = title ? { title } : { };
    let statusQuery = status ? {...searchQuery, status} : searchQuery;
    const finalQuery = borrowerId ? 
                                    {...statusQuery, 'borrower.id' : borrowerId } 
                                  : statusQuery;
    const perPage = 10, offset = Math.max(0, page);

    BookModel.find(finalQuery).limit(perPage).skip(perPage * (offset-1))
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            console.log(err);
        });
});

bookRoutes.route('/').post(function(req, res) {
    let book = new BookModel(req.body);
    book.save()
        .then(book => {
            res.status(200).json({'book': 'book uploaded successfully'});
        })
        .catch(err => {
            res.status(400).send('uploading new book failed');
        });
});

bookRoutes.route('/:id').put(function(req, res) {
    let id = req.params.id;
    let book = {...req.body};

    BookModel.findByIdAndUpdate(id, book)
        .then(book => {
            res.status(200).json({'book': 'Book has been been borrowed successfully'});
        })
        .catch(err => {
            res.status(400).send('Borrowing book failed');
        });
});

userRoutes.route('/').get(function(req, res) {
    UserModel.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/').post(function(req, res) {
    let user = new UserModel(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user saved successfully'});
        })
        .catch(err => {
            res.status(400).send('saving new user failed');
        });
});

userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    UserModel.findOne({id}, function(err, user) {
        res.json(user);
    })
    
});

userRoutes.route('/:id').delete(function(req, res) {
    let id = req.params.id;
    UserModel.findOneAndDelete({id})
        .then(user => {
            res.status(200).json({'user': 'current user removed successfully'});
        })
        .catch(err => {
            res.status(400).send('removing current user failed');
        })
});

app.post('/email', emailController.collectEmail);

app.use('/books', bookRoutes);
app.use('/users', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});