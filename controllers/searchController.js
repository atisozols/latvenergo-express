const schemas = require('../config/schemas')

const searchItems = async (req, res) => {
    schemas.inputSchema.validateAsync(req.body).then(
        (request) => {
            const query = request.query
            const page = request.page
            const productCountLimit = 2
            const skip = (page - 1) * productCountLimit

            try{
                fetch("https://dummyjson.com/products/search?q=" + query + "&limit=2&skip=" + skip.toString(), 
                { method: 'GET', headers: { 'Content-Type': 'application/json' }})
                  .then(response => response.json())
                  .then(data => {
                    results = data.products.map(product => {
                        return {
                            title: product.title,
                            description: product.description,
                            final_price: (product.price * (1 - product.discountPercentage/100)).toFixed(2)
                        }
                    });

                    res.status(200).send(results)                    
                  })
                  .catch((error) => {
                    res.status(500).send({code: 500, message: error.message})
                  })
            }
            catch(err){
                res.sendStatus(500)
            }
        }
    ).catch((error) => {
        res.status(400).send({code: 400, message: error.details[0].message})
    }) 
}

module.exports = { searchItems }