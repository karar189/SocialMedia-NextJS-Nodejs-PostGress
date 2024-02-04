import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { fetchPosts, addNewPost, deletePost, updatePost } from "../api/postApi";

export const usePostStore = create(
  devtools((set) => ({
    posts: [],
    newPostTitle: "",
    newPostContent: "",
    newPostImageUrl: "",

    setNewPostTitle: (title) => set({ newPostTitle: title }),
    setNewPostContent: (content) => set({ newPostContent: content }),
    setNewPostImageUrl: (imageUrl) => set({ newPostImageUrl: imageUrl }),

    fetchPosts: () => {
      fetchPosts()
        .then((posts) => {
          set({ posts });
        })
        .catch((error) => {
          console.error("Error in fetchPosts:", error);
        });
    },

    addNewPost: () => {
      const state = usePostStore.getState();
      const newPost = {
        title: state.newPostTitle,
        content: state.newPostContent,
        image_url: state.newPostImageUrl,
      };

      addNewPost(newPost)
        .then((addedPost) => {
          set((state) => ({
            posts: [...state.posts, addedPost],
            newPostTitle: "",
            newPostContent: "",
            newPostImageUrl: "",
          }));
        })
        .catch((error) => {
          console.error("Error in addNewPost:", error);
        });
    },

    deletePost: (postId) => {
      deletePost(postId)
        .then(() => {
          set((state) => ({
            posts: state.posts.filter((post) => post.id !== postId),
          }));
        })
        .catch((error) => {
          console.error("Error in deletePost:", error);
        });
    },

    updatePost: (postId, updatedPost) => {
      updatePost(postId, updatedPost)
        .then((updated) => {
          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === postId ? updated : post
            ),
          }));
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
        await api.updatePost(postId.id, updatedPost);
        useStore.setState((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId.id ? { ...post, ...updatedPost } : post
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
        alert("You are not authorized to delete this post.");
      }
    },
  }))
);
