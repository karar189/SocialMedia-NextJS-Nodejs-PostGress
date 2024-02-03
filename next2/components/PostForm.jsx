import React from "react";
import { useStore } from "../store/index";

const PostForm = () => {
  const {
    newPostTitle,
    setNewPostTitle,
    newPostContent,
    setNewPostContent,
    newPostImageUrl,
    setNewPostImageUrl,
    addNewPost,
  } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNewPost();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        placeholder="Content"
        required
      />
      <input
        type="text"
        value={newPostImageUrl}
        onChange={(e) => setNewPostImageUrl(e.target.value)}
        placeholder="Image URL"
        required
      />
      <button type="submit">Submit Post</button>
    </form>
  );
};

export default PostForm;
