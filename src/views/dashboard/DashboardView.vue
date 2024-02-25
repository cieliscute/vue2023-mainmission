<template>
  <FullScreenLoading v-model:active="fullScreenLoadingStatus"
  :can-cancel="false" :is-full-page="true" />
  <template v-if="tokenChecked">
    <nav class="navbar bg-dark border-bottom border-body navbar-expand-sm" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#" @click.prevent>後台頁面</a>
        <button class="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navcollapse"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navcollapse">
          <ul class="navbar-nav me-auto my-1">
            <li class="nav-item">
              <RouterLink class="nav-link" aria-current="page"
              to="/dashboard/manageproducts">商品管理</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" aria-current="page"
              to="/dashboard/manageorders">訂單管理</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" aria-current="page"
              to="/home">返回前台頁面</RouterLink>
            </li>
          </ul>
          <button class="btn btn-outline-success me-0 me-sm-2"
          type="button" @click="logout">登出</button>
        </div>
      </div>
    </nav>
    <RouterView></RouterView>
  </template>
</template>
<script>
import Swal from 'sweetalert2';
import MixinComponent from '@/components/MixinComponent.vue';

import { takeoutToken, clearCookie } from '@/methods/myFunction';

const { VITE_APIURL } = import.meta.env;

export default {
  data() {
    return {
      tokenChecked: false,
      fullScreenLoadingStatus: true,
    };
  },
  components: {
  },
  methods: {
    checkToken() {
      this.fullScreenLoadingStatus = true;
      // 檢查token前先將預設的axios header給清除
      delete this.$http.defaults.headers.common.Authorization;
      const token = takeoutToken();
      const checkTokenPath = `${VITE_APIURL}/api/user/check`;
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
          this.$router.push('/dashboard/manageproducts');
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
    logout() {
      Swal.fire({
        title: '確定要登出嗎？',
        icon: 'question',
        allowOutsideClick: false,
        showCancelButton: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-secondary ms-3',
        },
        confirmButtonText: '確認',
        cancelButtonText: '取消',
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.fullScreenLoadingStatus = true;
            const path = `${VITE_APIURL}/logout`;
            // 點選確認登出，串接登出的API。並且在後方.then接收
            return this.$http.post(path);
          }
          // 沒有點選確認的話（也就是取消時）會return一個Reject跳到後方的.catch去接
          return Promise.reject(new Error('User cancelled'));
        })
        .then(() => {
          this.fullScreenLoadingStatus = false;
          // 刪除cookie
          clearCookie();
          this.$router.push('/adminlogin');
        })
        .catch((error) => {
          this.fullScreenLoadingStatus = false;
          if (error.message !== 'User cancelled') {
            this.addToast({ content: '登出過程出現錯誤', style: 'error' });
          }
        });
    },
  },
  mounted() {
    this.checkToken();
    // this.tokenChecked = true;
    // this.fullScreenLoadingStatus = false;
  },
  mixins: [MixinComponent],
};
</script>
<style scoped lang="scss">
.nav-item .nav-link.active{
  color:var(--bs-primary)
}
</style>
