const express = require("express");
const router = express.Router();
const { allPermissions, addPermission, updatePermission } = require("../controllers/permissionController")

const { protect } = require('../middleware/authMiddleware');

router.get("/", allPermissions);
router.post("/", protect, addPermission);
router.patch("/", updatePermission);

module.exports = router;