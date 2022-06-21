const express = require("express");
const router = express.Router();
const { allPermissions, addPermission } = require("../controllers/cardPermissionController")

const { protect } = require('../middleware/authMiddleware');

router.get("/", allPermissions);
router.post("/", protect, addPermission);

module.exports = router;