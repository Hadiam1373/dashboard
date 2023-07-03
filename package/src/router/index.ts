import {createRouter, createWebHistory} from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import {clearItem, getItem} from "@/storage";
import Authentication from "@/api/apis/Authentication";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/pages/Error404.vue')
        },
        MainRoutes,
        AuthRoutes
    ]
});

let isAuthenticated = getItem('accessToken') && getItem('userData')

router.beforeEach(async (to, from) => {
    if (
        // make sure the user is authenticated
        !isAuthenticated &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login'
    ) {
        // redirect the user to the login page
        return {name: 'Login'}
    }
})

