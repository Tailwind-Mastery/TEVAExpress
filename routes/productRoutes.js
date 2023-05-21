import express from 'express'
import { deleteProduct, getDeletedProducsWithColumnValue, getDeletedProducsWithOrder, getDeletedProducts, getProducsWithColumnValue, getProducsWithOrder, getProducts, getSingleProduct, recoverProduct, softDeleteProduct, storeProduct, updateProduct } from '../controller/productController.js';

const router = express.Router();

router.get('/all', getProducts)
router.get('/deleted', getDeletedProducts)
router.get('/order/:field', getProducsWithOrder)
router.get('/orderDeleted/:field', getDeletedProducsWithOrder)
router.post('/columnValue', getProducsWithColumnValue)
router.post('/columnValueDeleted', getDeletedProducsWithColumnValue)
router.get('/single/:id', getSingleProduct)
router.patch('/update', updateProduct)
router.patch('/softDelete', softDeleteProduct)
router.patch('/recover', recoverProduct)
router.delete('/delete', deleteProduct)
router.post('/store', storeProduct)

export default router