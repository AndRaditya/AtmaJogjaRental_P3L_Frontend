<template>
    <div class="index">
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow p-4 mb-5 bg-white navbaredit" id="navbarTop">
            <div class="container-fluid">
                <div class="col-sm-2">
                    <a @click="kembaliDashboard" style="text-decoration: none; display: flex; justify-content: start">
                        <img src="../Images/AJR_logo.png" style="width: 80px; height:80px;" align="left">
                        <h2
                            style="color: black; margin-top: 12px; margin-left: 10px; display: flex; width: 1000px; font-size: 24px; font-weight: bold">
                            Atma Jogja Rental</h2>
                    </a>
                </div>
                <div class="vl"></div>
                <div class="col-sm-2" v-if="loginCustomer && !loginManager && !loginCS && !loginAdmin">
                    <h2
                        style="color: black; margin-top: 12px; margin-left: 10px; display: flex; width: 1000px; font-size: 24px">
                        Selamat Datang, Customer!</h2>
                </div>
                <div class="col-sm-2" v-if="!loginCustomer && !loginManager && loginCS && !loginAdmin">
                    <h2
                        style="color: black; margin-top: 12px; margin-left: 10px; display: flex; width: 1000px; font-size: 24px">
                        Selamat Datang, Manager!</h2>
                </div>
                <div class="col-sm-2" v-if="!loginCustomer && !loginManager && !loginCS && loginAdmin">
                    <h2
                        style="color: black; margin-top: 12px; margin-left: 10px; display: flex; width: 1000px; font-size: 24px">
                        Selamat Datang, Admin!</h2>
                </div>
                <div class="col-sm-2" v-if="!loginCustomer && !loginManager && loginCS && !loginAdmin">
                    <h2
                        style="color: black; margin-top: 12px; margin-left: 10px; display: flex; width: 1000px; font-size: 24px">
                        Selamat Datang, Customer Service!</h2>
                </div>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav" style="margin: 0 0 0 auto;">
                        <!-- button customer -->
                        <div v-if="loginCustomer && !loginManager && !loginCS && !loginAdmin">
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="promoCustomer">Promo</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="driverCustomer">Driver</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="asetMobilCustomer">Mobil</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="transaksiCustomer">Transaksi</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="DetailTransaksiCustomer">Detail Transaksi</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="customer">Profile</a>
                            </li>
                        </div>

                        <!-- button manager -->
                        <div v-if="!loginCustomer && loginManager && !loginCS && !loginAdmin">
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="promoPegawai">Promo</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="jadwalPegawai">Jadwal Pegawai</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="detailJadwalPegawai">Detail Jadwal</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="profilePegawai">Profile</a>
                            </li>
                        </div>

                        <!-- button CS -->
                        <div v-if="!loginCustomer && !loginManager && loginCS && !loginAdmin">
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="customerPegawai">Customer</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="transaksiPegawai">Transaksi</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="detailTransaksiPegawai">Detail Transaksi</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="profilePegawai">Profile</a>
                            </li>
                        </div>

                        <!-- button Admin -->
                        <div v-if="!loginCustomer && !loginManager && !loginCS && loginAdmin">
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="pemilikMobilPegawai">Pemilik Mobil</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="asetMobilPegawai">Aset Mobil</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="pegawai">Pegawai</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="jabatanPegawai">Jabatan Pegawai</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="driverPegawai">Driver</a>
                            </li>
                            <li class="nav-item" style="margin-left: 16px">
                                <a class="nav-link" @click="profilePegawai">Profile</a>
                            </li>
                        </div>

                        <li class="nav-item" style="margin-left: 24px">
                            <a class="nav-link" @click="logout" style="color: red; font-weight: bold">Keluar</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="fullheight pa-5" style="padding: 0px">
            <router-view></router-view>
        </div>

    </div>
</template>

<style scoped>
    @import '../css/navbarIndex.css';

    .vl {
        border-left: 2px solid black;
        height: 80px;
    }
