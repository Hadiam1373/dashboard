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
        },
        {
            name: 'Profit',
            path: '/profits',
            component: () => import('@/views/dashboard/profit/index.vue'),
        },
        {
            name: 'KYClList',
            path: '/kyc-list',
            component: () => import('@/views/dashboard/kyc/index.vue'),
        },
        {
            name: 'WalletList',
            path: '/wallets',
            component: () => import('@/views/dashboard/wallet/index.vue'),
        },
        {
            name: 'Transactions',
            path: '/transactions',
            redirect: '/transactions/withdraw-list',
            component: () => import('@/views/dashboard/transactions/index.vue'),
            children: [
                {
                    name: 'WithdrawList',
                    path: 'withdraw-list',
                    component: () => import('@/views/dashboard/transactions/withdraw-list.vue'),
                },
                {
                    name: 'DepositList',
                    path: 'deposit-list',
                    component: () => import('@/views/dashboard/transactions/deposit-list.vue'),
                },
                {
                    name: 'suspendList',
                    path: 'suspend-List',
                    component: () => import('@/views/dashboard/transactions/suspend-List.vue'),
                }
            ]
        },
        {
            name: 'Users',
            path: '/users',
            redirect: '/users/users-list',
            component: () => import('@/views/dashboard/users/index.vue'),
            children: [
                {
                    name: 'UsersList',
                    path: 'users-list',
                    redirect: '/users/users-list/show-user-list',
                    component: () => import('@/views/dashboard/users/user-list/index.vue'),
                    children:[
                        {
                            name: 'UserList',
                            path: 'show-user-list',
                            component: () => import('@/views/dashboard/users/user-list/user-list.vue'),
                        },
                        {
                            name: 'EditUserData',
                            path: 'edit-user-data/:id',
                            component: () => import('@/views/dashboard/users/user-list/edit-user-data.vue'),
                        },
                        {
                            name: 'EditPassword',
                            path: 'edit-password',
                            component: () => import('@/views/dashboard/users/user-list/edit-password.vue'),
                        },
                        {
                            name: 'EditRole',
                            path: 'edit-role',
                            component: () => import('@/views/dashboard/users/user-list/edit-role.vue'),
                        }
                    ]
                },
                {
                    name: 'CreateUser',
                    path: 'create-user',
                    component: () => import('@/views/dashboard/users/create-user.vue'),
                },
                {
                    name: 'UserRoles',
                    path: 'user-roles',
                    component: () => import('@/views/dashboard/users/roles.vue'),
                },
                {
                    name: 'Permissions',
                    path: 'permissions',
                    component: () => import('@/views/dashboard/users/permissions.vue'),
                },
            ]
        }
    ]
};


export default MainRoutes;
