<template>
  <div class="toast-container position-absolute pe-3 pt-3 top-0 end-0" style="z-index: 1050">
    <Toast v-for="(msg, key) in messages" :key="`${key}-ToastInsatnce`" :msg="msg" />
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import Toast from '@/components/ToastInstance.vue';
import statusStore from '@/stores/statusStore';

export default {
  components: {
    Toast,
  },
  setup() {
    const status = statusStore();
    const { messages } = storeToRefs(status);

    return {
      messages,
    };
  },
};
</script>
