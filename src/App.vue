<script>
import C_Header from './components/C_Header.vue'
import C_Footer from './components/C_Footer.vue'

import { RouterView } from 'vue-router'

export default {
  components: {
    C_Header, C_Footer, RouterView
  },
  data() {
    return {

    }
  },
  methods: {

    
  },
  computed: {
    
  }
}
</script>

<template>
  
  <C_Header/>

  <RouterView></RouterView>

  <C_Footer/>
  
</template>

<style>

/* Добавление шрифта */
@font-face {
  font-family: "Cygre";
  src: url("./assets/fonts/Cygre-SemiBold.woff2");
  font-weight: 500;
  font-style: normal;
}

/* Переменные */
:root {
  --pink: rgb(255, 0, 106); 
  --white-pink: rgb(255, 192, 218);
  --pink-white: rgb(255, 158, 198);
  --white: #FFFFFF;
  --accent-col: rgb(255, 119, 176);
  --accent-col-2: rgb(255, 216, 232);

}

/* Глобальные (заранее сделанные) стили */

html::-webkit-scrollbar {
  display: none;
}

.d-none { 
  display: none !important
}

body {
  font-family: "Cygre";
  color: #FF006A;

  cursor: default;
  user-select: none;
  
  line-height: 1;
  /* background-image: url(./assets/images/triangle-mosaic.webp);
  background-size: 25%;
  background-position: center center; */
}



.wrapper {
  padding: 0px 120px;
}

p, li {
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
}

h1, h2 {
  font-size: 7rem;
}

h2 {
  text-align: center;
  line-height: 0.8;
}

h3 {
  font-size: 2.1rem;
}

.fs-1-7rem {
  font-size: 1.7rem;
}

.fs-2rem {
  font-size: 2rem;
}

.fs-2-5rem {
  font-size: 2.5rem;
}

.fs-3rem {
  font-size: 3rem;
}

a, i, p, .button {
  transition: transform 0.2s, color 0.2s, background-color 0.2s; /* Заменил scale на transform */
  transition-timing-function: cubic-bezier(0.3, 0, 0.31, 0.99);
  will-change: transform; /* Оптимизация анимации */
}

.button, .check-box, .radio-button {
  cursor: pointer; 
}

.button {
  color: var(--pink);


  padding: 0.7rem 0.7rem;
  gap: 0.7rem;
  
  border-radius: 0.7rem; /* Убрал !important */
  
  justify-content: center;
  align-items: center;
}

.button:hover {
  transform: scale(1.1); /* Заменил scale на transform */
  color: var(--accent-col);
}

.button.filled   {
  color: var(--white);
  background-color: var(--pink);
}

.button.filled:hover {
  background-color: var(--accent-col)
}

.button.filled.inverted {
  color: var(--pink);
  background-color: var(--white);
}

.flex-col {
  display: flex;
  flex-flow: column nowrap;
}

.flex-row {
  display: flex;
  flex-flow: row nowrap;
}

.icon {
  font-size: 1.6rem;
}

</style>