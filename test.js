const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect db
mongoose.connect('mongodb://localhost/pcat-test-db');

// create Schema
const PhotoSchema = new Schema({
    title: String,
    description: String
})

//collection oluşturuyor
const Photo = mongoose.model('Photo',PhotoSchema);

//create a photo
/*Photo.create({
    title:"Photo2",
    description:"Aciklama 2 lorem ipsum"
})*/

//read a photo

/*Photo.find({}).then((data)=>{
    console.log(data)
})*/

//uptade photo
//const id = "67419621a6ad9accec2c265e";
/*Photo.findByIdAndUpdate(id,{
    title: "Photo 2 title uptaded",
    description:"Desc updated"
},{new:true}).then((data)=>{
    console.log(data)
}) */

//delete photo

/* Photo.findByIdAndDelete(id).then(data=>{
    console.log('Silindi',data)
}) */