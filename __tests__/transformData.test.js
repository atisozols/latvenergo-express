const transformData = require('../utils/transformData');
const { outputSchema } = require('../config/schemas');

const phoneObject = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
  images: [
    'https://cdn.dummyjson.com/product-images/1/1.jpg',
    'https://cdn.dummyjson.com/product-images/1/2.jpg',
    'https://cdn.dummyjson.com/product-images/1/3.jpg',
    'https://cdn.dummyjson.com/product-images/1/4.jpg',
    'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
  ],
};

describe('Data transformation with discount calculation', () => {
  it('should calculate discount and return only the relevant fields', () => {
    expect(transformData(phoneObject).final_price).toBe('477.85');

    const { error } = outputSchema.validate([transformData(phoneObject)]);

    expect(error).toBeUndefined();
  });
});
