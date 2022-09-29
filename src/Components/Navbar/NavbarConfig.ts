interface navItem {
  itemName: string;
  itemIcon: string;
}

const navbarItems: Array<navItem> = [
  {
    itemName: "Overview",
    itemIcon: 'dashboard'
  },
  {
    itemName: "Inflow",
    itemIcon: "south"
  },
  {
    itemName: "Outflow",
    itemIcon: 'north'
  },
  {
    itemName: "Budget",
    itemIcon: "pie_chart"
  },
  {
    itemName: "Savings",
    itemIcon: "savings"
  },
];

export default navbarItems;
