// userStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import * as apiu from "../api/userApi";

const handleApiResponse = async (set, onSuccess, onError, promise) => {
  try {
    const result = await promise;
    onSuccess(result);
  } catch (error) {
    console.error(onError, error);
  }
};

export const useUserStore = create(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),

    registerUser: (username, email, password) =>
      handleApiResponse(
        set,
        (user) => {
          set({ user });
          alert("User created successfully");
        },
        "Error in registerUser",
        apiu.registerUser(username, email, password)
      ),

    loginUser: (username, password) =>
      handleApiResponse(
        set,
        (response) => {
          set({
            user: { username: response.username, userId: response.userId },
          });
          alert("Logged In");
        },
        "Error in loginUser",
        apiu.loginUser(username, password)
      ),
  }))
);
