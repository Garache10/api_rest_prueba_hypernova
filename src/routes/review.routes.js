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

// http://localhost:4095/reviews/
review_router.get('/', getAllReviews);

// http://localhost:4095/reviews/:id
review_router.get('/:id', getReviewById);

// http://localhost:4095/reviews/
review_router.post('/', insertReview);

// http://localhost:4095/reviews/:id
review_router.delete('/:id', deleteReview);

// http://localhost:4095/reviews/:id
review_router.put('/:id', updateReview);

/* Mostrar Reseña de la renta elegida 
http://localhost:4095/reviews/rent/:id      */
review_router.get('/rent/:id', getReviewByRent);

module.exports = {
    review_router
}