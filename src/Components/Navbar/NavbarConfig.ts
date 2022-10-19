interface navItem {
  itemName: string;
  itemIcon: string;
  link: string;
}

const navbarItems: Array<navItem> = [
  {
    itemName: "Overview",
    itemIcon: 'dashboard',
    link: '/'
  },
  {
    itemName: "Inflow",
    itemIcon: "south",
    link: 'inflow'
  },
  {
    itemName: "Outflow",
    itemIcon: 'north',
    link: 'outflow'
  },
  {
    itemName: "Budget",
    itemIcon: "pie_chart",
    link: 'budget'
  },
  {
    itemName: "Savings",
    itemIcon: "savings",
    link: 'savings'
  },
];

export default navbarItems;
