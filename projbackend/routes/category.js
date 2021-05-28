const express = require("express")
const router = express.Router();

const {
    getCategoryById,
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    removeCategory
} = require("../controllers/category")
const { isSignedIn, isAdmin, isAuthentic } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

//parmas
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//create
router.post("/category/create/:userId",
    isSignedIn,
    isAuthentic,
    isAdmin,
    createCategory
);
    
//read
router.get("/category/:categoryId", getCategory);


router.get("/categories", getAllCategory);
    
//update
router.put("/category/:categoryId/:userId",
    isSignedIn,
    isAuthentic,
    isAdmin,
    updateCategory
)

//delete
router.delete("/category/:categoryId/:userId",
    isSignedIn,
    isAuthentic,
    isAdmin,
    removeCategory
)

module.exports = router;