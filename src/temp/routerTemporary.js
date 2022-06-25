import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
  mode: "history",
  routes: [{
      //pegawai
      path: "/dashboard-pegawai",
      meta: {
        requiresAuth: false,
      },
      component: importComponent("dashboard/dashboardLayout"),
      children: [{
          path: "/dashboard-pegawai",
          name: "DashboardPegawai",
          meta: {
            title: "Dashboard Pegawai",
          },
          component: importComponent("dashboard/dashboardPage"),
        },
        {
          path: "/driver-pegawai",
          name: "DriverPegawai",
          meta: {
            title: "Driver",
          },
          component: importComponent("driver/driverPage"),
        },
        {
          path: "/pemilik-mobil-pegawai",
          name: "PemilikMobilPegawai",
          meta: {
            title: "Pemilik Mobil",
          },
          component: importComponent("pemilikMobil/pemilikMobilPage"),
        },
        {
          path: "/promo-pegawai",
          name: "PromoPegawai",
          meta: {
            title: "Promo",
          },
          component: importComponent("promo/promoPage"),
        },
        {
          path: "/jabatan-pegawai",
          name: "JabatanPegawai",
          meta: {
            title: "Jabatan",
          },
          component: importComponent("jabatan/jabatanPage"),
        },
        {
          path: "/jadwal-pegawai",
          name: "JadwalPegawai",
          meta: {
            title: "Jadwal",
          },
          component: importComponent("jadwal/jadwalPegawaiPage"),
        },
        {
          path: "/customer-pegawai",
          name: "CustomerPegawai",
          meta: {
            title: "Customer",
          },
          component: importComponent("customer/customerPage"),
        },
        {
          path: "/aset-mobil-pegawai",
          name: "AsetMobilPegawai",
          meta: {
            title: "Aset Mobil",
          },
          component: importComponent("asetMobil/asetMobilPage"),
        },
        {
          path: "/detail-jadwal",
          name: "DetailJadwalPegawai",
          meta: {
            title: "Detail Jadwal",
          },
          component: importComponent("detailJadwal/detailJadwal"),
        },
        {
          path: "/pegawai",
          name: "Pegawai",
          meta: {
            title: "Pegawai",
          },
          component: importComponent("pegawai/pegawaiPage"),
        },
        {
          path: "/transaksi-pegawai",
          name: "transaksiPegawai",
          meta: {
            title: "Transaksi",
          },
          component: importComponent("transaksi/transaksiPage"),
        },
        {
          path: "/detail-transaksi-pegawai",
          name: "DetailTransaksiPegawai",
          meta: {
            title: "Detail Transaksi",
          },
          component: importComponent("detailTransaksi/detailTransaksiPage"),
        },
      ],
    },

    {
      //customer
      path: "/dashboard",
      meta: {
        requiresAuth: false,
      },
      component: importComponent("dashboardCustomer/dashboardLayoutCustomer"),
      children: [{
          path: "/dashboard",
          name: "DashboardCustomer",
          meta: {
            title: "Dashboard",
          },
          component: importComponent("dashboard/dashboardPage"),
        },
        {
          path: "/promo",
          name: "PromoCustomer",
          meta: {
            title: "Promo",
          },
          component: importComponent("promo/promoPageCustomer"),
        },
        {
          path: "/customer",
          name: "Customer",
          meta: {
            title: "Customer",
          },
          component: importComponent("customer/customerPageCustomer"),
        },
        {
          path: "/aset-mobil",
          name: "AsetMobilCustomer",
          meta: {
            title: "Mobil",
          },
          component: importComponent("asetMobil/asetMobilPageCustomer"),
        },
        {
          path: "/driver",
          name: "DriverCustomer",
          meta: {
            title: "Driver",
          },
          component: importComponent("driver/driverPageCustomer"),
        },
        {
          path: "/transaksi",
          name: "transaksiCustomer",
          meta: {
            title: "Transaksi",
          },
          component: importComponent("transaksi/transaksiPageCustomer"),
        },
      ],
    },

    {
      path: "/index",
      meta: {
        requiresAuth: false,
      },
      component: importComponent("indexLayout"),
      children: [{
          path: "/index",
          name: "Index",
          meta: {
            title: "Index",
          },
          component: importComponent("indexDashboard"),
        },
        {
          path: "/login",
          name: "Login",
          meta: {
            title: "Login",
          },
          component: importComponent("loginRegister/loginPage"),
        },
        {
          path: "/register",
          name: "Register",
          meta: {
            title: "Register",
          },
          component: importComponent("loginRegister/registerCustomer"),
        },
      ],
    },

    {
      path: "*",
      meta: {
        requiresAuth: false,
      },
      redirect: "/index",
    },
    // {
    //     path: "*",
    //     meta: {
    //         requiresAuth: true
    //     },
    //     redirect: "/dashboard",
    // },
  ],
});

//set judul
// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title;
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // this route requires auth, check if logged in
//         // if not, redirect to login page.
//         if (localStorage.getItem('email_login') == null) {
//             next({
//                 redirect: '/login'
//             })
//         } else {
//             next() // go to wherever I'm going
//         }
//     } else {
//         next() // does not require auth, make sure to always call next()!
//     }
// });

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;