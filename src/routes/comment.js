const express = require("express")
const router = express.Router()
const commentController = require("../controllers/CommentControllers")
//const upload = require("../config/cloudinary")

router.get("/", commentController.getAllComment)
router.get("/:id", commentController.getCommentById)
router.post("/add", commentController.addComment)
// router.put("/update/:id", commentController.updateComment)
router.get("/delete/:id", commentController.deleteComment)

module.exports = router
