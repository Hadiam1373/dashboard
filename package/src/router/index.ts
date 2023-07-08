import {createRouter, createWebHistory, useRoute} from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import {clearItem, getItem, removeItem} from "@/storage";

const route = useRoute()

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


const role = getItem('userRole')
const adminRole = ['/department', '/packages']
router.beforeEach(async (to, from) => {
    if (role === 'admin') {
        to.matched.map(route => {
            adminRole.map(item => {
                if (item === route.path) console.log('true ////', item)
            })
        })
    }
})
// {
//     window.location.href = "/auth/login";
// }