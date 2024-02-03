import { create } from "zustand";
import { devtools } from "zustand/middleware";
import * as api from "../api/postApi";
import { useRouter } from "next/router";

export const useStore = create(
  devtools((set) => ({
    // User state
    posts: [],
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    registerUser: (username, email, password) => {
      api
        .registerUser(username, email, password)
        .then((user) => {
          set({ user: user }); // Save the new user in the state
          alert("User created successfully");
        })
        .catch((error) => {
          console.error("Error in registerUser:", error);
          alert("Failed to create user");
        });
    },
    loginUser: (username, password) => {
      api
        .loginUser(username, password)
        .then((response) => {
          console.log("API Response:", response);
          set({
            user: {
              username: response.username,
              userId: response.userId,
            },
          });
        })
        .catch((error) => {
          console.error("Error in loginUser:", error);
          alert("Login failed");
        });
    },

    fetchUserPosts: () => {
      const state = useStore.getState();
      console.log("Current State", state.user);
      if (state.user.userId) {
        api
          .fetchPostsByUser(state.user.userId)
          .then((posts) => {
            set({ posts });
            console.log("💚posts", posts);
          })
          .catch((error) => {
            console.error("Error in fetchUserPosts:", error);
          });
      }
    },
    newPostTitle: "",
    setNewPostTitle: (title) => set({ newPostTitle: title }),
    newPostContent: "",
    setNewPostContent: (content) => set({ newPostContent: content }),
    newPostImageUrl: "",
    setNewPostImageUrl: (imageUrl) => set({ newPostImageUrl: imageUrl }),

    fetchPosts: () => {
      api
        .fetchPosts()
        .then((posts) => {
          set({ posts });
        })
        .catch((error) => {
          console.error("Error in fetchPosts:", error);
        });
    },

    addNewPost: () => {
      const state = useStore.getState();
      const newPost = {
        user_id: state.user.userId,
        title: state.newPostTitle,
        content: state.newPostContent,
        image_url: state.newPostImageUrl,
      };

      api
        .addNewPost(newPost)
        .then((addedPost) => {
          set((state) => ({
            posts: [...state.posts, addedPost],
            newPostTitle: "",
            newPostContent: "",
            newPostImageUrl: "",
          }));
          alert("Post Added");
        })
        .catch((error) => {
          console.error("Error in addNewPost:", error);
        });
    },

    deletePost: (postId) => {
      const state = useStore.getState();
      // Find the post to be deleted
      const postToDelete = state.posts.find((post) => post.id === postId);

      // Check if the user is the owner of the post
      if (
        postToDelete &&
        state.user &&
        state.user.userId === postToDelete.user_id
      ) {
        api
          .deletePost(postId)
          .then(() => {
            set((state) => ({
              posts: state.posts.filter((post) => post.id !== postId),
            }));
            alert("Post deleted successfully");
          })
          .catch((error) => {
            console.error("Error in deletePost:", error);
          });
      } else {
        // User is not authorized to delete the post
        alert("You are not authorized to delete this post.");
      }
    },
    updatePost: (postId, updatedPost) => {
      const state = useStore.getState();
      api
        .updatePost(postId, updatedPost)
        .then((updated) => {
          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === postId ? updated : post
            ),
          }));
          alert("Post updated successfully");
        })
        .catch((error) => {
          console.error("Error in updatePost:", error);
        });
    },
    handleEditPost: (post) => {
      set({
        newPostTitle: post.title,
        newPostContent: post.content,
        newPostImageUrl: post.image_url,
        editingPostId: post.id,
      });
    },

    handleUpdatePost: async (postId) => {
      const state = useStore.getState();
      const updatedPost = {
        title: state.newPostTitle,
        content: state.newPostContent,
        image_url: state.newPostImageUrl,
      };

      try {
        await api.updatePost(postId, updatedPost);
        useStore.setState((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId ? { ...post, ...updatedPost } : post
          ),
        }));
        alert("Post updated successfully");
      } catch (error) {
        console.error("Error in updatePost:", error);
      }
    },

    handleDeletePost: (postId) => {
      const state = useStore.getState();
      // Find the post to be deleted
      const postToDelete = state.posts.find((post) => post.id === postId);

      // Check if the user is the owner of the post
      if (
        postToDelete &&
        state.user &&
        state.user.userId === postToDelete.user_id
      ) {
        api
          .deletePost(postId)
          .then(() => {
            useStore.setState((state) => ({
              posts: state.posts.filter((post) => post.id !== postId),
            }));
            alert("Post deleted successfully");
          })
          .catch((error) => {
            console.error("Error in deletePost:", error);
          });
      } else {
        // User is not authorized to delete the post
        alert("You are not authorized to delete this post.");
      }
    },
  }))
);
