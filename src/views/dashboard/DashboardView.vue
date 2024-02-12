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
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {

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
