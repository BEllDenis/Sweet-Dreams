import { createRouter, createWebHistory } from 'vue-router'

import U_HomePage from './views/U_HomePage.vue';
import U_Catalog from './views/U_Catalog.vue';
import U_AboutUs from './views/U_AboutUs.vue';


export default createRouter({
    // История переходов сохраняется 
    history: createWebHistory(),
    
    // Роуты и компоненты
    routes: [
        {
            name: 'home',
            path: '/',
            component: U_HomePage
        },
        {
            name: 'catalog',
            path: '/catalog',
            component: U_Catalog
        },
        {
            name: 'aboutus',
            path: '/aboutus',
            component: U_AboutUs
        },


    ]
});