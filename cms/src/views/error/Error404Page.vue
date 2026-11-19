<template>
  <v-row no-gutters class="overflow-hidden bg-containerBg" style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center">
      <div class="text-center">
        <div class="errorMedia">
          <img src="@/assets/images/maintenance/img-error-404.svg" alt="404" />
        </div>
        <h1 class="text-md-h1 text-h2 mt-16">404 - Không tìm thấy trang</h1>
        <p class="text-h6 text-lightText">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        <v-btn variant="flat" color="primary" class="mt-2" rounded="md" to="/">Về trang chủ</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

