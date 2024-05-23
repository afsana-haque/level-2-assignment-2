import Joi from "joi";

// Define Joi schema for product variant
const productVariantSchemaJoi = Joi.object({
  type: Joi.string().trim().required().messages({
    "any.required": "Variant type is required",
    "string.empty": "Variant type cannot be empty",
  }),
  value: Joi.string().trim().required().messages({
    "any.required": "Variant value is required",
    "string.empty": "Variant value cannot be empty",
  }),
});

// Define Joi schema for inventory
const inventorySchemaJoi = Joi.object({
  quantity: Joi.number().min(0).required().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be a number",
    "number.min": "Quantity cannot be negative",
  }),
  inStock: Joi.boolean().required().messages({
    "any.required": "In stock status is required",
    "boolean.base": "In stock status must be a boolean value",
  }),
});

// Define Joi schema for product
const productSchemaJoi = Joi.object({
  name: Joi.string().trim().max(100).required().messages({
    "any.required": "Product name is required",
    "string.empty": "Product name cannot be empty",
    "string.max": "Product name cannot exceed 100 characters",
  }),
  description: Joi.string().trim().required().messages({
    "any.required": "Product description is required",
    "string.empty": "Product description cannot be empty",
  }),
  price: Joi.number().min(0).required().messages({
    "any.required": "Product price is required",
    "number.base": "Product price must be a number",
    "number.min": "Product price cannot be negative",
  }),
  category: Joi.string().trim().required().messages({
    "any.required": "Product category is required",
    "string.empty": "Product category cannot be empty",
  }),
  tags: Joi.array().items(Joi.string()).min(1).required().messages({
    "any.required": "There must be at least one tag",
    "array.min": "There must be at least one tag",
    "array.includesRequiredUnknowns": "Tag must be a string",
  }),
  variants: Joi.array()
    .items(productVariantSchemaJoi)
    .min(1)
    .required()
    .messages({
      "any.required": "There must be at least one variant",
      "array.min": "There must be at least one variant",
      "array.includesRequiredUnknowns": "Variant must be an object",
    }),
  inventory: inventorySchemaJoi.required().messages({
    "any.required": "Inventory details are required",
    "object.base": "Inventory details must be an object",
  }),
});

export default productSchemaJoi;