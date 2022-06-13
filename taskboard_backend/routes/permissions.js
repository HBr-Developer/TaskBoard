const express = require("express");
const router = express.Router();
const { allPermissions } = require("../controllers/permissionController")

router.get("/", allPermissions);

module.exports = router;