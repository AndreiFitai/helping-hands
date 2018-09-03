const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/create-event", (req, res, next) => {
  res.render("event-create");
});

module.exports = router;
