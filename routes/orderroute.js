const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.post('/', (req, res) => {
    const post = new Order({
        FoodName: req.body.FoodName,
        FoodImage: req.body.FoodImage,
        Price: req.body.Price,
        Quantity: req.body.Quantity,
        FullName: req.body.FullName,
        TableNo: req.body.TableNo,
        isConfirmed: req.body.isConfirmed,
        isCompleted: req.body.isCompleted
    })
    post.save().then((order)=>{
        res.send(order)
    })
});

router.get('/',((req, res) => {
    Order.find({})
        .then((foodlist)=>{
            res.send(foodlist);
        }).catch((err)=>{
            res.send('Error', err.message)
    })
}))

router.delete('/:id', function(req,res){
    Order.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){
        res.send(e)
    })
})

module.exports = router;