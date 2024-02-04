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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mr-10 mt-6"
    >
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          placeholder="Title"
          required
        />
      </div>
      <div className="mb-6">
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Content"
          required
          rows="4"
        ></textarea>
      </div>
      <div className="mb-6">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={newPostImageUrl}
          onChange={(e) => setNewPostImageUrl(e.target.value)}
          placeholder="Image URL"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
