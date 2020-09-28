const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    FoodName: {
        type: String,
        required: true
    },
    FoodImage: {
        type: String,
        required: true
    },
    Price: {
        type:String,
        required: true
    },
    Quantity: {
        type: String,
        required: true
    },
    FullName: {
        type:String,
        required:true
    },
    TableName: {
        type:String,
        required:true
    },
    isConfirmed: {
        type:Boolean,
        required:true
    },
    isCompleted: {
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model('Order', OrderSchema);