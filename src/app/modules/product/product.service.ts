import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductsIntoDB = async (product: Product) => {
    const result = await ProductModel.create(product);
    return result;
  };
  
  const getAllProductsFromDB = async () => {
    const result = await ProductModel.find();
    return result;
  };
  
  const getSingleProductsFromDB = async (id: string) => {
    const result = await ProductModel.findOne({ id });
    return result;
  };

  const deleteProductFromDB = async (id: string) => {
    const result = await ProductModel.updateOne({ id }, { isDeleted: true });
    return result;
  };
  
  export const ProductServices = {
    createProductsIntoDB,
    getAllProductsFromDB,
    getSingleProductsFromDB,
    deleteProductFromDB 
  };