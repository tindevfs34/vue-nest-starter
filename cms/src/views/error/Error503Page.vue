<template>
  <v-row no-gutters class="overflow-hidden bg-containerBg" style="min-height: 100vh">
    <v-col class="d-flex align-center justify-center">
      <div class="text-center">
        <div class="errorMedia">
          <img src="@/assets/images/maintenance/img-construction-2.svg" alt="503" />
        </div>
        <h1 class="text-h1 mt-16">503 - Hệ thống đang bảo trì</h1>
        <p class="text-h6 text-lightText mt-2">Hệ thống đang được nâng cấp, vui lòng quay lại sau.</p>
        <v-btn variant="flat" color="primary" rounded="md" class="mt-4" to="/">
          Về trang chủ
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>