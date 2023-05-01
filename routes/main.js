const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const homeController = require("../controllers/home");
const mainController = require("../controllers/main");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.post("/createBadge", upload.single("file"), mainController.createBadge);
router.get("/socialBadge", mainController.getBadge);

module.exports = router;