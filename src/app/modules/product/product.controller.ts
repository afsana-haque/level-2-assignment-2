import { Request, Response } from "express";
import { ProductServices } from "./product.service";


const createProduct = async (req: Request, res: Response) => {
    try {
      const { product: ProductData } = req.body;
      const result = await ProductServices.createProductsIntoDB(ProductData);
      res.status(200).json({
        success: true,
        message: 'Product is created successfully',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
      });
    }
  };

  const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'Products are retrieved successfully',
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  const getSingleProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
  
      const result = await ProductServices.getSingleProductsFromDB(productId);
  
      res.status(200).json({
        success: true,
        message: 'Product is retrieved successfully',
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteProduct = async (req: Request, res: Response) => {
    try{
      const { productId } = req.params;
  
      const result = await ProductServices.deleteProductFromDB(productId);
  
      res.status(200).json({
        success: true,
        message: 'Product is deleted successfully',
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      });
    }
  };
  
  export const ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct
    
 
  };