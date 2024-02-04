import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { registerUser, loginUser } from "../api/userApi";

export const useUserStore = create(
  devtools((set) => ({
    user: null,

    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),

    registerUser: (username, email, password) => {
      registerUser(username, email, password)
        .then((user) => {
          set({ user: user });
        })
        .catch((error) => {
          console.error("Error in registerUser:", error);
        });
    },

    loginUser: (username, password) => {
      loginUser(username, password)
        .then((response) => {
          set({
            user: {
              username: response.username,
              userId: response.userId,
            },
          });
        })
        .catch((error) => {
          console.error("Error in loginUser:", error);
        });
    },
  }))
);
