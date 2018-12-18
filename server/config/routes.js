console.log("inside of server/config/routes.js")

const Product = require("../controllers/products.js");
const path = require('path');

module.exports = function(app) {
    app.get('/products', function(req, res) {
        Product.getProducts(req, res);
    });
    app.get('/products/:id', function(req, res) {
        Product.getProduct(req, res);
    });
    app.post('/products', function(req, res) {
        Product.createProduct(req, res);
    });
    app.put('/products/:id', function(req, res) {
        Product.updateProduct(req, res);
    });
    app.delete('/products/:id', function(req, res) {
        Product.deleteProduct(req, res);
    });
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("../widgets/public/dist/public/index.html"))
    });
}