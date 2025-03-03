<script>
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3000"

import VanillaTilt from '../vanilla-tilt.js';

export default {
  components: {
  },
  data() {
    return {
      Products: [],

      Categories: [
        {
          name: "Торты",
          value: "торты"
        },
        {
          name: "Эклеры",
          value: "эклеры"
        },
        {
          name: "Круассаны",
          value: "круассаны"
        },
        {
          name: "Пирожные",
          value: "пирожные"
        }
      ],
      SelectedCategories: ["торты", "эклеры", "круассаны", "пирожные"],
      
      TypesOfSort: [
        {
          name: "(Отсутствует)",
          value: "",
          initialValue: true
        },
        {
          name: "По новизне",
          value: "New"
        },
        {
          name: "По цене (возростание)",
          value: "PriceIncrease"
        },
        {
          name: "По цене (убывание)",
          value: "PriceDecrease"
        },
      ],
      SelectedTypeOfSort: '',

    };
  },
  methods: {
    initTilt() {
      // Используем nextTick для гарантии рендеринга DOM
      this.$nextTick(() => {
        
        // Инициализация для всех элементов с классом tilt-element
        const elements = document.querySelectorAll(".tilt-element");
        if (elements.length > 0) {
          VanillaTilt.init(elements, {
            reverse: true,
            max: 10,
            perspective: 2000,
            speed: 2000,
            transition: true,
            scale: 1.05,
            glare: false,
            "max-glare": 0.10,
          });
        }

        // Инициализация для всех обратных элементов с классом tilt-element-reversed
        const elements_reversed = document.querySelectorAll(".tilt-element-reversed");
        if (elements_reversed.length > 0) {
          VanillaTilt.init(elements_reversed, {
            reverse: false,
            max: 10,
            perspective: 2500,
            speed: 2000,
            transition: true,
            scale: 1.05,
            glare: false,
            "max-glare": 0.10,
          });
        }
      });

    },
    async LoadProducts() {
      let response = await axios.get('/catalog', {
        params: {
          SelectedCategories: this.SelectedCategories,
          SelectedTypeOfSort: this.SelectedTypeOfSort
        }
      });

      this.Products = response.data;
      this.initTilt();

    }

  },
  mounted() {
    this.LoadProducts();

    this.initTilt();
  },
  // Очистка при размонтировании компонента
  beforeUnmount() {
    const elements = document.querySelectorAll(".tilt-element");
    elements.forEach(element => {
      if (element.vanillaTilt) {
        element.vanillaTilt.destroy();
      }
    });
  }
}
</script>

<template>
  <main>
    <!-- Загаловок -->
    <section class="header wrapper">
      <h2>КАТАЛОГ</h2>
    </section>

    <!-- Пространство фильтра и вывода продуктов -->
    <section class="grid wrapper">

      <!-- Пространство фильтра -->
      <section class="filter-container flex-col tilt-element-reversed">

        <!-- Заголовок пространства -->
        <div class="header flex-row">
          <i class="icon-filter icon"></i>
          <p class="fs-2rem"> ФИЛЬТРЫ </p>
        </div>

        <!-- Разделитель -->
        <!-- <div class="separate-line"></div> -->

        <!-- Фильтрация по категориям -->
        <div class="filter-categories flex-col">

          <p class="fs-1-7rem"> Категории: </p>
          
          <div class="categories flex-col">

            <label class="flex-row" v-for="(category, index) in Categories"> 
              <input class="check-box" type="checkbox" checked :value="category.value" v-model="SelectedCategories" @change="LoadProducts()"> {{ category.name }} 
            </label>

          </div>
        </div>

        
        <!-- Фильтрация по актуальности -->
        <div class="filter-sort flex-col">

          <p class="fs-1-7rem"> Сортировка: </p>

          <div class="sort flex-col">

            <label class="flex-row" v-for="(TypeOfSort, index) in TypesOfSort"> 
              <input class="radio-button" type="radio" name="sort" :value="TypeOfSort.value" :checked="TypeOfSort.initialValue" v-model="SelectedTypeOfSort" @change="LoadProducts()"> {{TypeOfSort.name}} 
            </label>

          </div>

        </div>

        <!-- Разделитель -->
        <!-- <div class="separate-line"></div> -->

        <!-- Кнопка -->
        <!-- <a class="button filled inverted flex-row" @click="LoadProducts" >
          <i class="icon-magic_wand icon"></i>
          <p class="nav-button_text">Применить</p>
        </a> -->

      </section>

      <!-- Пространство вывода продуктов -->
      <section class="products-container">

        <div class="product_card flex-col" v-for="(product, index) in Products">

          <!-- 1 Половина карточки -->
          <div class="space_between-contaier flex-col">

            <div class="product_card-image tilt-element" :style="'background-image:' + 'url(' + product.ImagePath + ');'"></div>

            <div class="product_card-text_section flex-col">
              <p class="name">{{ product.Name }}</p>
              <p class="description">{{ product.Description }}</p>
            </div>
          </div>

          <!-- 2 Половина карточки -->
          <div class="space_between-contaier flex-col">

            <div class="product_card-text_section flex-row">
              <p class="price">{{ product.Price }} ₽</p>
              <p class="weight">{{ product.Weight }} КГ</p>
            </div>

            <a class="button filled flex-row d-none">
              <i class="icon-shopping_busket_plus icon"></i>
              <p class="nav-button_text">В корзину</p>
            </a>
          </div>
          
          

        </div>

      </section>
    </section>
  </main>
