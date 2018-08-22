const express = require("express");
const router = express.Router();
const amtController = require("../controllers/mobiltangkis");
const auth = require("../middlewares/authentication");

router.get("/", auth, amtController.read);
router.get("/:id", auth, amtController.readById);
router.post("/add", auth, amtController.create);
router.put("/update/:id", auth, amtController.update);
router.delete("/delete/:id", auth, amtController.destroy);

module.exports = router;
