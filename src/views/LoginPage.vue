<template>
  <div class="wrap position-relative">
    <img src="https://images.unsplash.com/photo-1585978075589-fc6561e20296?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="vh-100 w-100 object-fit-cover position-fixed top-0 left-0 z-n1" id="background" ref="background">
    <div class="container">
      <div class="vh-100 row justify-content-center align-items-center">
        <div class="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
          <div class="login-box bg-black rounded p-4" style="--bs-bg-opacity: .6;">
            <h2 class="text-info text-center mt-3">Login</h2>
            <form @submit="onSubmit">
              <div class="form-floating mb-3">
                <input type="email" class="form-control bg-transparent rounded-0 text-white border-0 border-bottom"
                  id="emailInput" placeholder="Email Address" v-model.lazy="user.username">
                <label for="emailInput" class="text-info">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control bg-transparent rounded-0 text-white border-0 border-bottom"
                  id="passwordInput" placeholder="Password" v-model.lazy="user.password">
                <label for="passwordInput" class="text-info">Password</label>
              </div>
              <a href="#" @click.prevent="onSubmit" class="mb-3 w-100 text-center">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                登入後台
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import RainyDay from '../plugin/rainyday';
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      const path = `${import.meta.env.VITE_APIURL}/admin/signin`
      this.$http.post(path, this.user)
        .then(response => {
          const token = response.data.token;
          const expired = response.data.expired;
          // 設定cookie
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          // this.$http.defaults.headers.common.Authorization = `${token}`;
          this.$router.push('/managepage')
        })
        .catch(error => {
          console.log(error);
        })
    },
    // rainyEffect() {
    //   // var image = document.getElementById('background');
    //   var image = this.$refs.background;
    //   image.onload = function () {
    //     var engine = new RainyDay({
    //       image: this,
    //       gravityAngle: Math.PI / 9
    //     });
    //     engine.trail = engine.TRAIL_SMUDGE;
    //     engine.rain([
    //       [1, 0, 1000],
    //       [3, 3, 1]
    //     ], 0);
    //   };
    //   image.crossOrigin = 'anonymous';
    //   image.src = 'http://i.imgur.com/VuX2Nf0.jpg';
    // }
  },
  mounted() {
    // this.rainyEffect2();
  },
}
</script>
<style scoped lang="scss">
// label在縮到左上方時需為透明（原本是白色）
.form-floating>.form-control:focus~label::after,
.form-floating>.form-control:not(:placeholder-shown)~label::after,
.form-floating>.form-control-plaintext~label::after,
.form-floating>.form-select~label::after {
  background-color: transparent;
}

// 不想要focus ring
.form-control:focus {
  box-shadow: none;
}

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

img {
  filter: blur(4px);
  transform: scale(1.01);
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
    0 0 25px #03e9f4,
    0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }

  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
}
</style>
