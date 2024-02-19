<template>
  <FullScreenLoading v-model:active="fullScreenLoadingStatus"
      :can-cancel="false"
      :is-full-page="true"/>
  <nav class="navbar navbar-expand-md bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">後台頁面</a>
      <button class="navbar-toggler"
        type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">管理訂單</a>
          <a class="nav-link" href="#">Features</a>
          <a class="nav-link" href="#">Pricing</a>
          <a class="nav-link" href="#">Pricing</a>
        </div>
      </div>
    </div>
  </nav>
  <RouterView></RouterView>
</template>
<script>
import Swal from 'sweetalert2';

import FullScreenLoading from 'vue-loading-overlay';

import { takeoutToken } from '@/methods/myFunction';

export default {
  data() {
    return {
      fullScreenLoadingStatus: false,
    };
  },
  components: {
    FullScreenLoading,
  },
  methods: {
    checkToken() {
      const token = takeoutToken();
      const checkTokenPath = `${import.meta.env.VITE_APIURL}/api/user/check`;
      this.fullScreenLoadingActive();

      // const getDataPath =
      // `${import.meta.env.VITE_APIURL}/api/${import.meta.env.VITE_API_ADMIN}/admin/products/all`;
      this.$http.post(checkTokenPath, null, {
        headers: {
          Authorization: token,
        },
      })
        // .then(() => this.$http.get(getDataPath, {
        //   headers: { Authorization: token },
        // }))
        // 跑.then代表資料正確取得
        .then((response) => {
          // this.products = Object.values(response.data.products);
          // 取消loading動畫
          // this.loading = false;
          console.log(response);
          this.fullScreenLoadingDeactive();
        })
        // 有任何錯誤直接跳到.catch
        .catch(() => {
          // 取消動畫
          this.fullScreenLoadingDeactive();
          Swal.fire({
            title: '請正確登入再訪問後台頁面',
            text: '點選下方按鈕回到登入頁面',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'OK',
          })
            .then(() => {
              this.$router.push('/AdminLogin');
            });
        });
    },
  },
  mounted() {
    // this.checkToken();
    this.fullScreenLoadingStatus = false;
  },
};
</script>
<style scoped>
.dvh-100{
  height: 100dvh;
}
*{
  outline: 1px solid red;
}
</style>
