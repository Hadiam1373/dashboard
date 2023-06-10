const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'Gateways',
            path: '/gateways',
            component: () => import('@/views/dashboard/gateways/gateways.vue'),
            redirect: '/gateways/gatewaysList',
            children: [
                {
                    name: 'GatewaysList',
                    path: '/gateways/gatewaysList',
                    component: () => import('@/views/dashboard/gateways/GatewayList.vue'),
                },
                {
                    name: 'CreateNewGateways',
                    path: '/gateways/newGateways/:id?',
                    component: () => import('@/views/dashboard/gateways/CreateNewGateway.vue'),
                }
            ]
        },
        {
            name: 'Invoice',
            path: '/invoices',
            component: () => import('@/views/dashboard/invoice/index.vue'),
            children: [
                {
                    name: 'InvoiceSetting',
                    path: '/invoices/invoice-setting',
                    component: () => import('@/views/dashboard/invoice/invoice-setting.vue'),
                },
            ]
        },
    ]
};


export default MainRoutes;
