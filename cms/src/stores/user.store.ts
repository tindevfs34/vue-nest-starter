// -- Core Framework --
import { ref } from "vue";
import { defineStore } from "pinia";

// -- Internal Services --
import { userApi } from "@/apis/user";

// -- Composables & Stores --
import { useAuthStore } from "@/stores/auth.store";

// -- Types, Constants & Enums --
import type { UserType } from "@/types/user.type";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserType | null>(
    JSON.parse(localStorage.getItem("user") || "null"),
  );
  const returnUrl = ref<string | null>(null);

  const addUser = (): void => {};

  const logout = (): void => {
    user.value = null;
  };

  const getUserInfo = async (): Promise<UserType | null> => {
    try {
      const userData = await userApi.getProfile();
      if (userData && typeof userData === "object") {
        user.value = userData;

        const authStore = useAuthStore();
        if (authStore.user) {
          authStore.setUser({
            ...authStore.user,
            ...userData,
          });
        } else {
          authStore.setUser(userData);
        }
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      }
    } catch (e) {
      console.error("Failed to fetch user info:", e);
    }
    return null;
  };

  const resetUserInfo = (): void => {
    user.value = null;
  };

  return {
    user,
    returnUrl,
    addUser,
    logout,
    getUserInfo,
    resetUserInfo,
  };
});
