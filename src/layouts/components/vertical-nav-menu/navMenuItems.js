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
    url: "/admin/infrastructure",
    name: "Cơ sở vật chất",
    slug: "infrastructure",
    icon: "HomeIcon"
  },
  {
    url: "/admin/menu",
    name: "Quản lý thực đơn",
    slug: "menu",
    icon: "MenuIcon"
  },
  {
    url: "/admin/schedule",
    name: "Quản lý lịch học",
    slug: "schedule",
    icon: "CalendarIcon"
  },
  {
    url: "/admin/checkin",
    name: "Quản lý điểm danh",
    slug: "checkin",
    icon: "CalendarIcon"
  },
  {
    url: "/admin/post",
    name: "Quản lý bài viết",
    slug: "post",
    icon: "ListIcon"
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
    icon: "BellIcon",
    submenu: [
      {
        url: "/admin/notification",
        name: "Lịch sử thông báo",
        slug: "notification",
      },
      {
        url: "/admin/notification-content",
        name: "Nội dung thông báo",
        slug: "notification-content",
      },
      // {
      //   url: "/admin/notificationType",
      //   name: "Loại thông báo",
      //   slug: "notificationType",
      // }
    ]
  },
]
