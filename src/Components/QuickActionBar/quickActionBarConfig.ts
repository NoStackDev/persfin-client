export interface quickActionInterface {
  icon: string;
  title: string;
  hasBtn: boolean;
  hasFixedDateFilter?: boolean;
}

const quickActions: quickActionInterface[] = [
  {
    icon: "account_balance_wallet",
    title: "Balance",
    hasBtn: false,
    hasFixedDateFilter: false,
  },
  {
    icon: "savings",
    title: "Savings",
    hasBtn: true,
    hasFixedDateFilter: false,
  },
  {
    icon: "south",
    title: "Inflow",
    hasBtn: true,
    hasFixedDateFilter: true,
  },
  {
    icon: "north",
    title: "Outflow",
    hasBtn: true,
    hasFixedDateFilter: true,
  },
  {
    icon: "north",
    title: "Categories",
    hasBtn: true,
  },
];

export default quickActions;
