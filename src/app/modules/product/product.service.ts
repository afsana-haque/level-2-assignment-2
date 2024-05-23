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
  
  const getSingleProductsFromDB = async ( _id : string) => {
    const result = await ProductModel.findOne({ _id });
    return result;
  };

  const deleteProductFromDB = async (_id: string) => {
    const result = await ProductModel.findByIdAndDelete({ _id });
  return result;
  };
  
  const updateSingleProductValue = async (_id: string, updatedData: Product) => {
    const result = await ProductModel.findByIdAndUpdate(_id, updatedData, {
      new: true,
    });
    return result;
  };

  const searchProductValue = async (searchTerm: string) => {
    const result = await ProductModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    });
    return result;
  };
  
  export const ProductServices = {
    createProductsIntoDB,
    getAllProductsFromDB,
    getSingleProductsFromDB,
    deleteProductFromDB,
    updateSingleProductValue,
    searchProductValue
  };