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
            redirect: '/invoices/invoice-list',
            children: [
                {
                    name: 'InvoiceList',
                    path: '/invoices/invoice-list',
                    component: () => import('@/views/dashboard/invoice/InvoiceList.vue'),
                },
                {
                    name: 'InvoiceSetting',
                    path: '/invoices/invoice-setting/:id?',
                    component: () => import('@/views/dashboard/invoice/invoice-setting.vue'),
                },
            ]
        },
        {
            name: 'Setting',
            path: '/setting',
            component: () => import('@/views/dashboard/setting/index.vue'),
        }
    ]
};


export default MainRoutes;
