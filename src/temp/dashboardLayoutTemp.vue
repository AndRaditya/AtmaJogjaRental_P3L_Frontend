<template>
	<div class="index">
		<nav
			class="navbar navbar-expand-lg navbar-light bg-light shadow p-4 mb-5 bg-white navbaredit"
			id="navbarTop"
		>
			<div class="container" id="container-navbarAtas">
				<div class="row" id="row-kiriAtas">
					<div
						class="col-sm-4"
						style="margin-right: -20px"
						id="logo-kiriAtas"
					>
						<a @click="kembaliDashboard">
							<img
								src="../Images/AJR_logo.png"
								style="width: 80px; height: 80px"
								align="left"
							/>
							<h2>Atma Jogja Rental</h2>
						</a>
					</div>
					<!-- <div class="vl" style="padding-left: -150px"></div> -->
					<div
						class="col-sm-6"
						v-if="
							loginCustomer &&
							!loginManager &&
							!loginCS &&
							!loginAdmin
						"
						id="tulisanSelamatDatang"
					>
						<h3>Selamat Datang, Customer!</h3>
					</div>
					<div
						class="col-sm-6"
						v-if="
							!loginCustomer &&
							loginManager &&
							!loginCS &&
							!loginAdmin
						"
						id="tulisanSelamatDatang"
					>
						<h3>Selamat Datang, Manager!</h3>
					</div>
					<div
						class="col-sm-6"
						v-if="
							!loginCustomer &&
							!loginManager &&
							!loginCS &&
							loginAdmin
						"
						id="tulisanSelamatDatang"
					>
						<h3>Selamat Datang, Admin!</h3>
					</div>
					<div
						class="col-sm-6"
						v-if="
							!loginCustomer &&
							!loginManager &&
							loginCS &&
							!loginAdmin
						"
						id="tulisanSelamatDatang"
					>
						<h3>Selamat Datang, Customer Service!</h3>
					</div>
				</div>
			</div>

			<div
				v-if="loginCustomer && !loginManager && !loginCS && !loginAdmin"
				id="navbarNav"
			>
				<ul class="navbar-nav" id="navbarUl">
					<!-- button customer -->
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
						<a class="nav-link" @click="transaksiCustomer"
							>Transaksi</a
						>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="DetailTransaksiCustomer"
							>Detail Transaksi</a
						>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="customer">Profile</a>
					</li>

					<li class="nav-item" style="margin-left: 24px">
						<a
							class="nav-link"
							@click="logout"
							style="color: red; font-weight: bold"
							>Keluar</a
						>
					</li>
				</ul>
			</div>

			<div
				class="collapse navbar-collapse"
				id="navbarNav"
				v-if="!loginCustomer && loginManager && !loginCS && !loginAdmin"
			>
				<ul class="navbar-nav" style="margin: 0 0 0 auto">
					<!-- button manager -->
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="promoPegawai">Promo</a>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="jadwalPegawai"
							>Jadwal Pegawai</a
						>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="detailJadwalPegawai"
							>Detail Jadwal</a
						>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="profilePegawai">Profile</a>
					</li>
					<li class="nav-item" style="margin-left: 24px">
						<a
							class="nav-link"
							@click="logout"
							style="color: red; font-weight: bold"
							>Keluar</a
						>
					</li>
				</ul>
			</div>

			<div
				class="collapse navbar-collapse"
				id="navbarNav"
				v-if="!loginCustomer && !loginManager && loginCS && !loginAdmin"
			>
				<ul class="navbar-nav" style="margin: 0 0 0 auto">
					<!-- button CS -->
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="customerPegawai"
							>Customer</a
						>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="transaksiPegawai"
							>Transaksi</a
						>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="detailTransaksiPegawai"
							>Detail Transaksi</a
						>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="profilePegawai">Profile</a>
					</li>
					<li class="nav-item" style="margin-left: 24px">
						<a
							class="nav-link"
							@click="logout"
							style="color: red; font-weight: bold"
							>Keluar</a
						>
					</li>
				</ul>
			</div>

			<div
				class="collapse navbar-collapse"
				id="navbarNav"
				v-if="!loginCustomer && !loginManager && !loginCS && loginAdmin"
			>
				<ul class="navbar-nav" style="margin: 0 0 0 auto">
					<!-- button Admin -->
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="pemilikMobilPegawai"
							>Pemilik Mobil</a
						>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="asetMobilPegawai"
							>Aset Mobil</a
						>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="pegawai">Pegawai</a>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="jabatanPegawai"
							>Jabatan Pegawai</a
						>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="driverPegawai">Driver</a>
					</li>
					<li class="nav-item" style="margin-left: 16px">
						<a class="nav-link" @click="profilePegawai">Profile</a>
					</li>
					<li class="nav-item" style="margin-left: 24px">
						<a
							class="nav-link"
							@click="logout"
							style="color: red; font-weight: bold"
							>Keluar</a
						>
					</li>
				</ul>
				<div class="menu-toggle">
					<input type="checkbox" />
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</nav>

		<div class="fullheight pa-5" style="padding: 0px">
			<router-view></router-view>
		</div>
	</div>
</template>

