const router = require('express').Router();
const SomeModel = require('../models/test');


router.get('/data', (req, res) => {
    res.json({
        name: 'Ashiqur Rahman',
        email: 'md.ashik.ar@gmail.com'
    });
});

router.post('/addname', (req, res) => {
    var myData = new SomeModel({
        email : req.body.email,
        password : req.body.password
    });
    myData.save()
        .then(item => {
            res.send("item saved to database")
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        })
})

module.exports = router;