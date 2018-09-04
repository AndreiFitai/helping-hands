const express = require("express");
const api = express.Router();
const Event = require("../models/Event");

api.get("/", (req, res, next) => {
  Event.find({}).then(data => {
    res.send(data);
  });
});

module.exports = api;
