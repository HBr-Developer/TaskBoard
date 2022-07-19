const express = require("express");
const router = express.Router();
const { allPermissions, addPermission, updatePermission, userPermissions } = require("../controllers/permissionController")

const { protect } = require('../middleware/authMiddleware');

router.get("/", allPermissions);
router.post("/", protect, addPermission);
router.patch("/", updatePermission);
router.get("/:member", userPermissions);

module.exports = router;