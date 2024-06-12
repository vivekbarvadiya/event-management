const express = require("express");
const { createReview, getAllReviews, deleteReview } = require("../controllers/review.controller");
const {isAuthenticatedUser, isAuthenticated} = require("../middlewares/jwtAuth.js");

const router = express.Router();

router.post("/:serviceId",isAuthenticatedUser,createReview);
router.get("/:serviceId",isAuthenticated,getAllReviews);
router.delete("/:serviceId",isAuthenticated,deleteReview)


module.exports  = router; 