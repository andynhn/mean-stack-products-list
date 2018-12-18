console.log("inside of server/models/product.js");

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Product name is required"], 
        minlength: [4, "Product name must be at least 4 characters"],
        lowercase: true,
    },
    price: { 
        type: Number, 
        required: [true, "Price is required"], 
        min: [0, "Price must be greater than $0.00"],
    },
    image: {
        type: String,
        default: '',
        //later add regex validation for proper image url.
    }
}, {timestamps: true})

mongoose.model("Product", ProductSchema);