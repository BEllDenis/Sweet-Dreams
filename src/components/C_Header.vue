<script>

export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    ToHome() {
      this.$router.push({ name: "home" })
    },
    ToCatalog() {
      this.$router.push({ name: "catalog" })
    },
    ToAboutUs() {
      this.$router.push({ name: "aboutus" })
    },

  },
  computed: {

  },
  mounted() {
    
  }
};
</script>

<template>
  <header class="flex-row">
    <img
      class="logo"
      src="../assets/images/LandingPage/SweetDreams_Logo@2x.png"
      alt="Логотип"
    />

    <nav class="flex-row">
      <a class="button nav-button flex-row" :class="{'filled': $route.name == 'home'}" @click="ToHome()">
        <i class="icon-home icon"></i>
        <p class="nav-button_text">ГЛАВНАЯ</p>
      </a>

      <a class="button nav-button flex-row" :class="{'filled': $route.name == 'catalog'}" @click="ToCatalog()">
        <i class="icon-catalog icon"></i>
        <p class="nav-button_text">КАТАЛОГ</p>
      </a>

      <a class="button nav-button flex-row" :class="{'filled': $route.name == 'aboutus'}" @click="ToAboutUs()">
        <i class="icon-info icon"></i>
        <p class="nav-button_text">О НАС</p>
      </a>

      <div class="separate-line d-none"></div>

      <a class="button nav-button flex-row d-none">
        <i class="icon-user icon"></i>
        <p class="nav-button_text">АККАУНТ</p>
      </a>
    </nav>
  </header>
</template>

<style>
/* ========================= HEADER ========================= */

header {
  position: sticky;
  top: 0px;
  left: 0px;
  z-index: 1;

  justify-items: center;
  align-items: center;
  justify-content: space-between;

  width: auto;
  height: 70px;

  padding: 0px 120px;

  background-color: var(--white);
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.2));
}

.logo {
  height: 70%;
}

/* ------------- Nav ------------- */
nav {
  align-items: center;
  gap: 2rem;
}

/* .nav-button_icon {
  font-family: "Cygre";
  font-size: 1.6rem;

  transition: color 0.2s;
} */

.nav-button_text {
  padding-top: 0.3rem;

  font-size: 1.3rem;
  letter-spacing: 0.1rem;
}

.separate-line {
  width: 3px;
  height: 40px;
  border-radius: 100px;
  background-color: var(--pink-white);
}
</style>
