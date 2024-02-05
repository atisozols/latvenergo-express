const transformData = (product) => ({
  title: product.title,
  description: product.description,
  final_price: (product.price * (1 - product.discountPercentage / 100)).toFixed(2),
});

module.exports = transformData;
