// Coded by Christopher Barber, Jesse Thadi, Icah Vega, Alex Uk with attributions to SAIT Webdev including Tony Grimes and Ashlyn Knox code and classes
const express = require('express')
const app = express()
const router = express.Router();
const subscribers = require('../models/subscriber')
//connect to database
const mongoose = require('mongoose');

const dogImagesSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  imgURL: String,
  width: Number,
  height: Number,
});
const DogImage = mongoose.model('Dog-Image', dogImagesSchema)

router.get('/dog-images', async (req, res) => {  
  try{
    const dogImage = await DogImage.find()  
    res.send(dogImage)
  } catch (error) {
    res.send({error: 'Dog Image Not Found'})
  }
})

router.get('/dog-images/:id', async (req, res) => { 
  try{
    const dogImage = await DogImage.findOne({ id: req.params.id })
    if(!dogImage) {
      throw new Error()
    }
    res.send(dogImage)
  } catch (error) {
    res.status(404)    
    res.send({error: 'Dog Image Not Found'})
  } 
})

app.post('/api/subscribers', async (request, response) => {

  try {
    const subscriber = new Subscriber(request.body)
  
    await subscriber.save()
  
    console.log(subscriber)
    response.redirect('/success.html')

  } catch(err) {

    console.log(err)
    response.redirect('/fail.html')
    
  }
})

module.exports = router