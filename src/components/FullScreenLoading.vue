<template>
  <Loading
    v-model:active="fullScreenLoading"
    :can-cancel="false"
    :is-full-page="true"
  />
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import statusStore from '@/stores/statusStore';
import { mapState } from 'pinia';

export default {
  components: {
    Loading,
  },
  data() {
    return {
    };
  },
  methods: {

  },
  computed: {
    ...mapState(statusStore, ['fullScreenLoading']),
  },
};
</script>
<style scoped>
</style>
