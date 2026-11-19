<template>
  <v-form class="auth-login-form w-100" @submit.prevent="handleSubmit">
    <!-- Email / Username Input -->
    <div class="mb-1">
      <v-label class="font-weight-medium mb-1 text-subtitle-2 text-darkText">
        Email / Tên đăng nhập
      </v-label>
      <v-text-field
        v-model="formState.email"
        variant="outlined"
        color="primary"
        placeholder="admin@topreview.vn"
        autocomplete="username"
        data-testid="input-login-email"
        :error-messages="v$.email.$errors[0]?.$message?.toString() ?? ''"
        @blur="v$.email.$touch"
      >
        <template #prepend-inner>
          <MailIcon size="20" class="text-medium-emphasis me-1" />
        </template>
      </v-text-field>
    </div>

    <!-- Password Input -->
    <div class="mb-1">
      <v-label class="font-weight-medium mb-1 text-subtitle-2 text-darkText">
        Mật khẩu
      </v-label>
      <v-text-field
        v-model="formState.password"
        :type="isPasswordVisible ? 'text' : 'password'"
        variant="outlined"
        color="primary"
        placeholder="••••••••"
        autocomplete="current-password"
        data-testid="input-login-password"
        :error-messages="v$.password.$errors[0]?.$message?.toString() ?? ''"
        @blur="v$.password.$touch"
      >
        <template #prepend-inner>
          <LockIcon size="20" class="text-medium-emphasis me-1" />
        </template>
        <template #append-inner>
          <v-btn
            variant="text"
            icon
            tabindex="-1"
            @click="togglePasswordVisibility"
          >
            <EyeOffIcon
              v-if="isPasswordVisible"
              size="20"
              class="text-medium-emphasis"
            />
            <EyeIcon v-else size="20" class="text-medium-emphasis" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <!-- Submit Button -->
    <v-btn
      type="submit"
      color="primary"
      block
      size="large"
      rounded="md"
      height="48"
      data-testid="btn-login-submit"
      :loading="isSubmitting"
      :disabled="isSubmitting"
      class="font-weight-bold elevation-1 text-capitalize mt-2"
    >
      Đăng nhập
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
// -- Core Framework --
import { ref } from "vue";

// -- Third-party Libraries --
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "vue-tabler-icons";

// -- Composables & Stores --
import { useAuthStore } from "@/stores/auth.store";
import type { LoginAuthType } from "@/types/auth.type";

const authStore = useAuthStore();

const formState = ref<LoginAuthType>({
  email: "",
  password: "",
});

const isPasswordVisible = ref(false);
const isSubmitting = ref(false);

const rules = {
  email: {
    required: helpers.withMessage(
      "Email hoặc tên đăng nhập không được để trống",
      required,
    ),
  },
  password: {
    required: helpers.withMessage("Mật khẩu không được để trống", required),
  },
};

const v$ = useVuelidate(rules, formState);

function togglePasswordVisibility(): void {
  isPasswordVisible.value = !isPasswordVisible.value;
}

async function handleSubmit(): Promise<void> {
  if (isSubmitting.value) {
    return;
  }

  const isFormValid = await v$.value.$validate();
  if (!isFormValid) {
    return;
  }

  isSubmitting.value = true;
  try {
    await authStore.login({
      email: formState.value.email.trim(),
      password: formState.value.password,
    });
  } catch {
    // Error notification handled in auth store
  } finally {
    isSubmitting.value = false;
  }
}
</script>
