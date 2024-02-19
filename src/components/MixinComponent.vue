<script>
// import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      SwalToastInstance: '',
    };
  },
  methods: {
    // style有：success,error,warning,info,question 可以使用
    // https://sweetalert2.github.io/#icons
    addToast({ style = 'success', content, timer = 3000 }) {
      this.SwalToastInstance.fire({
        icon: style,
        title: content,
        timer,
      });
    },
  },
  mounted() {
    this.SwalToastInstance = Swal.mixin({
      toast: true,
      position: 'top-end',
      animation: true,
      showConfirmButton: false,
      timerProgressBar: true,
      showCloseButton: true,
    });
  },
};
</script>
