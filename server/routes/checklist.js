const express = require("express");
const router = express.Router();
const checklistController = require("../controllers/checklist");
const author = require("../middlewares/authorization");

router.get("/", author, checklistController.read);
router.get("/:id", author, checklistController.readById);
router.post("/add", author, checklistController.create);
router.put("/update/:id", author, checklistController.update);
router.delete("/delete/:id", author, checklistController.destroy);

module.exports = router;
