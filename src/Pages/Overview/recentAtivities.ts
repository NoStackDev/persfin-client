interface recentActivity {
    title: string;
    _type: string;
    _date: string;
    _time: string;
    amount: number;
}

const recentActivities: recentActivity[] = [
    {
        title: 'Clothes',
        _type: 'Budget',
        _date: '20/06/2022',
        _time: '15:03:31',
        amount: 30000
    },
    {
        title: 'Saving for PS5',
        _type: 'Savings',
        _date: '20/06/2022',
        _time: '15:03:31',
        amount: 30000
    },
    {
        title: 'Bought food',
        _type: 'Outflow',
        _date: '20/06/2022',
        _time: '15:03:31',
        amount: 30000
    }
]

export default recentActivities