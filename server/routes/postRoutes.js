const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/user/:userId", postController.getPostsByUser);
router.get("/search", postController.searchPosts);
router.get("/:postId", postController.getPostById);

router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);

router.post("/:postId/like", postController.likePost);
router.post("/:postId/dislike", postController.dislikePost);

module.exports = router;
