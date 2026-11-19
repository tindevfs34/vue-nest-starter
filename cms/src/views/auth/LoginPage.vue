<template>
  <div class="login-page d-flex min-vh-100">
    <v-row class="login-row flex-grow-1" no-gutters>
      <!-- Left panel: Background Image & Branding (Desktop only) -->
      <v-col
        cols="12"
        md="7"
        lg="8"
        class="d-none d-md-flex align-center justify-center position-relative login-banner"
      >
        <div class="login-banner__bg" />
        <div class="login-banner__overlay" />
        <div
          class="login-banner__content text-center pa-8 position-relative z-1"
        >
          <h2 class="text-h3 font-weight-bold text-white mb-3">
            TOP REVIEW
          </h2>
          <p class="text-h6 text-white text-opacity-80">
            Hệ thống quản trị nội dung và đánh giá chuyên nghiệp
          </p>
        </div>
      </v-col>

      <!-- Right panel: Login Form Container -->
      <v-col
        cols="12"
        md="5"
        lg="4"
        class="login-form-col d-flex align-center justify-center pa-4 pa-sm-8 pa-md-10 position-relative z-2"
      >
        <v-card class="login-card w-100 pa-6 pa-sm-8" elevation="0">
          <!-- Brand Header -->
          <div class="text-center mb-6">
            <h1 class="text-h5 text-sm-h4 font-weight-bold text-darkText mb-1">
              Đăng nhập
            </h1>
            <p class="text-body-2 text-medium-emphasis">
              Chào mừng bạn quay trở lại hệ thống quản trị
            </p>
          </div>
          <LoginForm />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
// -- Internal Components & Layouts --
import LoginForm from "@/views/auth/LoginForm.vue";
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
  background-image: url("/bg-login.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: 960px) {
    background-image: none;
    background-color: rgb(var(--v-theme-containerBg));
  }
}

.login-banner {
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    background-image: url("/bg-login.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(9, 9, 11, 0.65) 0%,
      rgba(9, 9, 11, 0.88) 100%
    );
  }
}

.login-form-col {
  @media (min-width: 960px) {
    background-color: rgb(var(--v-theme-surface));
  }
}

.login-card {
  max-width: 420px;
  margin: 0 auto;
  transition: all 0.3s ease;

  @media (max-width: 959px) {
    background: rgba(255, 255, 255, 0.94) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.7) !important;
    box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.35) !important;
  }
}
</style>
