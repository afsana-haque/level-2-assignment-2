import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productSchemaJoi from "./product.validation";


const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    //  schema a validation using Joi
    const { error, value } = productSchemaJoi.validate(productData);

    const result = await ProductServices.createProductsIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err,
    });
  }
  };

  const getAllProducts = async (req: Request, res: Response) => {

    try {
      const { searchTerm } = req.query;
  
      if (searchTerm) {
        const result = await ProductServices.searchProductValue(
          searchTerm as string
        );
  
        res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: result,
        });
  
        if (!searchTerm) {
          return res
            .status(400)
            .json({ success: false, message: "Search term is required" });
        }
      } else {
        const result = await ProductServices.getAllProductsFromDB();
  
        res.status(200).json({
          success: true,
          message: "Products fetched successfully!",
          data: result,
        });
      }
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
        message: "Product fetched successfully!",
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteProduct = async (req: Request, res: Response) => {
  
    try {
      const { productId } = req.params;
  
      const result = await ProductServices.deleteProductFromDB(productId);
  
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: result,
      });
    } catch (err) {
      console.log(err);
    };
  };

  const updateSingleProduct= async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const updatedProduct = req.body;
  
      //  schema a validation using Joi
      const { error, value } = productSchemaJoi.validate(updatedProduct);
  
      const result = await ProductServices.updateSingleProductValue(
        productId,
        value
      );
  
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message || "something went wrong",
          error: error.details,
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateSingleProduct,
    
 
  };