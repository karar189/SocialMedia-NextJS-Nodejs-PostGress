import { create } from "zustand";
import { devtools } from "zustand/middleware";
import * as api from "../api/postApi";
import * as apiu from "../api/userApi";

const handleApiResponse = (set, onSuccess, onError) => async (promise) => {
  try {
    const result = await promise;
    onSuccess(result);
  } catch (error) {
    console.error(onError, error);
  }
};

export const useStore = create(
  devtools((set) => ({
    // User state
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),

    // User actions
    registerUser: (username, email, password) =>
      handleApiResponse(
        set,
        (user) => {
          set({ user });
          alert("User created successfully");
        },
        "Error in registerUser"
      )(apiu.registerUser(username, email, password)),

    loginUser: (username, password) =>
      handleApiResponse(
        set,
        (response) => {
          set({
            user: { username: response.username, userId: response.userId },
          });
          alert("Logged In");
        },
        "Error in loginUser"
      )(apiu.loginUser(username, password)),

    // Post state
    posts: [],
    newPostTitle: "",
    setNewPostTitle: (title) => set({ newPostTitle: title }),
    newPostContent: "",
    setNewPostContent: (content) => set({ newPostContent: content }),
    newPostImageUrl: "",
    setNewPostImageUrl: (imageUrl) => set({ newPostImageUrl: imageUrl }),

    // Post actions
    fetchUserPosts: () => {
      const state = useStore.getState();
      if (state.user.userId) {
        handleApiResponse(
          set,
          (posts) => set({ posts }),
          "Error in fetchUserPosts"
        )(api.fetchPostsByUser(state.user.userId));
      }
    },

    fetchPosts: () =>
      handleApiResponse(
        set,
        (posts) => set({ posts }),
        "Error in fetchPosts"
      )(api.fetchPosts()),

    addNewPost: () => {
      const state = useStore.getState();
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
        "Error in addNewPost"
      )(api.addNewPost(newPost));
    },

    deletePost: (postId) => {
      const state = useStore.getState();
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
          "Error in deletePost"
        )(api.deletePost(postId));
      } else {
        alert("You are not authorized to delete this post.");
      }
    },

    updatePost: (postId, updatedPost) => {
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
        "Error in updatePost"
      )(api.updatePost(postId, updatedPost));
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
        set((state) => ({
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
          "Error in deletePost"
        )(api.deletePost(postId));
      } else {
        alert("You are not authorized to delete this post.");
      }
    },
  }))
);
