<template>
  <FullScreenLoading v-model:active="fullScreenLoadingStatus"
  :can-cancel="false" color="#FAA" loader="dots"
    :is-full-page="true" />
  <ProductEditModal ref="editModal" :temp-data="tempData"
  :confirm-fn="confirmFn"></ProductEditModal>
  <div class="container-fluid">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="postProduct">
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
          <td class="text-end">
            <span class="text-mute" v-if="item.is_enabled===0">未啟用</span>
            <span class="text-success" v-else>啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm"
              @click="putProduct(item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click="deleteProduct(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent :pages="pagination" @emit-pages="getProducts" />
  </div>
</template>
<script>
import Swal from 'sweetalert2';

import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductEditModal from '@/components/ProductEditModal.vue';
import MixinComponent from '@/components/MixinComponent.vue';

import { takeoutToken } from '@/methods/myFunction';

const { VITE_APIURL, VITE_API_ADMIN } = import.meta.env;

export default {
  data() {
    return {
      fullScreenLoadingStatus: true,
      products: '',
      tempData: '',
      confirmFn: '',
      pagination: '',
    };
  },
  computed: {
  },
  methods: {
    getProducts(page = 1) {
      this.fullScreenLoadingStatus = true;
      const getProductsPath = `${VITE_APIURL}/api/${VITE_API_ADMIN}/admin/products?page=${page}`;
      // const token = takeoutToken();
      this.$http.get(getProductsPath)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.fullScreenLoadingStatus = false;
        })
        .catch(() => {
          Swal.fire({
            title: '取得資料發生錯誤',
            icon: 'error',
            allowOutsideClick: false,
            timer: 3000,
            timerProgressBar: true,
            confirmButtonText: 'OK',
          });
        });
    },
    openModal() {
      this.$refs.editModal.show();
    },
    hideModal() {
      this.$refs.editModal.hide();
    },
    putProduct(item) {
      const token = takeoutToken();
      this.tempData = { modalTitle: '編輯', productData: item };
      this.confirmFn = (putObj) => {
        this.fullScreenLoadingStatus = true;
        const path = `${VITE_APIURL}/api/${VITE_API_ADMIN}/admin/product/${item.id}`;
        this.$http.put(path, putObj, {
          headers: { Authorization: token },
        })
          .then(() => {
            this.fullScreenLoadingStatus = false;
            this.hideModal();
            this.addToast({ content: '產品更新成功' });
            this.getProducts();
          })
          .catch(() => {
            this.fullScreenLoadingStatus = false;
            this.hideModal();
            Swal.fire({
              title: '發生一點錯誤',
              text: '資料沒有上傳完成，請再試一次。如果持續發生相同問題請聯繫管理員',
              icon: 'error',
              allowOutsideClick: false,
              timer: 3000,
              timerProgressBar: true,
              confirmButtonText: 'OK',
            });
          });
      };

      this.openModal();
    },
    postProduct() {
      const token = takeoutToken();
      this.tempData = { modalTitle: '新增', productData: {} };
      // 將上傳方法傳入
      this.confirmFn = (postObj) => {
        this.fullScreenLoadingStatus = true;
        const path = `${VITE_APIURL}/api/${VITE_API_ADMIN}/admin/product`;
        this.$http.post(path, postObj, {
          headers: { Authorization: token },
        })
          .then(() => {
            this.fullScreenLoadingStatus = false;
            this.hideModal();
            this.addToast({ content: '產品更新成功' });
            this.getProducts();
          })
          .catch(() => {
            this.fullScreenLoadingStatus = false;
            this.hideModal();
            Swal.fire({
              title: '發生一點錯誤',
              text: '資料沒有上傳完成，請再試一次。如果持續發生相同問題請聯繫管理員',
              icon: 'error',
              allowOutsideClick: false,
              timer: 3000,
              timerProgressBar: true,
              confirmButtonText: 'OK',
            });
          });
      };

      this.openModal();
    },
    deleteProduct(item) {
      const path = `${VITE_APIURL}/api/${VITE_API_ADMIN}/admin/product/${item.id}`;
      Swal.fire({
        title: '確認刪除？',
        text: `你確定要刪除品項：${item.title} 嗎？`,
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-secondary ms-3',
        },
        confirmButtonText: '確認刪除',
        cancelButtonText: '取消操作',
      }).then((result) => {
        if (result.isConfirmed) {
          this.fullScreenLoadingStatus = true;
          this.$http.delete(path)
            .then(() => {
              this.fullScreenLoadingStatus = false;
              this.addToast({ content: '成功刪除品項' });
              this.getProducts();
            })
            .catch(() => {
              this.fullScreenLoadingStatus = false;
              this.addToast({ content: '刪除品項過程出現錯誤,請重新整理後再次操作', style: 'error' });
            });
        }
      });
    },
  },
  components: {
    ProductEditModal,
    PaginationComponent,
  },
  mounted() {
    this.getProducts();
  },
  mixins: [MixinComponent],
};
</script>
<style>
</style>
