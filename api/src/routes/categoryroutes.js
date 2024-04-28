const { Category } = require('../db');
const { Router } = require('express');
const router = Router();
const {
    getCategory,
    createCategory,
    modifyCategory,
    deleteCategory,
} = require('../controllers/categoryController');

router.get('/', getCategory);

router.post('/', createCategory);

router.put('/:id', modifyCategory);

router.delete('/:id', deleteCategory);

module.exports = router;
