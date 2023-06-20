import {createApp} from 'vue';
import App from './App.vue';
import {router} from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import Maska from 'maska';
import VueSweetalert2 from 'vue-sweetalert2';
import {options} from "@/theme/sweet-alert-theme";
import 'sweetalert2/dist/sweetalert2.min.css';
import '@vuepic/vue-datepicker/dist/main.css'
import VOtpInput from "vue3-otp-input";




const app = createApp(App);
app.use(router);
app.use(PerfectScrollbar);
app.use(VueTablerIcons);
app.use(Maska);
app.use(VueApexCharts);
app.use(VueSweetalert2, options);
app.component('v-otp-input', VOtpInput)
app.use(vuetify).mount('#app');
