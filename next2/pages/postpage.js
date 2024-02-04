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

  const filteredPosts = posts.filter((post) => {
    const matchesSearchTerm =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    return !showUserPostsOnly
      ? matchesSearchTerm
      : matchesSearchTerm && post.user_id === user.userId;
  });

  return (
    <ProtectedRoute>
      <div>
        <div className="formComponent">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <br />
          <button onClick={handleShowUserPostsToggle}>
            {showUserPostsOnly ? "Show All Posts" : "Show My Posts"}
          </button>
          <PostForm />
        </div>
        <div>
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
          <br />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PostPage;
