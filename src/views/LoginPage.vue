<template>
  <!-- 在滿版圖片上方多包一層，因為blur在某些瀏覽器會有一些白邊，透過scale配合overflow-hidden來解決-->
  <div class="overflow-hidden h-dvh -z-10  fixed inset-0">
    <img
      src="https://images.unsplash.com/photo-1585978075589-fc6561e20296?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="" class="h-full w-full object-cover blur-sm scale-125" id="background" ref="background" />
  </div>
  <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true" />
  <div class="max-w-md mx-auto h-dvh flex items-center px-2">
    <form class="basis-full bg-slate-800/30 py-6 px-4 rounded-md" @keyup.enter="onSubmit" @submit="onSubmit">
      <h1 class="text-center text-white text-4xl mb-10">Login</h1>
      <div class="relative mb-6">
        <input type="email" id="input_email"
          class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " v-model="user.username" />
        <label for="input_email"
          class="absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">Email</label>
      </div>
      <div class="relative mb-6">
        <input type="password" id="input_password"
          class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " v-model="user.password" />
        <label for="input_password"
          class="absolute text-sm text-white  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">Password</label>
      </div>
      <button
        class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span
          class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          登入後台
        </span>
      </button>
    </form>

  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import Swal from 'sweetalert2'
import 'vue-loading-overlay/dist/css/index.css'
export default {
  data() {
    return {
      isLoading: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    Loading
  },
  methods: {
    onSubmit() {
      // 將loading動畫顯示，告知使用者正在驗證帳號密碼
      this.isLoading = true;
      const path = `${import.meta.env.VITE_APIURL}/admin/signin`
      this.$http
        .post(path, this.user)
        .then((response) => {
          // 取得資料代表驗證完成，移除loading動畫
          this.isLoading = false
          const token = response.data.token
          const expired = response.data.expired
          // 設定cookie
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`
          // this.$http.defaults.headers.common.Authorization = `${token}`;
          this.$router.push('/managepage')
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          // 驗證錯誤，移除loading動畫
          this.isLoading = false
          // 彈出錯誤資訊回饋給使用者
          Swal.fire({
            title: `${error.response.data.message}`,
            text: '請確認資料皆有正確輸入',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    },
  },
  mounted() {
  },
}
</script>
<style scoped lang="scss">
// chrome瀏覽器有autofill,會改變底色... 太雷了吧！感謝stackoverflow(https://stackoverflow.com/questions/29580704/change-input-background-to-transparent-on-autocomplete-form)
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 50px rgba(255, 255, 255, 0) inset !important;
  // background-color: transparent !important;
  background-clip: text;
  -webkit-text-fill-color: #fff;
  caret-color: #fff;
}
</style>
