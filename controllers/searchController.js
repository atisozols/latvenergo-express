const schemas = require('../config/schemas');
const transformData = require('../utils/transformData');

const searchItems = async (req, res) => {
  try {
    const request = await schemas.inputSchema.validateAsync(req.body);
    const { query } = request;
    const { page } = request;
    const productCountLimit = 2;
    const skip = (page - 1) * productCountLimit;

    const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=2&skip=${skip}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    const results = data.products.map((product) => transformData(product));

    res.set('Content-Type', 'application/json');
    res.status(200).send(results);
  } catch (error) {
    if (error.details) {
      res.status(400).send({ code: 400, message: error.details[0].message });
    } else {
      res.status(500).send({ code: 500, message: error.message });
    }
  }
};

module.exports = { searchItems };
