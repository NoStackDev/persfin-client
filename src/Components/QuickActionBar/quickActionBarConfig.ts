interface quickActionInterface {
    icon: string;
    title: string;
    amount: number;
    hasBtn: boolean;
}

const quickActions: quickActionInterface[] = [
    {
        icon: 'account_balance_wallet',
        title: 'Balance',
        amount: 30000,
        hasBtn: false
    },
    {
        icon: 'savings',
        title: 'Savings',
        amount: 30000,
        hasBtn: true
    },
    {
        icon: 'south',
        title: 'Inflow',
        amount: 30000,
        hasBtn: true
    },
    {
        icon: 'north',
        title: 'Outflow',
        amount: 30000,
        hasBtn: true
    }
]


export default quickActions