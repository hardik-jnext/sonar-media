const express = require("express");
const router = express.Router();
const {
  getcategory,
  createCategory,
  editCategory,
  deleteCategory,
  postwithoutcaegory
} = require("../../Controllers/category.controller.js");

router.get("/all-catgory", getcategory);

router.post("/category-create", createCategory);

router.put("/category-update/:id", editCategory);

router.delete("/category-delete/:id", deleteCategory);

router.get("/post-without-category",postwithoutcaegory)

module.exports = router;
