import { ProductModel } from "../product/product.model";
import { OrderItem } from "./order.interface";
import { OrderSchemaModel } from "./order.model";


const createOrderDB = async (order: OrderItem) => {
  const product = await ProductModel.findById(order.productId);

  console.log("my product", product);

  if (!product) {
    throw Error("no product found");
  }

  if (order.quantity > product.inventory.quantity) {
    throw Error("Insufficient quantity available in inventory");
  }

  product.inventory.quantity -= order.quantity; // update inventory quantity
  product.inventory.inStock = product.inventory.quantity > 0; // update stock status

  await product.save(); // save product data in update quantity
  const result = await OrderSchemaModel.create(order); // create order
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await OrderSchemaModel.find();
  if (result.length === 0) {
    throw Error("Order not found");
  }
  return result;
};

const getOrdersUserEmailDB = async (userEmail: string) => {
  const result = await OrderSchemaModel.find({ email: userEmail });
  if (result.length === 0) {
    throw Error("Order not found");
  }
  return result;
};

export const OrderServices = {
  createOrderDB,
  getAllOrdersFromDB,
  getOrdersUserEmailDB,
};