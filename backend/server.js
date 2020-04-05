const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost/reduxcrud';

function validate(data) {
    let errors = {};
    if (data.title.trim() === '') errors.title = "Can't be empty";
    if (data.cover.trim() === '') errors.cover = "Can't be empty";
    const isValid = Object.keys(errors).length === 0;
    return { errors, isValid };
}

function validateMovies(data) {
    let errors = {};
    if (data.name.trim() === '') errors.name = "Can't be empty";
    if (data.type.trim() === '') errors.type = "Can't be empty";
    if (data.year.trim() === '') errors.year = "Can't be empty";
    if (data.cover.trim() === '') errors.cover = "Can't be empty";
    const isValid = Object.keys(errors).length === 0;
    return { errors, isValid };
}

mongoose.connect(dbUrl, function(err, db){
    console.log("connected")
    /*
    * 
    * Game APIs
    *
    */ 
    app.get('/api/games', (req, res) => {
        db.collection('games').find({}).toArray((err, games) => {
            res.json(games);
        });
    })

    app.post('/api/games', (req, res) => {
        const { errors, isValid } = validate(req.body);
        if (isValid) {
            const { title, cover } = req.body;
            db.collection('games').insert({ title, cover }, (err, result) => {
                if (err) {
                    res.status(500).json({ errors: { global: 'Something went wrong ' } })
                } else {
                    res.json({ game: result.ops[0] })
                }
            })
        } else {
            res.status(400).json({ errors });
        }
    })

    app.get('/api/games/:_id', (req, res) => {
        db.collection('games').findOne({ _id: new mongoose.Types.ObjectId(req.params._id) }, (err, game) => {
            res.json(game);
        })
    })

    app.put('/api/games/:_id', (req, res) => {
        const { errors, isValid } = validate(req.body);

        if (isValid) {
            const { title, cover } = req.body;
            db.collection('games').findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.params._id) },
                { $set: { title, cover } },
                { returnOriginal: false },
                (err, result) => {
                    if (err) { res.status(500).json({ errors: { global: err } }); return }
                    
                    res.json({ game: result.value });
                }
            )
        } else {
            res.status(400).json({ errors })
        }
    })

    app.delete('/api/games/:_id', (req, res) => {
        console.log('id ', req.params._id);
        db.collection('games').deleteOne({ _id: new mongoose.Types.ObjectId(req.params._id) }, (err, r) => {
            if (err) { res.status(500).json({ errors: { global: err }}); return }
            res.json({});
        })
    });

    /*
    * 
    * Movies APIs
    *
    */
   // Read
    app.get('/api/movies', (req, res) => {
        db.collection('movies').find({}).toArray((err, movies) => {
            res.json(movies);
        });
    })

    // Create 
    app.post('/api/movies', (req, res) => {
        const { errors, isValid } = validate(req.body);
        if (isValid) {
            const { name, type, year, cover } = req.body;
            db.collection('movies').insert({ name, type, year, cover }, (err, result) => {
                if (err) {
                    res.status(500).json({ errors: { global: 'Something went wrong ' } })
                } else {
                    res.json({ game: result.ops[0] })
                }
            })
        } else {
            res.status(400).json({ errors });
        }
    })

    // Detail
    app.get('/api/movies/:_id', (req, res) => {
        db.collection('movies').findOne({ _id: new mongoose.Types.ObjectId(req.params._id) }, (err, movie) => {
            res.json(movie);
        })
    })

    // Update
    app.put('/api/movies/:_id', (req, res) => {
        const { errors, isValid } = validate(req.body);

        if (isValid) {
            const { name, type, year, cover } = req.body;
            db.collection('movies').findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.params._id) },
                { $set: { name, type, year, cover } },
                { returnOriginal: false },
                (err, result) => {
                    if (err) { res.status(500).json({ errors: { global: err } }); return }
                    
                    res.json({ game: result.value });
                }
            )
        } else {
            res.status(400).json({ errors })
        }
    })

    // Delete
    app.delete('/api/movies/:_id', (req, res) => {
        console.log('id ', req.params._id);
        db.collection('movies').deleteOne({ _id: new mongoose.Types.ObjectId(req.params._id) }, (err, r) => {
            if (err) { res.status(500).json({ errors: { global: err }}); return }
            res.json({});
        })
    });

    app.use((req, res) => {
        res.status(404).json({
            errors: {
                global: "Please try again later"
            }
        })
    })
    app.listen(5000, () => console.log('Server is running on localhost:5000'));
});