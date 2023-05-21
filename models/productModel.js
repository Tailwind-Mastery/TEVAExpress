import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    productCategoryId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
}) 

const Product = mongoose.model('Product', productSchema)
export default Product;