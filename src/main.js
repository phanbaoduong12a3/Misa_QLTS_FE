import { createApp } from 'vue'

import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import MoneySpinner from 'v-money-spinner'
// import Vue from 'vue'
import excel from 'vue-excel-export'
 

const app = createApp(App);

app.component('Date-picker', Datepicker);

app.use(MoneySpinner);

app.use(VueAxios, axios);

app.use(excel);

app.mount('#app');

// createApp(App).use(VueAxios, axios).mount('#app');

