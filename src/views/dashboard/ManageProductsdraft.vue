<template>
  <!-- <div
  class="loading vw-100 vh-100 d-flex justify-content-center align-items-center" v-if="loading">
    <div class="loader"></div>
  </div> -->
  <FullScreenLoading v-model:active="fullScreenLoadingStatus"
      :can-cancel="false"
      color="#FAA"
      loader="dots"
      :is-full-page="true"/>
  <div class="container-fluid">
    <div class="row py-3">
      <div class="col-md-6">
        <h2>產品列表</h2>
        <div>
          <table class="table table-hover mt-4">
            <thead>
              <tr>
                <th width="150">產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="150">是否啟用</th>
                <th width="120">查看細節</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td width="150">{{ product.title }}</td>
                <td width="120">
                  {{ product.origin_price }}
                </td>
                <td width="120">
                  {{ product.price }}
                </td>
                <td width="150">
                  <span class="text-success" v-if="product.is_enabled">啟用</span>
                  <span v-else>未啟用</span>
                </td>
                <td width="120">
                  <button type="button" class="btn btn-primary" @click="temp = product">
                    查看細節
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            目前有<span>{{ products.length }}</span> 項產品
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <h2>單一產品細節</h2>
        <template v-if="temp">
          <div class="card mb-3">
            <img :src="temp.imageUrl" class="card-img-top primary-image" alt="主圖" />
            <div class="card-body">
              <h5 class="card-title">
                {{ temp.title }}
                <span class="badge bg-primary ms-2">{{ temp.category }}</span>
              </h5>
              <p class="card-text">商品描述：{{ temp.description }}</p>
              <p class="card-text">商品內容：{{ temp.content }}</p>
              <div class="d-flex">
                <p class="card-text me-2">{{ temp.price }}</p>
                <p class="card-text text-secondary">
                  <del>{{ temp.origin_price }}</del>
                </p>
                元 / {{ temp.unit }}
              </div>
            </div>
          </div>
          <template v-for="(item, id) in temp.imagesUrl" :key="item + id">
            <img :src="item" alt="" class="img-fluid mb-2" />
          </template>
        </template>
        <p class="text-secondary">請選擇一個商品查看{{ fullScreenLoadingStatus }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import FullScreenLoading from 'vue-loading-overlay';

export default {
  data() {
    return {
      fullScreenLoadingStatus: false,
      products: '',
      temp: '',
      loading: true,
    };
  },
  computed: {
  },
  methods: {
    checktoken() {
      // 取出cookie中的token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      const checkTokenPath = `${import.meta.env.VITE_APIURL}/api/user/check`;
      const getDataPath = `${import.meta.env.VITE_APIURL}/api/${import.meta.env.VITE_API_ADMIN}/admin/products/all`;
      this.$http.post(checkTokenPath, null, {
        headers: {
          Authorization: token,
        },
      })
        .then(() => this.$http.get(getDataPath, {
          headers: { Authorization: token },
        }))
        // 跑.then代表資料正確取得
        .then((response) => {
          this.products = Object.values(response.data.products);
          // 取消loading動畫
          this.loading = false;
        })
        // 有任何錯誤直接跳到.catch
        .catch(() => {
          Swal.fire({
            title: '請正確登入再訪問後台頁面',
            text: '點選下方按鈕回到登入頁面',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'OK',
          })
            .then(() => {
            // 點選sweetalert的按鈕之後，跳轉回登入頁面
              this.$router.push('/login');
            });
        });
    },
  },
  components: {
    FullScreenLoading,
  },
  mounted() {
    // this.checktoken();
    this.fullScreenLoadingStatus = false;
  },
};
</script>
<style scoped>
</style>
