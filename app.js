const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const ejs = require('ejs')
const path = require('path')
const Photo = require('./models/Photo')

const app = express();

// connect db
mongoose.connect('mongodb://localhost/pcat-test-db');

//TEPMLATE ENGINE 
app.set("view engine", "ejs");


//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }))

app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated')
    res.render('index', {
        photos
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('photo', { photo })
})

app.get('/add', (req, res) => {
    res.render('add')
})


app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findOne({
        _id: req.params.id
    })
    res.render('edit', { photo })
})

app.post('/photos', async (req, res) => {

    //console.log(req.files.image)

    //await Photo.create(req.body)


    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadImage.name
    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadImage.name
        })
        res.redirect('/')
    })



})

app.put('/photos/:id', async (req, res) => {
    const photo = await Photo.findOne({
        _id: req.params.id
    })
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save()
    res.redirect(`/photos/${req.params.id}`)
})

app.delete('/photos/:id', async (req, res) => {

    const photo = await Photo.findOne({ _id: req.params.id })
    let deletedImage = __dirname + '/public' + photo.image
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndDelete(req.params.id)
    res.redirect('/')

})


const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda baslatildi`)
})