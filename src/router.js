import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/index",
      meta: {
        title: "Index",
      },
      component: importComponent("indexLayout"),
      children: [
        {
          path: "/index",
          name: "Index",
          meta: {
            title: "Index",
          },
          component: importComponent("indexDashboard"),
        },
      ],
    },

    {
      path: "/index-login-signup",
      meta: {
        title: "Index",
      },
      component: importComponent("indexLayoutLoginRegister"),
      children: [
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
      path: "/dashboard",
      component: importComponent("dashboard/dashboardLayout"),
      children: [
        {
          path: "/dashboard",
          name: "Dashboard",
          meta: {
            title: "Dashboard",
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
            title: "Jadwal Pegawai",
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
          path: "/aset-mobil-kontrak",
          name: "AsetMobilKontrakHabis",
          meta: {
            title: "Aset Mobil",
          },
          component: importComponent("asetMobil/asetMobilKontrakHabis"),
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
        {
          path: "/profile-pegawai",
          name: "ProfilePegawai",
          meta: {
            title: "Profile Pegawai",
          },
          component: importComponent("profile/profilePegawaiPage"),
        },

        //router customer
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
          name: "ProfileCustomer",
          meta: {
            title: "Customer",
          },
          component: importComponent("profile/profileCustomerPage"),
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
          path: "/transaksi",
          name: "transaksiCustomer",
          meta: {
            title: "Transaksi",
          },
          component: importComponent("transaksi/transaksiPageCustomer"),
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
          path: "/detail-transaksi",
          name: "DetailTransaksiCustomer",
          meta: {
            title: "Detail Transaksi",
          },
          component: importComponent("detailTransaksi/detailTransaksiCustomer"),
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
  ],
});

router.beforeEach((to, from, next) => {
  //Jika sudah login maka tidak dapat kembali ke halaman login dan register
  if (
    (to.name == "Login" && localStorage.getItem("email_login") != null) ||
    (to.name == "Register" && localStorage.getItem("email_login") != null)
  ) {
    next({
      name: "Dashboard",
    });
    document.to.meta.title = "Dashboard";
  }

  //jika belum login
  if (
    (to.name == "Dashboard" && localStorage.getItem("email_login") == null) ||
    (to.name == "DriverPegawai" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "PemilikMobilPegawai" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "PromoPegawai" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "JabatanPegawai" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "JadwalPegawai" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "CustomerPegawai" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "AsetMobilPegawai" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "DetailJadwalPegawai" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "Pegawai" && localStorage.getItem("email_login") == null) ||
    (to.name == "transaksiPegawai" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "DetailTransaksiPegawai" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "PromoCustomer" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "ProfileCustomer" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "ProfilePegawai" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "AsetMobilCustomer" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "Driver" && localStorage.getItem("email_login") == null) ||
    (to.name == "DetailTransaksiCustomer" &&
      localStorage.getItem("email_login") == null) ||
    (to.name == "Transaksi" && localStorage.getItem("email_login") == null)
  ) {
    next({
      name: "Index",
    });
    document.to.meta.title = "Index";
  }

  //role manager hanya dapat mengelola promo, jadwal, detail jadwal
  if (
    (to.name == "Promo" &&
      localStorage.getItem("email_login") != null &&
      localStorage.getItem("id_jabatan") != "1") ||
    (to.name == "JadwalPegawai" &&
      localStorage.getItem("email_login") != null &&
      localStorage.getItem("id_jabatan") != "1") ||
    (to.name == "DetailJadwalPegawai" &&
      localStorage.getItem("email_login") != null &&
      localStorage.getItem("id_jabatan") != "1")
  ) {
    next({
      name: "Index",
    });
    document.to.meta.title = "Index";
  }

  //role customer service hanya dapat mengelola customer, transaksi, detail transaksi
  if (
    (to.name == "CustomerPegawai" &&
      localStorage.getItem("email_login") != null &&
      localStorage.getItem("id_jabatan") != "2") ||
    (to.name == "transaksiPegawai" &&
      localStorage.getItem("email_login") != null &&
      localStorage.getItem("id_jabatan") != "2") ||
    (to.name == "DetailTransaksiPegawai" &&
      localStorage.getItem("email_login") != null &&
      localStorage.getItem("id_jabatan") != "2")
  ) {
    next({
      name: "Index",
    });
    document.to.meta.title = "Index";
  }

  //role admin hanya dapat mengelola pemilik mobil, aset mobil, pegawai, jabatan, driver
  if (
    (to.name == "PemilikMobilPegawai" &&
      localStorage.getItem("email_login") != null &&
      localStorage.getItem("id_jabatan") != "3") ||
    (to.name == "DriverPegawai" &&
      localStorage.getItem("email_login") != null &&
      localStorage.getItem("id_jabatan") != "3") ||
    (to.name == "AsetMobilPegawai" &&
      localStorage.getItem("email_login") != null &&
      localStorage.getItem("id_jabatan") != "3") ||
    (to.name == "Pegawai" &&
      localStorage.getItem("email_login") != null &&
      localStorage.getItem("id_jabatan") != "3") ||
    (to.name == "JabatanPegawai" &&
      localStorage.getItem("email_login") != null &&
      localStorage.getItem("id_jabatan") != "3")
  ) {
    next({
      name: "Index",
    });
    document.to.meta.title = "Index";
  }

  document.title = to.meta.title;
  next();
});

export default router;
