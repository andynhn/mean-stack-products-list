console.log("inside of server/controllers/products.js");

const mongoose = require("mongoose"),
        Product = mongoose.model("Product");

class Products {
    getProducts(req, res){
        Product.find({}).sort({"name": 1}).exec( function(err,products){
            if(err) {
                res.json({"status": "not ok", "errors": err})
            } else {
                res.json({"status": "ok", "products": products});
            }
        });
    }
    getProduct(req, res){
        Product.findById(req.params.id, function(err, product) {
            if(err) {
                res.json({"status": "not ok", "errors": err});
            } else {
                res.json({"status": "ok", "product": product});
            }
        });
    }
    createProduct(req, res){
        Product.findOne({name: req.body.name}, function(err, product){
            if(product){
                // res.json({"status": "repeat product", "message": "This product already exists in the database"});
                res.json({"status": "not ok", "errors": {"errors": {"repeat": {"message": "This product already exists in the database"}}}});

            } else {
                let product = new Product(req.body);
                product.save(function(err) {
                    if(err) {
                        res.json({"status": "not ok", "errors": err});
                    } else {
                        res.json({"status": "ok"});
                    }
                });
            }
        });
    }

    updateProduct(req, res){
        var flag = true;
        Product.find({_id: { $nin: req.params.id }}, function(err, products){
            for(let entry of products){
                console.log(entry, entry.name)
                if(entry.name == req.body.name.toLowerCase()){
                    flag = false;
                    res.json({"status": "not ok", "errors": {"errors": {"repeat": {"message": "This Product already exists in the database"}}}});
                    break;
                } 
            }
            if (flag == true){
                Product.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, product) {
                    if(err) {
                        res.json({"status": "not ok", "errors": err});
                    } else {
                        res.json({"status": "ok"});
                    }
                });
            }
        });
    }
    deleteProduct(req, res){
        Product.findByIdAndDelete(req.params.id, function(err) {
            if(err) {
                res.json({"status": "not ok", "errors": err});
            } else {
                res.json({"status": "ok"});
            }
        });
    }
}
module.exports = new Products();