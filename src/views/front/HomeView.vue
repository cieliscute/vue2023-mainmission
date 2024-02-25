<template>
  <nav class="navbar bg-dark border-bottom border-body navbar-expand-sm" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click.prevent>前台頁面</a>
      <button class="navbar-toggler" type="button"
      data-bs-toggle="collapse" data-bs-target="#navcollapse"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navcollapse">
        <ul class="navbar-nav me-auto my-1">
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page"
            to="/home">首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page"
            to="/orders">購買頁面</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page"
            to="/adminlogin">前往後台頁</RouterLink>
          </li>
        </ul>
        <!-- <button class="btn btn-outline-success me-0 me-sm-2"
        type="button">登出</button> -->
      </div>
    </div>
  </nav>
  <RouterView></RouterView>
</template>
