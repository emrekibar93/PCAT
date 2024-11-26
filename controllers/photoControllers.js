const Photo = require ('../models/Photo')
const fs = require('fs')

exports.getAllPhotos = async (req, res) => {
    
    const page = req.query.page || 1
    const photosPerPage = 2
    const totalPhotos = await Photo.find().countDocuments()
    const photos = await Photo.find({}).sort('-dateCreated')
    .skip((page-1)*photosPerPage).limit(photosPerPage)

  //  const photos = await Photo.find({}).sort('-dateCreated')
   res.render('index', {
    photos,current: page,pages: Math.ceil(totalPhotos/photosPerPage)
   })
}

exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('photo', { photo })
}

exports.createPhoto = async (req, res) => {

    //console.log(req.files.image)

    //await Photo.create(req.body)


    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name
    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/../uploads/' + uploadImage.name
        })
        res.redirect('/')
    })
}


exports.updatePhoto =  async (req, res) => {
   d
}

exports.deletePhoto = async (req, res) => {

    const photo = await Photo.findOne({ _id: req.params.id })
    let deletedImage = __dirname + '/../public' + photo.image
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndDelete(req.params.id)
    res.redirect('/')
}