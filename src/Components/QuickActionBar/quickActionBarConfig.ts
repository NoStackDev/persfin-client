export interface quickActionInterface {
  id: number;
  icon: string;
  title: string;
  showCurrency: boolean;
  hasBtn: boolean;
  btnText: string | null;
  hasFixedDateFilter: boolean;
}

const quickActions: quickActionInterface[] = [
  {
    id: 0,
    icon: "account_balance_wallet",
    title: "Balance",
    showCurrency: true,
    hasBtn: false,
    btnText: null,
    hasFixedDateFilter: false,
  },
  {
    id: 1,
    icon: "savings",
    title: "Savings",
    showCurrency: true,
    hasBtn: true,
    btnText: "Add Savings",
    hasFixedDateFilter: false,
  },
  {
    id: 2,
    icon: "south",
    title: "Inflow",
    showCurrency: true,
    hasBtn: true,
    btnText: "Add Inflow",
    hasFixedDateFilter: true,
  },
  {
    id: 3,
    icon: "north",
    title: "Outflow",
    showCurrency: true,
    hasBtn: true,
    btnText: "Add Outflow",
    hasFixedDateFilter: true,
  },
  {
    id: 4,
    icon: "pie_chart",
    title: "Budgets",
    showCurrency: false,
    hasBtn: true,
    btnText: "Create Budget",
    hasFixedDateFilter: false,
  },
  // {
  //   id: 5,
  //   icon: "category",
  //   title: "Inflow Categories",
  //   showCurrency: false,
  //   hasBtn: true,
  //   btnText: "Add Category",
  //   hasFixedDateFilter: false,
  // },
  // {
  //   id: 6,
  //   icon: "category",
  //   title: "Outflow Categories",
  //   showCurrency: false,
  //   hasBtn: true,
  //   btnText: "Add Category",
  //   hasFixedDateFilter: false,
  // },
];

export default quickActions;
