import { Schema, model } from "mongoose";
import { Inventory, Product, ProductVariant } from "./product.interface";


const productVariantSchema = new Schema<ProductVariant>({
  type: {
    type: String,
    required: [true, "Variant type is required"],
    trim: true,
  },
  value: {
    type: String,
    required: [true, "Variant value is required"],
    trim: true,
  },
});

// Define the Inventory schema
const productInventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Quantity cannot be negative"],
  },
  inStock: {
    type: Boolean,
    required: [true, "In stock status is required"],
  },
});

// Define the Product schema
const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Product price cannot be negative"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    trim: true,
  },
  tags: {
    type: [String],
    validate: {
      validator: (value: string[]) => Array.isArray(value) && value.length > 0,
      message: "There must be at least one tag",
    },
  },
  variants: {
    type: [productVariantSchema],
    validate: {
      validator: (value: ProductVariant[]) =>
        Array.isArray(value) && value.length > 0,
      message: "There must be at least one variant",
    },
  },
  inventory: {
    type: productInventorySchema,
    required: [true, "Inventory details are required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  
});

// Create and export the Product model
export const ProductModel = model<Product>("Product", productSchema);