const express = require('express');
const Food = require('../models/food');
const multer = require('multer');
const path = require('path');
const Category = require('../models/category');
const router = express.Router();

//path to store image
const storage = multer.diskStorage({
  destination: './upload/Images',
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    callback(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

//check file types
const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('You can upload only image files!'), false);
  }
  cb(null, true);
};
const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
});

//get all the foods
router.get('/', (req, res) => {
  Food.find({})
    .then((foodlist) => {
      res.send(foodlist);
    })
    .catch((err) => {
      res.send('Error', err.message);
    });
});

//post foods
router.post('/', upload.single('FoodImage'), (req, res) => {
  let newFood = new Food({
    FoodName: req.body.FoodName,
    FoodImage: req.file.filename,
    Tags: req.body.Tags,
    Tags2: req.body.Tags2,
    Description: req.body.Description,
    Price: req.body.Price,
    CategoryId: req.body.CategoryId,
  });
  newFood.save().then((foodDoc) => {
    res.send(foodDoc);
  });
});

//get food by id
router.get('/:id', (req, res, next) => {
  Food.findById(req.params.id)
    .exec()
    .then((doc) => {
      console.log(doc);
      res.send(doc.toJSON());
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//get category of food
router.get('/getByCategory/:id', async (req, res) => {
  try {
    console.log('here');
    const id = req.params.id;
    const data = await Food.find({ CategoryId: id });
    res.json(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

//search by foodName
router.get('/search/:foodName', async (req, res) => {
  const searchName = req.params.foodName;
  console.log(searchName);
  try {
    const search = await Food.find({ $text: { $search: searchName } });
    res.send(search);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete all food
router.delete('/', (req, res) => {
  Food.deleteMany({})
    .then((foodlist) => {
      res.send(foodlist);
    })
    .catch((err) => {
      res.send('Error', err.message);
    });
});

//delete food by id
router.delete('/:id', function (req, res) {
  Food.findByIdAndDelete(req.params.id)
    .then(function () {
      res.send('deleted');
    })
    .catch(function () {
      res.send(e);
    });
});

module.exports = router;
