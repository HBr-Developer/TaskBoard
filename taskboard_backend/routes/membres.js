const express = require("express");
const router = express.Router();
const {
    createMembre,
    MembreUpdate,
    getAllMembre,
    membreById,
    membreDelete
} = require("../controllers/membreController");


router.post("/create", createMembre);
router.patch("/:id", MembreUpdate);
router.get("/",getAllMembre);
router.get("/:id",membreById);
router.delete("/:id", membreDelete);

module.exports = router;
