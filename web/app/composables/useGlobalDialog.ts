import { ref } from "vue";
const isOpenGlobalDialog = ref(false);

export function useGlobalDialog(
  isGlobal: boolean,
  isOpenGlobalDialogInitial = false
) {
  if (isOpenGlobalDialogInitial) isOpenGlobalDialog.value = true;
  const isOpen = ref(false);

  function open() {
    if (isGlobal) isOpenGlobalDialog.value = true;
    else isOpen.value = true;
  }

  function close() {
    if (isGlobal) isOpenGlobalDialog.value = false;
    else isOpen.value = false;
  }

  return {
    isOpenGlobalDialog,
    isOpen,
    open,
    close,
  };
}
