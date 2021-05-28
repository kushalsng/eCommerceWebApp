const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(403).json({
                error: `Error in Product Search!\n ${JSON.stringify(err)}`
            })
        }
        req.prod = product
        next();
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Error in parsing image."
            })
        }

        //TODO: restrictions on fields

        //destructuring the fields
        const { name, description, price, category, stock } = fields;

        if( !name || !description || !price || !category|| !stock){
            return res.status(400).json({
                error: "Please include all fields"
            });
        }

        const product = new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "file size too big!"
                })
            }
            //path of the photo will be entered in the data
            //field of photo.
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        // console.log(product)

        //save product to db
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "error in saving product to db."
                });
            }
            res.json(product);
        })
    })
}


exports.getProduct = (req, res) => {
    req.prod.photo = undefined;
    res.json(req.prod)
}

//middleware
exports.photo = (req, res, next) => {
    if(req.prod.photo.data){
        //res.set() method sets the http header field to value.
        //To set multiple value, we can send object as paraameter
        res.set("Content-Type", req.prod.photo.contentType)
        return res.send(req.prod.photo.data)
    }
    next();
}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    
    Product.find()
    .populate("category")
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err){
            return res.status(400).json({
                message: "error in getting all products"
            })
        }
        res.json(products)
    })
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if(err){
            res.status(400).json({
                error:"Error in getting all unique categories"
            })
        }
        res.json(JSON.stringify(categories))
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Error in parsing image."
            })
        }

        //updation code
        let product = req.prod;
        product = _.extend(product, fields)


        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "file size too big!"
                })
            }
            //path of the photo will be entered in the data
            //field of photo.
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        // console.log(product)

        //save product to db
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "error in product updation"
                });
            }
            res.json(product);
        })
    })
}


exports.deleteProduct = (req, res) => {
    let product = req.prod;
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Error in deleting product"
            })
        }
        res.json({
            message:"Product deletion was successful",deletedProduct
        })
    })
}

exports.updateStock = (req, res, next) => {
    let operations = req.body.order.products.map(prod => {
        return {
            updateOne:{
                filter:{_id: prod._id},
                update:{$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Error in bulk operation"
            })
        }
        next()
    })
}