</style>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                items: [{
                        title: "Dashboard",
                        to: "/dashboard"
                    },
                    {
                        title: "Profile Pegawai",
                        to: "/profile-pegawai"
                    },

                    //manager
                    {
                        title: "Promo Pegawai",
                        to: "/promo-pegawai"
                    },
                    {
                        title: "Detail Jadwal Pegawai",
                        to: "/detail-jadwal-pegawai"
                    },
                    {
                        title: "Jadwal Pegawai",
                        to: "/jadwal-pegawai"
                    },


                    //customer service
                    {
                        title: "CustomerPegawai",
                        to: "/customer-pegawai"
                    },
                    {
                        title: "transaksiPegawai",
                        to: "/transaksi-pegawai"
                    },
                    {
                        title: "DetailTransaksiPegawai",
                        to: "/detail-transaksi-pegawai"
                    },

                    //admin
                    {
                        title: "PemilikMobilPegawai",
                        to: "/pemilik-mobil-pegawai"
                    },
                    {
                        title: "AsetMobilPegawai",
                        to: "/aset-mobil-pegawai"
                    },
                    {
                        title: "Pegawai",
                        to: "/pegawai"
                    },
                    {
                        title: "JabatanPegawai",
                        to: "/jabatan-pegawai"
                    },
                    {
                        title: "DriverPegawai",
                        to: "/driver-pegawai"
                    },

                    //customer
                    {
                        title: "PromoCustomer",
                        to: "/promo"
                    },
                    {
                        title: "Customer",
                        to: "/customer"
                    },
                    {
                        title: "Driver",
                        to: "/driver"
                    },
                    {
                        title: "Mobil",
                        to: "/aset-mobil"
                    },
                    {
                        title: "Transaksi",
                        to: "/transaksi"
                    },
                    {
                        title: "DetailTransaksi",
                        to: "/detail-transaksi"
                    },
                ],
            };
        },
        methods: {
            loginCustomer() {
                return localStorage.getItem("email_login") != null && localStorage.getItem('id_customer_increment') !=null;
            },

            loginManager() {
                return localStorage.getItem("email_login") != null && localStorage.getItem('id_jabatan') == '1';
            },

            loginCS() {
                return localStorage.getItem("email_login") != null && localStorage.getItem('id_jabatan') == '2';
            },

            loginAdmin() {
                return localStorage.getItem("email_login") != null && localStorage.getItem('id_jabatan') == '3';
            },

            //router customer
            promo() {
                this.$router.push({
                    name: 'PromoCustomer',
                });
            },
            customer() {
                this.$router.push({
                    name: 'Customer',
                });

            },
            asetMobil() {
                this.$router.push({
                    name: 'AsetMobilCustomer',
                });
            },

            driver() {
                this.$router.push({
                    name: 'DriverCustomer',
                });

            },
            transaksi() {
                this.$router.push({
                    name: 'transaksiCustomer',
                });

            },
            DetailTransaksi() {
                this.$router.push({
                    name: 'DetailTransaksiCustomer',
                });

            },

            //pegawai
            profilePegawai() {
                this.$router.push({
                    name: 'ProfilePegawai',
                });

            },

            //router push Manager
            promoPegawai() {
                this.$router.push({
                    name: 'PromoPegawai',
                });

            },
            jadwalPegawai() {
                this.$router.push({
                    name: 'JadwalPegawai',
                });

            },
            detailJadwalPegawai() {
                this.$router.push({
                    name: 'DetailJadwalPegawai',
                });

            },

            //router push CS
            customerPegawai() {
                this.$router.push({
                    name: 'CustomerPegawai',
                });

            },
            transaksiPegawai() {
                this.$router.push({
                    name: 'transaksiPegawai',
                });

            },
            detailTransaksiPegawai() {
                this.$router.push({
                    name: 'DetailTransaksiPegawai',
                });

            },

            //router admin
            jabatanPegawai() {
                this.$router.push({
                    name: 'JabatanPegawai',
                });

            },
            driverPegawai() {
                this.$router.push({
                    name: 'DriverPegawai',
                });

            },
            asetMobilPegawai() {
                this.$router.push({
                    name: 'AsetMobilPegawai',
                });

            },
            pegawai() {
                this.$router.push({
                    name: 'Pegawai',
                });

            },
            pemiilikPegawai() {
                this.$router.push({
                    name: 'PemilikMobilPegawai',
                });

            },

            kembaliDashboard() {
                this.$router.push({
                    name: 'DashboardPegawai',
                });
            },
            logout() {
                if (localStorage.getItem('id_customer_increment') != null) {
                    localStorage.removeItem('nama_customer');
                    localStorage.removeItem('email_customer');
                    localStorage.removeItem('email_login');
                    localStorage.removeItem('nomor_telepon_customer');
                    localStorage.removeItem('alamat_customer');
                    localStorage.removeItem('tanggal_lahir_customer');
                    localStorage.removeItem('jenis_kelamin_customer');
                    localStorage.removeItem('no_sim_customer');
                    localStorage.removeItem('no_ktp_customer');
                    localStorage.removeItem('password_customer');
                    localStorage.removeItem('id_customer_increment');
                    this.$router.push({
                        name: 'Index',
                    });
                } else if (localStorage.getItem('id_pegawai') != null) {
                    localStorage.removeItem('id_pegawai');
                    localStorage.removeItem('id_jabatan');
                    localStorage.removeItem('nama_pegawai');
                    localStorage.removeItem('email_login');
                    localStorage.removeItem('email_pegawai');
                    localStorage.removeItem('nomor_telepon_pegawai');
                    localStorage.removeItem('alamat_pegawai');
                    localStorage.removeItem('tanggal_lahir_pegawai');
                    localStorage.removeItem('jenis_kelamin_pegawai');
                    localStorage.removeItem('foto_pegawai');
                    localStorage.removeItem('password_pegawai');
                    this.$router.push({
                        name: 'Index',
                    });
                }
            },

        }
    };
</script>