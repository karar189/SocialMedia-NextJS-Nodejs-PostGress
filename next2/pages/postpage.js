import React, { useEffect, useState } from "react";
import { useStore } from "../store/index";
import ProtectedRoute from "../components/ProtectedRoute";
import PostItem from "../components/PostItem";
import PostForm from "../components/PostForm";
import SearchBar from "../components/SearchBar";

const PostPage = () => {
  const {
    user,
    posts,
    fetchPosts,
    fetchUserPosts,
    handleEditPost,
    handleUpdatePost,
    handleDeletePost,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPostsOnly, setShowUserPostsOnly] = useState(false);
  const handleShowUserPostsToggle = () => {
    setShowUserPostsOnly((prevState) => !prevState);
  };

  useEffect(() => {
    if (showUserPostsOnly) {
      fetchUserPosts();
    } else {
      fetchPosts();
    }
  }, [showUserPostsOnly, fetchPosts, fetchUserPosts]);

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearchTerm =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());

      return !showUserPostsOnly
        ? matchesSearchTerm
        : matchesSearchTerm && post.user_id === user.userId;
    })
    .reverse();

  return (
    <ProtectedRoute>
      <div className="flex h-screen  bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100  px-32">
        <div className="w-2/4 h-full overflow-y-auto sticky top-0 ">
          <div className=" mt-6">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <button
              className="my-2 p-2 bg-blue-500 text-white rounded"
              onClick={handleShowUserPostsToggle}
            >
              {showUserPostsOnly ? "Show All Posts" : "Show My Posts"}
            </button>
          </div>

          <PostForm />
        </div>
        <div className="w-3/4 h-full overflow-y-auto">
          <h1 className="text-6xl mt-6 mb-4">POSTS</h1>
          <ul>
            {filteredPosts.map((post, index) => (
              <PostItem
                key={index}
                post={post}
                onEdit={() => handleEditPost(post)}
                onUpdate={() => handleUpdatePost(post)}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PostPage;
