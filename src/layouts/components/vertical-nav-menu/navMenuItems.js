/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: "/admin",
    name: "Trang chủ",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    url: "/admin/school",
    name: "Quản lý trường học",
    slug: "school",
    icon: "HomeIcon",
  },

  {
    url: "/admin/class",
    name: "Quản lý lớp học",
    slug: "class",
    icon: "HomeIcon"
  },
  {
    url: "/admin/menu",
    name: "Quản lý thực đơn",
    slug: "class",
    icon: "MenuIcon"
  },
  {
    url: "/admin/schedule",
    name: "Quản lý lịch học",
    slug: "class",
    icon: "CalendarIcon"
  },
  {
    url: "/admin/user",
    name: "Quản lý tài khoản",
    slug: "user",
    icon: "UserIcon",
  },
  {
    url: "/admin/rate",
    name: "Quản lý đánh giá",
    slug: "rate",
    icon: "HomeIcon",
  },
  {
    url: null,
    name: "Quản lý thanh toán",
    icon: 'DollarSignIcon',
    i18n: 'Dashboard',
    submenu: [
      {
        url: "/admin/subpackage",
        name: "Gói cước",
        slug: "subpackage",
      },
      {
        url: "/admin/promotion",
        name: "Khuyến mãi",
        slug: "promotion",
      },
      {
        url: "/admin/chargelog",
        name: "Lịch sử thanh toán",
        slug: "chargelog",
      },
    ]
  },

  {
    url: null,
    name: "Quản lý thông báo",
    slug: "notification",
    icon: "BellIcon",
    submenu: [
      {
        url: "/admin/notification",
        name: "Lịch sử thông báo",
        slug: "subpackage",
      }
    ]
  },
]
