export interface quickActionInterface {
    icon: string;
    title: string;
    hasBtn: boolean;
}

const quickActions: quickActionInterface[] = [
    {
        icon: 'account_balance_wallet',
        title: 'Balance',
        hasBtn: false
    },
    {
        icon: 'savings',
        title: 'Savings',
        hasBtn: true
    },
    {
        icon: 'south',
        title: 'Inflow',
        hasBtn: true
    },
    {
        icon: 'north',
        title: 'Outflow',
        hasBtn: true
    },
    {
        icon: 'north',
        title: 'Categories',
        hasBtn: true
    }
]


export default quickActions