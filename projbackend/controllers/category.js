const Category = require("../models/category")


exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Error in Category search"
            });
        }
        req.category = category;
        console.log(category)
        next();
    })
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body);

    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Failed to create Category"
            })
        }
        res.json(category)
    })
}

exports.getCategory = (req, res) => {
    res.json(req.category)
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: "Failed to find all category"
            })
        }
        res.json(categories)
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update category"
            })
        }
        res.json(updatedCategory)
    })
}

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, deletedCategory)=> {
        if(err){
            return res.status(400).json({
                error: "Failed to delete category"
            })
        }
        res.json({
            message: `the category ${deletedCategory} is successfully deleted`
        })
    })
}