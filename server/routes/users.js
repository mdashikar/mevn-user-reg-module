const router = require('express').Router();


router.get('/getuser', (req, res) => {
    res.json({
        name: 'Ashiqur Rahman',
        email: 'md.ashik.ar@gmail.com'
    });
});

router.post('/adduser', (req, res) => {
    var userData = new UserModel({
        name : req.body.name,
        username: req.body.username,                                                                      
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