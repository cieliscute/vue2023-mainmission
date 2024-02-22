<template>
  <div id="productModal" ref="productModal"
  class="modal fade" tabindex="-1"
  data-bs-backdrop="static" data-bs-keyboard="false"
  aria-labelledby="productModalLabel"
  aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{tempData.modalTitle}}產品</span>
          </h5>
          <button type="button" class="btn-close"
          data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 col-lg-4 mb-5 mb-lg-0">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input type="text" class="form-control"
                  placeholder="請輸入圖片連結" v-model="productData.imageUrl">
                </div>
                <img class="img-fluid" src="" alt="">
              </div>
              <div>
                <button class="btn btn-outline-primary btn-sm d-block w-100">
                  新增圖片
                </button>
              </div>
              <!-- 可以加上v-else -->
              <div>
                <button class="btn btn-outline-danger btn-sm d-block w-100">
                  刪除圖片
                </button>
              </div>
            </div>
            <div class="col-12 col-lg-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                v-model="productData.title"
                required>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text"
                  class="form-control" placeholder="請輸入分類"
                  v-model="productData.category"
                  required>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                  v-model="productData.unit"
                  required>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number"
                  min="0" class="form-control" placeholder="請輸入原價"
                  v-model.number="productData.origin_price"
                  required>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                  v-model.number="productData.price"
                  required>
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                v-model="productData.description">
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="content" type="text" class="form-control" placeholder="請輸入說明內容"
                v-model="productData.content">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input"
                  type="checkbox" :true-value="1" :false-value="0"
                  v-model="productData.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="onSubmit">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['tempData', 'confirmFn'],
  data() {
    return {
      bsModal: '',
      productData: {
      },
    };
  },
  methods: {
    show() {
      this.bsModal.show();
    },
    hide() {
      this.bsModal.hide();
    },
    onSubmit() {
      this.confirmFn({ data: this.productData });
    },
  },
  watch: {
    tempData(n) {
      this.productData = { ...n.productData };
    },
  },
  mounted() {
    const El = this.$refs.productModal;
    this.bsModal = new this.$bs.Modal(El);
  },
};
</script>
<style scoped>
</style>