</template>

<style scoped>

/* ========================= MAIN ========================= */

main {
  width: 100%;
  min-height: calc(100dvh - 70px);
}

/* ========================= HEADER ========================= */

main > .header {
  margin-top: 60px;
  margin-bottom: 60px;
}

/* ========================= GRID ========================= */

.grid {
  position: relative;
  display: grid;
  grid-template-columns: 400px 1fr;
}

/* ========================= FILTER ========================= */

/* ------------- filter ------------- */

.filter-container {
  position: sticky;
  top: calc(70px + 3rem);

  height: fit-content;

  gap: 2rem;
  padding: 2rem;
  margin-bottom: 3rem;

  border-radius: 0.7rem;

  color: var(--white);
  background-color: var(--pink);
}

.filter-container .header{
  align-items: center;
  gap: 0.7rem;
}

.filter-container .icon-filter {
  font-size: 2rem;
}

.separate-line {
  height: 3px;
  width: 100%;
}

/* ------------- filter category ------------- */

.filter-categories, .filter-sort {
  gap: 1.5rem;
}


.categories, .sort {
  gap: 0.5rem
}

/* ------------- filter category - checkbox ------------- */

label {
  align-items: center;
  font-size: 1.5rem;
}

.check-box, .radio-button {
  appearance: none;

  margin-right: 0.7rem;
}

.check-box {
  position: relative;
  

  width: 1.5rem;
  height: 1.5rem;

  border: 3px solid var(--white);
  border-radius: 25%;
}

.check-box::before {
  content: '';
  position: absolute;

  width: 1.5rem;
  height: 1.5rem;

  border-radius: 25%;

  background-color: transparent;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.check-box:checked::before {
  background-color: var(--white);
}

/* ------------- sort - radio-button ------------- */

.radio-button {
  position: relative;
  appearance: none;

  width: 1.5rem;
  height: 1.5rem;

  margin-right: 0.7rem;

  border: 3px solid var(--white);
  border-radius: 50%;
}

.radio-button::before {
  content: '';
  position: absolute;

  width: 1.5rem;
  height: 1.5rem;

  border-radius: 50%;
  background-color: transparent;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.radio-button:checked::before {
  background-color: var(--white);
}


/* ========================= PRODUCTS ========================= */

.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-auto-rows: auto;

  gap: 3rem;

  padding: 0 0rem 3rem 3rem;
}


.product_card {
  justify-content: space-between;
  gap: 1.5rem;
  /* aspect-ratio: 1 / 1.7; */
}

.space_between-contaier {
  gap: 1rem;
}

/* ------------- Image ------------- */

.product_card-image {
  aspect-ratio: 1 / 1;

  border-radius: 0.7rem;

  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center center;

  transition: background-size, filter;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier( 0, 0.13, 0, 0.99 );
}

.product_card-image:hover {
  background-size: auto 110%;
  filter: saturate(115%)
}

/* ------------- Text Section ------------- */

.product_card-text_section.flex-col {
  gap: 1rem;

  height: fit-content;
}

.name {
  font-size: 2.1rem;
}

.description {
  font-size: 1.2rem;
}

.price, .weight {
  font-size: 1.6rem;
}

.product_card-text_section.flex-row {
  justify-content: space-between;
}





</style>
