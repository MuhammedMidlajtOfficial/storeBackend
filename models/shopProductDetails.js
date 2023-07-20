const mongoose = require('mongoose');

const shopProduct = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require:true
    },
    shopIntake: {
        type: Number,
        require:true
    },
    stockBalance: {
        type: Number,
        require:true
    },
    monthlySales: {
        type: Number,
        require:true
    },
    shopName: {
        type: String,
        require:true
    },
    personName: {
        type: String,
        require:true
    },
    
})

module.exports = mongoose.model('ShopProduct',shopProduct );