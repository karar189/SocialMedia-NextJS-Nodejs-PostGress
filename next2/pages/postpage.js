import React, { useEffect, useState } from "react";
import { useStore } from "../store/index";
import ProtectedRoute from "../components/ProtectedRoute";
import PostItem from "../components/PostItem";
import PostForm from "../components/PostForm";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component

const PostPage = () => {
  const {
    user,
    clearUser,
    posts,
    fetchPosts,
    fetchUserPosts,
    handleEditPost,
    handleUpdatePost,
    handleDeletePost,
  } = useStore();

  // Local state for user input and toggle
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

  // console.log("Filtered POstttts", filteredPosts);

  const handleLogout = () => {
    clearUser();
  };
  return (
    <ProtectedRoute>
      <h1>This is route /postpage</h1>

      <div>
        {user ? (
          <>
            <p>Welcome, {user.username}!</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>No User</p>
        )}

        <div>
          <div className="formComponent">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <button onClick={handleShowUserPostsToggle}>
              {showUserPostsOnly ? "Show All Posts" : "Show My Posts"}
            </button>
            <PostForm />
          </div>
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
