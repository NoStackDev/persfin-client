interface navItem {
  id: number;
  itemName: string;
  itemIcon: string;
  link: string;
}

const navbarItems: Array<navItem> = [
  {
    id: 0,
    itemName: "Overview",
    itemIcon: "dashboard",
    link: "/",
  },
  {
    id: 1,
    itemName: "Inflow",
    itemIcon: "south",
    link: "inflow",
  },
  {
    id: 2,
    itemName: "Outflow",
    itemIcon: "north",
    link: "outflow",
  },
  {
    id: 3,
    itemName: "Budget",
    itemIcon: "pie_chart",
    link: "budget",
  },
  {
    id: 4,
    itemName: "Savings",
    itemIcon: "savings",
    link: "savings",
  },
];

export default navbarItems;
