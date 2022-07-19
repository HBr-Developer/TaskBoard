const express = require("express");
const router = express.Router();
const { allPermissions, addPermission, getCardPermissionsOfMember } = require("../controllers/cardPermissionController")

// const { protect } = require('../middleware/authMiddleware');

router.get("/", allPermissions);
router.post("/", addPermission);
router.get("/:member", getCardPermissionsOfMember);

module.exports = router;