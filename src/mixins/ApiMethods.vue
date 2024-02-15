<script>
import axios from 'axios';

export default {
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      const path = `${import.meta.env.VITE_APIURL}/v2/api/user/check`;
      this.$http.defaults.headers.common.Authorization = `${token}`;
      axios.post(path)
        .then((res) => {
          console.log(res);
        })
        .catch(() => {
          // this.$router.push('/dashboard');
        });
    },
  },
  mounted() {
  },
};
</script>
