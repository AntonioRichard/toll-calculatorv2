const express = require("express");
const {
  newRoute,
  searchVignettes,
  addToFavorites,
  getFavoriteRoutes,
  removeFromFavorites,
} = require("../controllers/tollsController");
const router = express.Router();

// get tolls
router.post("/route", newRoute);
router.post("/searchVignettes", searchVignettes);

// get favorite routes
router.get("/favorites", getFavoriteRoutes);

// add route to favorite
router.post("/favorites", addToFavorites);

// remove route from favorites
router.delete("/favorites", removeFromFavorites);

module.exports = router;
