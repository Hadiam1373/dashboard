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
        to: '/kyc',
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
        to: '/kyc-list',
    },
    {
        title: 'wallets',
        icon: 'mdi-wallet',
        to: '/wallets',
    },
    {
        title: 'transactions',
        icon: 'mdi-swap-horizontal',
        to: '/transactions',
        children: [
            {
                title:'Deposit List',
                to: '/transactions/deposit-list'
            },
            {
                title:'Withdraw List',
                to: '/transactions/withdraw-list'
            },
            {
                title:'suspend List',
                to: '/transactions/suspend-List'
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
                to: '/'
            },
            {
                title: 'create withdraw request',
                to: '/'
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
    },
    {
        title: 'changelog history',
        icon: 'mdi-history',
        to: '/changelog-history',
    },
];

export default sidebarItem;
