<template>
  <Loading :active="fullScreenLoading"
          :can-cancel="false"/>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import statusStore from '@/stores/statusStore';
import { mapState } from 'pinia';

export default {
  props: {

  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState(statusStore, ['fullScreenLoading']),
  },
  components: {
    Loading,
  },
};
</script>
<style scoped>
</style>
