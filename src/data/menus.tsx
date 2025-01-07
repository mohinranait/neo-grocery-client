const menus = [
  {
    label: "Dashbaord",
    link: "/admin/dashboard",
  },
  {
    label: "Products",
    children: [
      {
        label: "All Products",
        link: "/admin/all-products",
      },
      {
        label: "New Product",
        link: "/admin/new-product",
      },
    ],
  },
  {
    label: "Users",
    children: [
      {
        label: "All User",
        link: "/admin/all-users",
      },
      {
        label: "New User",
        link: "/admin/new-users",
      },
      {
        label: "New User",
        link: "/admin/new-user",
      },
    ],
  },
];

export default menus;
