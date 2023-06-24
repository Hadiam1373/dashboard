import {
    ApertureIcon,
    CopyIcon, DashboardIcon,
    LayoutDashboardIcon, LoginIcon, MoodHappyIcon, TypographyIcon, UserPlusIcon
} from 'vue-tabler-icons';

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

const sidebarItem: menu[] = [
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
        title: 'Kyc List',
        icon: 'mdi-fingerprint',
        to: '/kyc',
    },
    {
        title: 'wallets',
        icon: 'mdi-wallet',
        to: '/wallets',
    },
    {
        title: 'users',
        icon: 'mdi-account',
        children: [
            {
                title: 'UserList',
                to:'/users/users-list'
            },
            {
                title: 'CreateUser',
                to:'/users/create-user'
            },
            {
                title: 'UserRoles',
                to:'/users/user-roles'
            },
            {
                title: 'Permissions',
                to:'/users/permissions'
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
        title: 'tickets',
        icon: 'mdi-ticket-confirmation',
        to: '/tickets',
    },
    {
        title: 'withdraw',
        icon: 'mdi-wallet-travel',
        children: [
            {
                title:'withdraw requests list',
                to:'/withdraw/withdraw-list'
            },
            {
                title:'create withdraw request',
                to:'/withdraw/createWithdraw'
            },
        ]
    },
    {
        title: 'setting',
        icon: 'mdi-cog',
        to: '/setting',
    },
    {
        title: 'change password',
        icon: 'mdi-lock',
        to: '/change-password',
    },
    {
        title: 'documentation',
        icon: 'mdi-file-document-outline',
        to: '/gateway-documentation',
    }
];

export default sidebarItem;
