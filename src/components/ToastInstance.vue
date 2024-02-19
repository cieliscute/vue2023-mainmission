<template>
  <div class="toast" role="alert" ref="toast" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <span class="rounded me-2 p-2" :class="`bg-${msg.style}`"></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {{ msg.content }}
    </div>
  </div>
</template>
<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  props: [
    'msg',
  ],
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 3000,
      autohide: true,
    });
    toast.show();
  },
};
</script>
