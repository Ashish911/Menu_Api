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
        TableName: req.body.TableName,
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

router.patch('/:id',(req, res) => {
    Order.findOne({
        _id: req.params.id
    }).then((Order) => {
        if (Order) {
            return true;
        }
        return false;
    }).then((canUploadImage) => {
        if (canUploadImage) {
            Order.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'Order updated successfully' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

module.exports = router;