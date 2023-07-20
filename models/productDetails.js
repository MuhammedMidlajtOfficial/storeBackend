const mongoose = require('mongoose');

const ProductDetailsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require:true
    },
    quantity: {
        type: Number,
        require:true
    },
    recievedQuantity: {
        type: Number,
        require:true
    },
    purchasedDate: {
        type: String,
        require:true
    },
    recievedDate: {
        type: String,
        require:true
    },
    stockBalance: {
        type: Number,
        require:true
    },
    additionalNumber: {
        type: Number,
        require:true
    },
    personName: {
        type: String,
        require:true
    },
})

module.exports = mongoose.model('ProductDetails', ProductDetailsSchema);