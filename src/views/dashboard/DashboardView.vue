<template>
  <FullScreenLoading v-model:active="fullScreenLoadingStatus"
      :can-cancel="false"
      :is-full-page="true"/>
  <template v-if="tokenChecked">
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
            <a class="nav-link active" aria-current="page" href="#">商品管理</a>
            <a class="nav-link" href="#">Features</a>
            <a class="nav-link" href="#">Pricing</a>
            <a class="nav-link" href="#">Pricing</a>
          </div>
        </div>
      </div>
    </nav>
    <RouterView></RouterView>
  </template>
</template>
<script>
import Swal from 'sweetalert2';
import MixinComponent from '@/components/MixinComponent.vue';

import { takeoutToken } from '@/methods/myFunction';

export default {
  data() {
    return {
      tokenChecked: false,
      fullScreenLoadingStatus: false,
    };
  },
  components: {
  },
  methods: {
    checkToken() {
      // 檢查token前先將預設的axios header給清除
      delete this.$http.defaults.headers.common.Authorization;
      const token = takeoutToken();
      const checkTokenPath = `${import.meta.env.VITE_APIURL}/api/user/check`;
      this.fullScreenLoadingStatus = true;
      this.$http.post(checkTokenPath, null, {
        headers: { Authorization: token },
      })
        .then(() => {
          // 驗證通過，設定 axios header 預設帶入 token
          this.$http.defaults.headers.common.Authorization = token;
          // 將tokenChecked狀態切換成true，啟用包含nav以及RouterView等內容。並且開始載入RouterView內元件的生命週期
          this.tokenChecked = true;
          this.fullScreenLoadingStatus = false;
          this.addToast({ content: '登入驗證：成功' });
        })
        .catch(() => {
          this.fullScreenLoadingStatus = false;
          Swal.fire({
            title: '請正確登入再訪問後台頁面',
            text: '回到登入頁面',
            icon: 'error',
            allowOutsideClick: false,
            timer: 3000,
            timerProgressBar: true,
            confirmButtonText: 'OK',
          })
            .then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                // console.log('計時器跳轉回登入頁面');
                this.$router.push('/adminlogin');
              }
              if (result.isConfirmed) {
                this.$router.push('/adminlogin');
              }
            });
        });
    },
  },
  mounted() {
    this.checkToken();
    // this.tokenChecked = true;
  },
  mixins: [MixinComponent],
};
</script>
