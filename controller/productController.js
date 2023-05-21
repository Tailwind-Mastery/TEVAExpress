import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const storeProduct = asyncHandler(async (req, res) => {

    const {userId, productCategoryId, title, slug, featured, price, description} = req.body
    const product = await Product.create({
        userId, productCategoryId, title, slug, featured, price, description
    })

    if(product) {
        res.status(201).json({
            _id: product._id,
            userId: product.userId,
            productCategoryId: product.productCategoryId,
            title: product.title,
            slug: product.slug,
            featured: product.featured,
            price: product.price
        })
    } else {
        res.status(400)
        throw new Error('Invalid Data')
    }
})

const softDeleteProduct = asyncHandler(async (req, res) => {
    const {id} = req.body
    const product = await Product.updateOne({_id: id}, {isDeleted: true});
    res.status(201).json('Product Soft Deleted')
})

const recoverProduct = asyncHandler(async (req, res) => {
    const {id} = req.body
    const product = await Product.updateOne({_id: id}, {isDeleted: false});
    res.status(201).json('Product Recovered')
})

const deleteProduct = asyncHandler(async (req, res) => {
    const {id} = req.body
    const product = await Product.deleteOne({_id: id})
    res.status(201).json('Product Deleted')
})

const getProducts = asyncHandler(async (req, res) => {
    const product = await Product.find({isDeleted: false}).exec()
    res.status(200).json(product)
})

const getDeletedProducts = asyncHandler(async (req, res) => {
    const product = await Product.find({isDeleted: true}).exec()
    res.status(200).json(product)
})

const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findOne({_id: req.params.id})
    res.status(200).json(product)
})

const updateProduct = asyncHandler(async (req, res) => {

    const {id, userId, productCategoryId, title, slug, price, description, featured} = req.body
    const product = await Product.findOneAndUpdate({_id: id}, {
        userId: userId,
        productCategoryId: productCategoryId,
        title: title,
        slug: slug,
        price: price,
        description: description,
        featured: featured,

    });
    res.status(201).json('Product Updated')
    
})

const getProducsWithOrder = asyncHandler(async (req, res) => {
    const {field} = req.params
    let products;

    switch (field) {
        case 'id':
            products = await Product.find({isDeleted: false}).sort({_id: 'asc'}).exec()
            break;
        case 'userId':
            products = await Product.find({isDeleted: false}).sort({userId: 'asc'}).exec()
            break;
        case 'title':
            products = await Product.find({isDeleted: false}).sort({title: 'asc'}).exec()
            break;
        case 'slug':
            products = await Product.find({isDeleted: false}).sort({slug: 'asc'}).exec()
            break;
        case 'price':
            products = await Product.find({isDeleted: false}).sort({price: 'asc'}).exec()
            break;
        case 'productCategoryId':
            products = await Product.find({isDeleted: false}).sort({productCategoryId: 'asc'}).exec()
            break;
        case 'updatedAt':
            products = await Product.find({isDeleted: false}).sort({updatedAt: 'desc'}).exec()
            break;
    
        default:
            break;
    }
    
    res.status(200).json(products)
})

const getDeletedProducsWithOrder = asyncHandler(async (req, res) => {
    const {field} = req.params
    let products;

    switch (field) {
        case 'id':
            products = await Product.find({isDeleted: true}).sort({_id: 'asc'}).exec()
            break;
        case 'userId':
            products = await Product.find({isDeleted: true}).sort({userId: 'asc'}).exec()
            break;
        case 'title':
            products = await Product.find({isDeleted: true}).sort({title: 'asc'}).exec()
            break;
        case 'slug':
            products = await Product.find({isDeleted: true}).sort({slug: 'asc'}).exec()
            break;
        case 'price':
            products = await Product.find({isDeleted: true}).sort({price: 'asc'}).exec()
            break;
        case 'productCategoryId':
            products = await Product.find({isDeleted: true}).sort({productCategoryId: 'asc'}).exec()
            break;
        case 'updatedAt':
            products = await Product.find({isDeleted: false}).sort({updatedAt: 'desc'}).exec()
            break;
    
        default:
            break;
    }
    
    res.status(200).json(products)
})

const getProducsWithColumnValue = asyncHandler(async (req, res) => {
    const {field, userId, featured } = req.body

    let products;

    switch (field) {
        case 'userId':
            products = await Product.find({isDeleted: false, userId: userId}).exec()
            break;
        case 'featured':
            products = await Product.find({isDeleted: false, featured: featured}).exec()
            break;
    
        default:
            break;
    }
    
    res.status(200).json(products)
})

const getDeletedProducsWithColumnValue = asyncHandler(async (req, res) => {
    const {field, userId, featured } = req.body

    let products;

    switch (field) {
        case 'userId':
            products = await Product.find({isDeleted: true, userId: userId}).exec()
            break;
        case 'featured':
            products = await Product.find({isDeleted: true, featured: featured}).exec()
            break;
    
        default:
            break;
    }
    
    res.status(200).json(products)
})

export {
    storeProduct,
    updateProduct,
    getProducts,
    getDeletedProducts,
    softDeleteProduct,
    deleteProduct,
    getSingleProduct,
    recoverProduct,
    getProducsWithOrder,
    getDeletedProducsWithOrder,
    getProducsWithColumnValue,
    getDeletedProducsWithColumnValue
}