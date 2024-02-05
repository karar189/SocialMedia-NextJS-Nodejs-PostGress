// postStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import * as api from "../api/postApi";

const handleApiResponse = async (set, onSuccess, onError, promise) => {
  try {
    const result = await promise;
    onSuccess(result);
  } catch (error) {
    console.error(onError, error);
  }
};

export const usePostStore = create(
  devtools((set) => ({
    posts: [],
    newPostTitle: "",
    setNewPostTitle: (title) => set({ newPostTitle: title }),
    newPostContent: "",
    setNewPostContent: (content) => set({ newPostContent: content }),
    newPostImageUrl: "",
    setNewPostImageUrl: (imageUrl) => set({ newPostImageUrl: imageUrl }),

    fetchUserPosts: async () => {
      const state = usePostStore.getState();
      if (state.user.userId) {
        handleApiResponse(
          set,
          (posts) => set({ posts }),
          "Error in fetchUserPosts",
          api.fetchPostsByUser(state.user.userId)
        );
      }
    },

    fetchPosts: () =>
      handleApiResponse(
        set,
        (posts) => set({ posts }),
        "Error in fetchPosts",
        api.fetchPosts()
      ),

    addNewPost: async () => {
      const state = usePostStore.getState();
      const newPost = {
        user_id: state.user.userId,
        title: state.newPostTitle,
        content: state.newPostContent,
        image_url: state.newPostImageUrl,
      };

      handleApiResponse(
        set,
        (addedPost) => {
          set((state) => ({
            posts: [...state.posts, addedPost],
            newPostTitle: "",
            newPostContent: "",
            newPostImageUrl: "",
          }));
          alert("Post Added");
        },
        "Error in addNewPost",
        api.addNewPost(newPost)
      );
    },

    deletePost: async (postId) => {
      const state = usePostStore.getState();
      const postToDelete = state.posts.find((post) => post.id === postId);

      if (
        postToDelete &&
        state.user &&
        state.user.userId === postToDelete.user_id
      ) {
        handleApiResponse(
          set,
          () => {
            set((state) => ({
              posts: state.posts.filter((post) => post.id !== postId),
            }));
            alert("Post deleted successfully");
          },
          "Error in deletePost",
          api.deletePost(postId)
        );
      } else {
        alert("You are not authorized to delete this post.");
      }
    },

    updatePost: async (postId, updatedPost) => {
      handleApiResponse(
        set,
        (updated) => {
          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === postId ? updated : post
            ),
          }));
          alert("Post updated successfully");
        },
        "Error in updatePost",
        api.updatePost(postId, updatedPost)
      );
    },

    likePost: async (postId) => {
      const state = usePostStore.getState();
      const userId = state.user.userId;

      try {
        await api.likePost(postId, userId);
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId ? { ...p, like_count: p.like_count + 1 } : p
          ),
        }));
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("User already liked this post.");
        } else {
          console.error("Error in likePost", error);
        }
      }
    },

    dislikePost: async (postId) => {
      const state = usePostStore.getState();
      const userId = state.user.userId;

      try {
        await api.dislikePost(postId, userId);
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId ? { ...p, dislike_count: p.dislike_count + 1 } : p
          ),
        }));
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("User already disliked this post.");
        } else {
          console.error("Error in dislikePost", error);
        }
      }
    },

    handleEditPost: (post) => {
      const state = usePostStore.getState();
      if (state.user && state.user.userId === post.user_id) {
        set({
          newPostTitle: post.title,
          newPostContent: post.content,
          newPostImageUrl: post.image_url,
          editingPostId: post.id,
        });
      } else {
        alert("You are not authorized to edit this post.");
      }
    },

    handleUpdatePost: async (postId) => {
      const state = usePostStore.getState();
      const updatedPost = {
        title: state.newPostTitle,
        content: state.newPostContent,
        image_url: state.newPostImageUrl,
      };

      try {
        await api.updatePost(postId.id, updatedPost);
        usePostStore.setState((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId.id ? { ...post, ...updatedPost } : post
          ),
        }));
        alert("Post updated successfully");
      } catch (error) {
        console.error("Error in updatePost:", error);
      }
    },

    handleDeletePost: async (postId) => {
      const state = usePostStore.getState();
      const postToDelete = state.posts.find((post) => post.id === postId);

      if (
        postToDelete &&
        state.user &&
        state.user.userId === postToDelete.user_id
      ) {
        handleApiResponse(
          set,
          () => {
            set((state) => ({
              posts: state.posts.filter((post) => post.id !== postId),
            }));
            alert("Post deleted successfully");
          },
          "Error in deletePost",
          api.deletePost(postId)
        );
      } else {
        alert("You are not authorized to delete this post.");
      }
    },
  }))
);
