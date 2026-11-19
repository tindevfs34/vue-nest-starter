<template>
  <v-row no-gutters class="overflow-hidden bg-containerBg" style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center">
      <div class="text-center">
        <div class="errorMedia">
          <img src="@/assets/images/maintenance/img-error-500.svg" alt="500" />
        </div>
        <h1 class="text-md-h1 text-h2 mt-6 mb-1">500 - Lỗi máy chủ nội bộ</h1>
        <p class="text-caption text-lightText">Đã xảy ra lỗi trên máy chủ. Vui lòng thử lại sau.</p>
        <v-btn variant="flat" color="primary" rounded="md" class="mt-4" to="/">
          Về trang chủ
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>