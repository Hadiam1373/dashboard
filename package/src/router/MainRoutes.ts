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
                    path: '/invoices/invoice-list/:id?',
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
            name: 'UserKyc',
            path: '/user-kyc',
            component: () => import('@/views/dashboard/user-kyc/index.vue'),
        },
        {
            name: 'Message',
            path: '/message',
            redirect: '/message/message-list',
            component: () => import('@/views/dashboard/message/index.vue'),
            children: [
                {
                    name: 'MessageList',
                    path: 'message-list',
                    component: () => import('@/views/dashboard/message/message-list.vue'),
                },
            ]
        },
        {
            name: 'Department',
            path: '/department',
            redirect: '/department/department-list',
            component: () => import('@/views/dashboard/departments/index.vue'),
            children: [
                {
                    name: 'DepartmentList',
                    path: 'department-list',
                    component: () => import('@/views/dashboard/departments/department-list.vue'),
                },
                {
                    name: 'EditeDepartment',
                    path: 'edite-department/:id?',
                    component: () => import('@/views/dashboard/departments/edite-department.vue'),
                },
            ]
        },
        {
            name: 'KYC',
            path: '/kyc',
            redirect: '/kyc/kyc-list',
            component: () => import('@/views/dashboard/kyc/index.vue'),
            children: [
                {
                    name: 'KYClList',
                    path: 'kyc-list',
                    component: () => import('@/views/dashboard/kyc/kyc-list.vue'),
                },
                {
                    name: 'User',
                    path: 'user/:id',
                    component: () => import('@/views/dashboard/kyc/show-user-data.vue'),
                }
            ]
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
                    path: 'deposit-list/:id?',
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
                    children: [
                        {
                            name: 'UserList',
                            path: 'show-user-list',
                            component: () => import('@/views/dashboard/users/user-list/user-list.vue'),
                        },
                        {
                            name: 'EditUserData',
                            path: 'edit-user-data/:id?',
                            component: () => import('@/views/dashboard/users/user-list/edit-user-data.vue'),
                        },
                        {
                            name: 'EditPassword',
                            path: 'edit-password/:id?',
                            component: () => import('@/views/dashboard/users/user-list/edit-password.vue'),
                        },
                        {
                            name: 'EditRole',
                            path: 'edit-role/:id?',
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
                    redirect: '/users/user-roles/role-list',
                    component: () => import('@/views/dashboard/users/roles/index.vue'),
                    children: [
                        {
                            name: 'EditRoles',
                            path: 'edit-roles/:id?',
                            component: () => import('@/views/dashboard/users/roles/new-role.vue'),
                        },
                        {
                            name: 'Role',
                            path: 'role-list',
                            component: () => import('@/views/dashboard/users/roles/roles.vue'),
                        }
                    ]
                },
                {
                    name: 'Permissions',
                    path: 'permissions',
                    redirect: '/users/permissions/PermissionsList',
                    component: () => import('@/views/dashboard/users/permissions/index.vue'),
                    children: [
                        {
                            name: 'EditPermissions',
                            path: 'editPermissions/:id?',
                            component: () => import('@/views/dashboard/users/permissions/new-permissions.vue')
                        },
                        {
                            name: 'PermissionsList',
                            path: 'PermissionsList',
                            component: () => import('@/views/dashboard/users/permissions/permissions.vue')
                        }
                    ]
                },
            ]
        },
        {
            name: 'Ticket',
            path: '/tickets',
            redirect: '/tickets/listTicket',
            component: () => import('@/views/dashboard/tickets/index.vue'),
            children: [
                {
                    name: 'ListTicket',
                    path: 'listTicket',
                    component: () => import('@/views/dashboard/tickets/ticketList.vue')
                },
                {
                    name: 'TicketInfo',
                    path: 'ticketInfo/:id?',
                    component: () => import('@/views/dashboard/tickets/showTicket.vue')
                }
            ]
        },
        {
            name: 'Withdraw',
            path: '/withdraw',
            redirect: '/withdraw/withdraw-list',
            component: () => import('@/views/dashboard/withdraw/index.vue'),
            children: [
                {
                    name: 'WithdrawList',
                    path: 'withdraw-list',
                    component: () => import('@/views/dashboard/withdraw/withdrawList.vue'),
                },
                {
                    name: 'CreateWithdraw',
                    path: 'createWithdraw',
                    component: () => import('@/views/dashboard/withdraw/createWithdraw.vue'),
                },
            ]
        },
        {
            name: 'Packages',
            path: '/packages',
            redirect: '/packages/packages-list',
            component: () => import('@/views/dashboard/packages/index.vue'),
            children: [
                {
                    name: 'PackagesList',
                    path: 'packages-list',
                    component: () => import('@/views/dashboard/packages/packageslist.vue'),
                },
                {
                    name: 'CreatePackage',
                    path: 'CreatePackage/:id?',
                    component: () => import('@/views/dashboard/packages/create-package.vue'),
                },
            ]
        },
    ]
};


export default MainRoutes;
