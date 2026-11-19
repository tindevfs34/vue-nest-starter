import { computed, watch } from "vue";
import * as validators from "@vuelidate/validators";
import { createI18n } from "vue-i18n";

const getInitialLocale = (): string => {
  try {
    const raw = localStorage.getItem("language");
    if (!raw) return "ja";
    const parsed = JSON.parse(raw);
    return parsed?.language || "ja";
  } catch {
    return "ja";
  }
};

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getInitialLocale(),
  messages: {
    ja: {
      validations: {
        required: "{prop}を入力してください。",
        requiredIf: "{prop}を入力してください。",
        maxLength: "{max}文字以内で入力してください。",
        minLength: "{min}文字以上で入力してください。",
        email: "メールアドレスの形式が正しくありません。",
        numeric: "数値を入力してください。",
        maxValue: "{max}以下の値を入力してください。",
        minValue: "{min}以上の値を入力してください。",
        fileMaxSize: "ファイルサイズは{max}MB以下にしてください。",
        errors: "入力内容に誤りがあります。赤色の項目を確認してください。",
        sameAs: "入力内容が一致しません。",
      },
    },
    en: {
      validations: {
        required: "Please enter {prop}.",
        requiredIf: "Please enter {prop}.",
        maxLength: "Please enter no more than {max} characters.",
        minLength: "Please enter at least {min} characters.",
        email: "Please enter a valid email address.",
        numeric: "Please enter a numeric value.",
        maxValue: "Please enter a value less than or equal to {max}.",
        minValue: "Please enter a value greater than or equal to {min}.",
        fileMaxSize: "File size must be {max}MB or less.",
        errors:
          "There are errors in your input. Please check the highlighted fields.",
        sameAs: "The entered values do not match.",
      },
    },
  },
});

export const initValidatorI18nSync = async () => {
  const { useLanguageStore } = await import("@/stores/language.store");
  const languageStore = useLanguageStore();

  watch(
    () => languageStore.language,
    (newLang) => {
      i18n.global.locale.value = newLang as "ja" | "en";
    },
    { immediate: true },
  );
};

const { createI18nMessage } = validators;

const withI18nMessage = createI18nMessage({
  t: (...args) => i18n.global.t(...args),
});

const fileMaxSize = (sizeFile: number, maxSize: number) => {
  if (sizeFile !== undefined) return sizeFile <= maxSize;
  return false;
};

export const requiredIf = withI18nMessage(validators.requiredIf, {
  withArguments: true,
});
export const minLength = withI18nMessage(validators.minLength, {
  withArguments: true,
});
export const maxLength = withI18nMessage(validators.maxLength, {
  withArguments: true,
});
export const maxValue = withI18nMessage(validators.maxValue, {
  withArguments: true,
});
export const minValue = withI18nMessage(validators.minValue, {
  withArguments: true,
});
export const sameAs = withI18nMessage(validators.sameAs, {
  withArguments: true,
});
export const email = withI18nMessage(validators.email);
export const numeric = withI18nMessage(validators.numeric);
export const fileSizeMaxValidator = (maxSize: number) =>
  withI18nMessage((sizeFile: number) => fileMaxSize(sizeFile, maxSize), {
    withArguments: false,
    messageParams: (params) => ({
      ...params,
      max: maxSize / (1024 * 1024),
    }),
  });

export const messageFormError = computed(() =>
  i18n.global.t("validations.errors"),
);
