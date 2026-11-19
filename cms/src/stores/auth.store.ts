// -- Core Framework --
import { defineStore } from "pinia";

// -- Internal Services & Router --
import { authApi } from "@/apis/auth";
import { router } from "@/router";

// -- Composables & Stores --
import { useUserStore } from "@/stores/user.store";

// -- Types, Constants & Enums --
import type { LoginAuthType, LoginResponseType } from "@/types/auth.type";
import type { UserType } from "@/types/user.type";
import {
  checkIsSystemAdmin,
  checkIsEditor,
  checkIsSuperAdmin,
  checkIsAdmin,
} from "@/common/utils";

interface AuthStateType {
  user: UserType | null;
  accessToken: string | null;
  refreshToken: string | null;
  roleId: string | null;
  returnUrl: string | null;
  isLoading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthStateType => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    roleId: null,
    returnUrl: null,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state): boolean => Boolean(state.accessToken),
    currentUser: (state): UserType | null => state.user,
    isSystemAdmin: (state): boolean => checkIsSystemAdmin(state.user),
    isSuperAdmin: (state): boolean => checkIsSuperAdmin(state.user),
    isAdmin: (state): boolean => checkIsAdmin(state.user),
    isEditor: (state): boolean => checkIsEditor(state.user),
  },

  actions: {
    setToken(accessToken: string): void {
      this.accessToken = accessToken;
    },

    setRefreshToken(refreshToken: string): void {
      this.refreshToken = refreshToken;
    },

    setUser(user: UserType): void {
      this.user = user;
      this.roleId = user.roleId ?? null;

      const userStore = useUserStore();
      userStore.user = user;
    },

    saveSession(authData: LoginResponseType): void {
      if (authData.accessToken) {
        this.setToken(authData.accessToken);
        localStorage.setItem("accessToken", authData.accessToken);
      }

      if (authData.refreshToken) {
        this.setRefreshToken(authData.refreshToken);
        localStorage.setItem("refreshToken", authData.refreshToken);
      }

      if (authData.info) {
        this.setUser(authData.info);
        localStorage.setItem("user", JSON.stringify(authData.info));
      }
    },

    async login(payload: LoginAuthType): Promise<boolean> {
      this.isLoading = true;
      try {
        const authData = await authApi.login(payload);

        if (!authData?.accessToken) {
          return false;
        }

        this.saveSession(authData);

        const redirectPath = this.returnUrl || "/dashboard";
        this.returnUrl = null;
        await router.push(redirectPath);
        return true;
      } catch (error) {
        // apis/core.ts Axios interceptor handles the error toast automatically
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    clearSession(): void {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.roleId = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      const userStore = useUserStore();
      userStore.user = null;
    },

    async logout(): Promise<void> {
      const tokenToInvalidate = this.refreshToken;

      if (tokenToInvalidate) {
        try {
          await authApi.logout(tokenToInvalidate);
        } catch {
          // Silent ignore API logout error to ensure client state is cleared
        }
      }

      this.clearSession();
      await router.push("/login");
    },
  },

  persist: true,
});
