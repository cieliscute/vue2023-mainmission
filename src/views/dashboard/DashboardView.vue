<template>
  <div class="dvh-100 d-flex">
    <div class="col-3">
      <div class="bg-success h-100 p-2">
        <div class="list-group rounded-0">
          <RouterLink href="#" to="/dashboard/products"
            class="list-group-item list-group-item-action" aria-current="true">
            產品列表
          </RouterLink>
          <RouterLink href="#" to="/"
          class="list-group-item list-group-item-action " aria-current="true">
            The current link item
          </RouterLink>
          <RouterLink href="#" to="/"
          class="list-group-item list-group-item-action " aria-current="true">
            The current link item
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="col-9">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import { takeoutToken } from '@/methods/myFunction';

export default {
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    const token = takeoutToken();
    if (!token) {
      Swal.fire({
        title: '錯誤！',
        text: '請先登入才可進入後台頁面',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  },
};
</script>
<style scoped>
.dvh-100{
  height: 100dvh;
}
*{
  /* outline: 1px solid red; */
}
</style>
