const express = require("express")
const router = express.Router();

const {
    getProductById,
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    photo,
    getAllUniqueCategories
} = require("../controllers/product")
const { isSignedIn, isAuthentic, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user")

//parmas
router.param("userId", getUserById);
router.param("productId", getProductById);

//Create
router.post("/product/create/:userId", isSignedIn, isAuthentic, isAdmin, createProduct)

//Read
router.get("/product/:productId", getProduct)
router.get("/products", getAllProducts)
router.get("/products/categories", getAllUniqueCategories)
    //middleware
router.get("/product/photo/:productId", photo, getAllProducts)

//Update
router.put("/product/:productId/:userId", isSignedIn, isAuthentic, isAdmin, updateProduct)

//Delete
router.delete("/product/:productId/:userId", isSignedIn, isAuthentic, isAdmin, deleteProduct)

module.exports = router;