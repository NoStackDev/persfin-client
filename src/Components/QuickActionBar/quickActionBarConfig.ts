export interface quickActionInterface {
  icon: string;
  title: string;
  showCurrency: boolean;
  hasBtn: boolean;
  btnText: string | null;
  hasFixedDateFilter: boolean;
}

const quickActions: quickActionInterface[] = [
  {
    icon: "account_balance_wallet",
    title: "Balance",
    showCurrency: true,
    hasBtn: false,
    btnText: null,
    hasFixedDateFilter: false,
  },
  {
    icon: "savings",
    title: "Savings",
    showCurrency: true,
    hasBtn: true,
    btnText: "Add Savings",
    hasFixedDateFilter: false,
  },
  {
    icon: "south",
    title: "Inflow",
    showCurrency: true,
    hasBtn: true,
    btnText: "Add Inflow",
    hasFixedDateFilter: true,
  },
  {
    icon: "north",
    title: "Outflow",
    showCurrency: true,
    hasBtn: true,
    btnText: "Add Outflow",
    hasFixedDateFilter: true,
  },
  {
    icon: "category",
    title: "Inflow Categories",
    showCurrency: false,
    hasBtn: true,
    btnText: "Add Category",
    hasFixedDateFilter: false
  },
  {
    icon: "category",
    title: "Outflow Categories",
    showCurrency: false,
    hasBtn: true,
    btnText: "Add Category",
    hasFixedDateFilter: false
  },
];

export default quickActions;
