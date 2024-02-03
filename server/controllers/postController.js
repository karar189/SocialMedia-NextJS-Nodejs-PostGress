const pool = require("../db/db"); // Assuming your database connection is in db.js

const createPost = async (req, res) => {
  try {
    const { user_id, title, content, image_url } = req.body;
    const newPost = await pool.query(
      "INSERT INTO posts (user_id, title, content, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, title, content, image_url]
    );
    res.json(newPost.rows[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM posts");
    res.json(allPosts.rows);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPostsByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userPosts = await pool.query(
      "SELECT * FROM posts WHERE user_id = $1",
      [userId]
    );
    res.json(userPosts.rows);
  } catch (error) {
    console.error("Error getting user posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchPosts = async (req, res) => {
  const searchTerm = req.query.term;
  try {
    const searchResults = await pool.query(
      "SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1",
      [`%${searchTerm}%`]
    );
    res.json(searchResults.rows);
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await pool.query("SELECT * FROM posts WHERE id = $1", [
      postId,
    ]);
    if (post.rows.length === 0) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json(post.rows[0]);
    }
  } catch (error) {
    console.error("Error getting post by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const { title, content, image_url } = req.body;
  try {
    const updatedPost = await pool.query(
      "UPDATE posts SET title = $1, content = $2, image_url = $3 WHERE id = $4 RETURNING *",
      [title, content, image_url, postId]
    );
    if (updatedPost.rows.length === 0) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json(updatedPost.rows[0]);
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const deletedPost = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [postId]
    );
    if (deletedPost.rows.length === 0) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json({ message: "Post deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const likePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.user_id;

  try {
    // Check if the user has already liked the post
    const existingLike = await pool.query(
      "SELECT * FROM likes WHERE user_id = $1 AND post_id = $2",
      [userId, postId]
    );

    if (existingLike.rows.length === 0) {
      // User hasn't liked the post, so add a new like
      await pool.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2)", [
        userId,
        postId,
      ]);

      // Update the like count in the posts table
      await pool.query(
        "UPDATE posts SET like_count = like_count + 1 WHERE id = $1",
        [postId]
      );

      res.json({ message: "Post liked successfully" });
    } else {
      // User has already liked the post, you can handle this case accordingly
      res.status(400).json({ error: "User has already liked the post" });
    }
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const dislikePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.user_id;

  try {
    // Check if the user has already disliked the post
    const existingDislike = await pool.query(
      "SELECT * FROM dislikes WHERE user_id = $1 AND post_id = $2",
      [userId, postId]
    );

    if (existingDislike.rows.length === 0) {
      // User hasn't disliked the post, so add a new dislike
      await pool.query(
        "INSERT INTO dislikes (user_id, post_id) VALUES ($1, $2)",
        [userId, postId]
      );

      // Update the dislike count in the posts table
      await pool.query(
        "UPDATE posts SET dislike_count = dislike_count + 1 WHERE id = $1",
        [postId]
      );

      res.json({ message: "Post disliked successfully" });
    } else {
      // User has already disliked the post, you can handle this case accordingly
      res.status(400).json({ error: "User has already disliked the post" });
    }
  } catch (error) {
    console.error("Error disliking post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsByUser,
  searchPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
};
