interface savingsInterface {
    title: string;
    _type: string;
    _date: string;
    _time: string;
    amount: number;
}

const savingsActivity: savingsInterface[] = [
    {
        title: 'Bought food',
        _type: "Inflow",
        _date: '2/20/2022',
        _time: '12:30',
        amount: 700
    },
    {
        title: 'Bought food',
        _type: "Outflow",
        _date: '2/20/2022',
        _time: '12:30',
        amount: 700
    },
    {
        title: 'Bought food',
        _type: "Inflow",
        _date: '2/20/2022',
        _time: '12:30',
        amount: 700
    },
    {
        title: 'Bought food',
        _type: "Inflow",
        _date: '2/20/2022',
        _time: '12:30',
        amount: 700
    },
    {
        title: 'Bought food',
        _type: "Outflow",
        _date: '2/20/2022',
        _time: '12:30',
        amount: 700
    },
]

export default savingsActivity