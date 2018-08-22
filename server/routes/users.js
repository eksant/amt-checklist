const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const auth = require("../middlewares/authentication");

router.get("/", auth, userController.read);
router.get("/:id", auth, userController.readById);
router.post("/add", auth, userController.create);
router.put("/update/:id", auth, userController.update);
router.delete("/delete/:id", auth, userController.destroy);

module.exports = router;
