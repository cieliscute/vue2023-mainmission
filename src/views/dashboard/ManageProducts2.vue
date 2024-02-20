<template>
  <!-- <div
  class="loading vw-100 vh-100 d-flex justify-content-center align-items-center" v-if="loading">
    <div class="loader"></div>
  </div> -->
  <FullScreenLoading v-model:active="fullScreenLoadingStatus"
  :can-cancel="false" color="#FAA" loader="dots"
    :is-full-page="true" />
  <ProductEditModal ref="editModal"></ProductEditModal>
  <div class="container-fluid">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in products" :key="`${index}-list`">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span class="text-mute" v-if="item.is_enabled===0">未啟用</span>
            <span class="text-success" v-else>啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Swal from 'sweetalert2';

import ProductEditModal from '@/components/ProductEditModal.vue';

import { takeoutToken } from '@/methods/myFunction';

export default {
  data() {
    return {
      fullScreenLoadingStatus: false,
      products: '',
      temp: '',
    };
  },
  computed: {
  },
  methods: {
    getProducts() {
      const getProductsPath = `${import.meta.env.VITE_APIURL}/api/${import.meta.env.VITE_API_ADMIN}/admin/products`;
      // const token = takeoutToken();

      this.$http.get(getProductsPath)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch(() => {
          Swal.fire({
            title: '取得資料發生錯誤',
            text: '聯絡管理員[]',
            icon: 'error',
            allowOutsideClick: false,
            timer: 3000,
            timerProgressBar: true,
            confirmButtonText: 'OK',
          });
        });
    },
    checktoken() {
      // 取出cookie中的token
      const token = takeoutToken();
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
    openModal() {
      this.$refs.editModal.bsModal.show();
    },
    test() {
    },
  },
  components: {
    ProductEditModal,
  },
  mounted() {
    // this.checktoken();
    // this.fullScreenLoadingStatus = true;
    // setTimeout(() => {
    //   this.fullScreenLoadingStatus = false;
    // }, 1000);
    this.getProducts();
  },
};
</script>
<style scoped></style>
