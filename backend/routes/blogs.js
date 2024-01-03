const express = require('express');

const router = express.Router();

const {
    getAllBlogs,
    postBlog,
    deleteBlog
} = require('../controllers/blogController');

// retrieve a list of all pad service records
router.get('/', getAllBlogs);

// create a new pad service record for a user
router.post('/', postBlog);

// delete the pad service with the specified id (the id will be the email of the user)
router.delete('/:id', deleteBlog);

module.exports = router;