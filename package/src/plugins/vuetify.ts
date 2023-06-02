import {createVuetify} from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import theme from "@/plugins/theme";
import fa  from "../i18n/locale/fa.mjs";
import en  from "../i18n/locale/en.mjs"


// @ts-ignore
export default createVuetify({
    components,
    directives,
    theme,
    locale: {
        locale: 'fa',
        fallback: 'fa',
        messages: {fa , en},
        rtl: {
            fa: true
        }
    },
    defaults: {
        VBtn: {},
        VCard: {
            rounded: 'md'
        },
        VTextField: {
            rounded: 'lg'
        },
        VTooltip: {
            // set v-tooltip default location to top
            location: 'top'
        }
    }
});
