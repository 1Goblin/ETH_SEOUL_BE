const express = require("express");
const User = require("../models/User");
const Idol = require("../models/Idol");
const { getToken, isAuth } = require("../util");

const router = express.Router();

module.exports = router;