<style scoped>
@import "../css/navbarIndex.css";

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
			items: [
				{
					title: "Dashboard",
					to: "/dashboard",
				},
				{
					title: "Profile Pegawai",
					to: "/profile-pegawai",
				},

				//manager
				{
					title: "Promo Pegawai",
					to: "/promo-pegawai",
				},
				{
					title: "Detail Jadwal Pegawai",
					to: "/detail-jadwal-pegawai",
				},
				{
					title: "Jadwal Pegawai",
					to: "/jadwal-pegawai",
				},

				//customer service
				{
					title: "CustomerPegawai",
					to: "/customer-pegawai",
				},
				{
					title: "transaksiPegawai",
					to: "/transaksi-pegawai",
				},
				{
					title: "DetailTransaksiPegawai",
					to: "/detail-transaksi-pegawai",
				},

				//admin
				{
					title: "PemilikMobilPegawai",
					to: "/pemilik-mobil-pegawai",
				},
				{
					title: "AsetMobilPegawai",
					to: "/aset-mobil-pegawai",
				},
				{
					title: "Pegawai",
					to: "/pegawai",
				},
				{
					title: "JabatanPegawai",
					to: "/jabatan-pegawai",
				},
				{
					title: "DriverPegawai",
					to: "/driver-pegawai",
				},

				//customer
				{
					title: "Promo Customer",
					to: "/promo",
				},
				{
					title: "Customer",
					to: "/customer",
				},
				{
					title: "Driver",
					to: "/driver",
				},
				{
					title: "Mobil",
					to: "/aset-mobil",
				},
				{
					title: "Transaksi",
					to: "/transaksi",
				},
				{
					title: "Detail Transaksi",
					to: "/detail-transaksi",
				},
			],
		};
	},
	methods: {
		//router customer
		promoCustomer() {
			this.$router.push({
				name: "PromoCustomer",
			});
		},
		customer() {
			this.$router.push({
				name: "ProfileCustomer",
			});
		},
		asetMobilCustomer() {
			this.$router.push({
				name: "AsetMobilCustomer",
			});
		},
		driverCustomer() {
			this.$router.push({
				name: "DriverCustomer",
			});
		},
		transaksiCustomer() {
			this.$router.push({
				name: "transaksiCustomer",
			});
		},
		DetailTransaksiCustomer() {
			this.$router.push({
				name: "DetailTransaksiCustomer",
			});
		},

		//pegawai
		profilePegawai() {
			this.$router.push({
				name: "ProfilePegawai",
			});
		},

		//router push Manager
		promoPegawai() {
			this.$router.push({
				name: "PromoPegawai",
			});
		},
		jadwalPegawai() {
			this.$router.push({
				name: "JadwalPegawai",
			});
		},
		detailJadwalPegawai() {
			this.$router.push({
				name: "DetailJadwalPegawai",
			});
		},

		//router push CS
		customerPegawai() {
			this.$router.push({
				name: "CustomerPegawai",
			});
		},
		transaksiPegawai() {
			this.$router.push({
				name: "transaksiPegawai",
			});
		},
		detailTransaksiPegawai() {
			this.$router.push({
				name: "DetailTransaksiPegawai",
			});
		},

		//router admin
		jabatanPegawai() {
			this.$router.push({
				name: "JabatanPegawai",
			});
		},
		driverPegawai() {
			this.$router.push({
				name: "DriverPegawai",
			});
		},
		asetMobilPegawai() {
			this.$router.push({
				name: "AsetMobilPegawai",
			});
		},
		pegawai() {
			this.$router.push({
				name: "Pegawai",
			});
		},
		pemilikMobilPegawai() {
			this.$router.push({
				name: "PemilikMobilPegawai",
			});
		},

		kembaliDashboard() {
			this.$router.push({
				name: "Dashboard",
			});
		},
		logout() {
			if (localStorage.getItem("id_customer_increment") != null) {
				localStorage.removeItem("nama_customer");
				localStorage.removeItem("email_customer");
				localStorage.removeItem("email_login");
				localStorage.removeItem("nomor_telepon_customer");
				localStorage.removeItem("alamat_customer");
				localStorage.removeItem("tanggal_lahir_customer");
				localStorage.removeItem("jenis_kelamin_customer");
				localStorage.removeItem("no_sim_customer");
				localStorage.removeItem("no_ktp_customer");
				localStorage.removeItem("password_customer");
				localStorage.removeItem("id_customer_increment");
				this.$router.push({
					name: "Index",
				});
			} else if (localStorage.getItem("id_pegawai") != null) {
				localStorage.removeItem("id_pegawai");
				localStorage.removeItem("id_jabatan");
				localStorage.removeItem("nama_pegawai");
				localStorage.removeItem("email_login");
				localStorage.removeItem("email_pegawai");
				localStorage.removeItem("nomor_telepon_pegawai");
				localStorage.removeItem("alamat_pegawai");
				localStorage.removeItem("tanggal_lahir_pegawai");
				localStorage.removeItem("jenis_kelamin_pegawai");
				localStorage.removeItem("foto_pegawai");
				localStorage.removeItem("password_pegawai");
				this.$router.push({
					name: "Index",
				});
			}
		},
	},
	computed: {
		loginCustomer() {
			return (
				localStorage.getItem("email_login") != null &&
				localStorage.getItem("id_customer_increment") != null
			);
		},

		loginManager() {
			return (
				localStorage.getItem("email_login") != null &&
				localStorage.getItem("id_jabatan") == "1"
			);
		},

		loginCS() {
			return (
				localStorage.getItem("email_login") != null &&
				localStorage.getItem("id_jabatan") == "2"
			);
		},

		loginAdmin() {
			return (
				localStorage.getItem("email_login") != null &&
				localStorage.getItem("id_jabatan") == "3"
			);
		},
	},
};
</script>
