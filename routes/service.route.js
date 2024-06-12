const express = require("express");
const { isAuthenticatedVender, isAuthenticated } = require("../middlewares/jwtAuth");
const { createService, getAllService, getAllServiceVenders, updateService, deleteService, serviceDetails } = require("../controllers/service.controller");

const router = express.Router();

//venders
router.post("/create",isAuthenticatedVender,createService);

//all
router.get("/getAllService",isAuthenticated,getAllService);

//venders's service to venders only 
router.get("/getAllServiceForVenders/:id",isAuthenticatedVender,getAllServiceVenders);

//venders
router.put("/update/:id",isAuthenticatedVender,updateService);

//venders
router.delete("/delete/:id",isAuthenticatedVender,deleteService);

//all
router.get("/:id",isAuthenticated,serviceDetails);

module.exports  = router; 