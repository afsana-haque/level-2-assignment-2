import Joi from "joi";

const orderSchemaJoi = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
    "string.email": "Please provide a valid email address",
  }),
  productId: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Product ID is required",
      "string.empty": "Product ID cannot be empty",
      "string.pattern.base": "Product ID must be a valid ObjectId",
    }),
  price: Joi.number().min(0).required().messages({
    "any.required": "Price is required",
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
  }),
  quantity: Joi.number().min(1).required().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
  }),
});

export default orderSchemaJoi;