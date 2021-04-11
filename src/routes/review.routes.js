const express = require('express');
const review_router = express.Router();
const {
    getAllReviews,
    getReviewById,
    insertReview,
    deleteReview,
    updateReview,
    getReviewByRent
} = require('../controllers/review.controller');

//Routes to reviews
review_router.get('/', getAllReviews);
review_router.get('/:id', getReviewById);
review_router.post('/', insertReview);
review_router.delete('/:id', deleteReview);
review_router.put('/:id', updateReview);

//Get review by rent
review_router.get('/rent/:id', getReviewByRent);

module.exports = {
    review_router
}