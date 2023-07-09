import {getItem} from "@/storage";

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const adminMenu: menu[] = [
    {
        title: 'dashboard',
        icon: 'mdi-view-dashboard',
        to: '/',
    },
    {
        title: 'kyc',
        icon: 'mdi-fingerprint',
        to: '/user-kyc',
    },
    {
        title: 'gateways',
        icon: 'mdi-cart-outline',
        to: '/gateways',
    },
    {
        title: 'invoices',
        icon: 'mdi-credit-card',
        to: '/invoices',
    },
    {
        title: 'upgrade',
        icon: 'mdi-rocket-launch',
        to: '/upgrade',
    },
    {
        title: 'invite friends',
        icon: 'mdi-account-plus',
        to: '/invite-friends',
    },
    {
        title: 'profits',
        icon: 'mdi-cash-multiple',
        to: '/profits',
    },
    {
        title: 'wallets',
        icon: 'mdi-wallet',
        to: '/wallets',
    },
    {
        title: 'tickets',
        icon: 'mdi-ticket-confirmation',
        to: '/tickets',
    },
    {
        title: 'withdraw',
        icon: 'mdi-wallet-travel',
        children: [
            {
                title: 'withdraw requests list',
                to: '/withdraw/withdraw-list'
            }
        ]
    },
    {
        title: 'setting',
        icon: 'mdi-cog',
        to: '/setting',
    },
    {
        title: 'ChangePassword',
        icon: 'mdi-lock',
        to: '/change-password',
    },
    {
        title: 'ChangeHistory',
        icon: 'mdi-history',
        to: '/changeHistory',
    },
//     just admin
    {
        title: 'departments',
        icon: 'mdi-face-agent',
        to: '/department',
    },
    {
        title: 'packages',
        icon: 'mdi-package-variant-closed',
        to: '/packages',
    },
    {
        title: 'message',
        icon: 'mdi-message-reply-text',
        to: '/message',
    },
    {
        title: 'users',
        icon: 'mdi-account',
        children: [
            {
                title: 'UserList',
                to: '/users/users-list'
            },
            {
                title: 'CreateUser',
                to: '/users/create-user'
            },
            {
                title: 'UserRoles',
                to: '/users/user-roles'
            },
            {
                title: 'Permissions',
                to: '/users/permissions'
            }
        ]
    },
    {
        title: 'transactions',
        icon: 'mdi-swap-horizontal',
        children: [
            {
                title: 'Deposit List',
                to: '/transactions/deposit-list'
            },
            {
                title: 'Withdraw List',
                to: '/transactions/withdraw-list'
            }
        ],
    },
    {
        title: 'LogManager',
        icon: 'mdi-chart-timeline-variant',
        to: '/logManager',
    },
    {
        title: 'Kyc List',
        icon: 'mdi-fingerprint',
        to: '/kyc',
    },
]

const userMenu: menu[] = [
    {
        title: 'dashboard',
        icon: 'mdi-view-dashboard',
        to: '/',
    },
    {
        title: 'kyc',
        icon: 'mdi-fingerprint',
        to: '/user-kyc',
    },
    {
        title: 'gateways',
        icon: 'mdi-cart-outline',
        to: '/gateways',
    },
    {
        title: 'invoices',
        icon: 'mdi-credit-card',
        to: '/invoices',
    },
    {
        title: 'upgrade',
        icon: 'mdi-rocket-launch',
        to: '/upgrade',
    },
    {
        title: 'invite friends',
        icon: 'mdi-account-plus',
        to: '/invite-friends',
    },
    {
        title: 'profits',
        icon: 'mdi-cash-multiple',
        to: '/profits',
    },
    {
        title: 'wallets',
        icon: 'mdi-wallet',
        to: '/wallets',
    },
    {
        title: 'transactions',
        icon: 'mdi-swap-horizontal',
        children: [
            {
                title: 'Deposit List',
                to: '/transactions/deposit-list'
            }
        ],
    },
    {
        title: 'tickets',
        icon: 'mdi-ticket-confirmation',
        to: '/tickets',
    },
    {
        title: 'withdraw',
        icon: 'mdi-wallet-travel',
        children: [
            {
                title: 'withdraw requests list',
                to: '/withdraw/withdraw-list'
            },
            {
                title: 'create withdraw request',
                to: '/withdraw/createWithdraw'
            },
        ]
    },
    {
        title: 'setting',
        icon: 'mdi-cog',
        to: '/setting',
    },
    {
        title: 'ChangePassword',
        icon: 'mdi-lock',
        to: '/change-password',
    },
    {
        title: 'ChangeHistory',
        icon: 'mdi-history',
        to: '/changeHistory',
    },
]

let sidebarItem: menu[] = [];

(function runSideBarByRoles() {
    const role = getItem('userRole')
    if (role === 'user') {
        sidebarItem = userMenu
    } else if (role === 'admin') {
        sidebarItem = adminMenu
    }
}())


export default sidebarItem;
