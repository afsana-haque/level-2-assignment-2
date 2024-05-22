import express from 'express';
import { ProductController } from './product.controller';


const router = express.Router();

//will call controller func
router.post('/create-product', ProductController.createProduct);

router.get('/:productId', ProductController.getSingleProduct);

router.delete('/:productId', ProductController.deleteProduct);

router.get('/', ProductController.getAllProducts);

export const ProductRoutes = router;
