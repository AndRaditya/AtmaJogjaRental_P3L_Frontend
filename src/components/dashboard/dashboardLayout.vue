<template>
	<div class="index">
		<!-- ********************* -->
		<!-- Customer -->
		<!-- ********************* -->

		<header
			class="header"
			v-if="loginCustomer && !loginManager && !loginCS && !loginAdmin"
		>
			<!-- <a @click="kembaliDashboard" class="ajr-logo">
				<img src="../Images/AJR_logo.png" alt="AJR Logo" class="logo" />
			</a> -->
			<a class="header-logo" @click="kembaliDashboard">
				<figure class="ajr-logo-header">
					<img src="../Images/AJR_logo.png" alt="AJR Logo" />
					<h3 class="heading-tertiary">Selamat Datang, Customer!</h3>
				</figure>
			</a>
			<nav class="main-nav">
				<ul class="main-nav-list">
					<li>
						<a
							@click="promoCustomer"
							class="main-nav-link link-text"
							>Promo</a
						>
					</li>
					<li>
						<a
							@click="driverCustomer"
							class="main-nav-link link-text"
							>Driver</a
						>
					</li>
					<li>
						<a
							@click="asetMobilCustomer"
							class="main-nav-link link-text"
							>Mobil</a
						>
					</li>
					<li>
						<a
							@click="transaksiCustomer"
							class="main-nav-link link-text"
							>Transaksi</a
						>
					</li>
					<li>
						<a
							@click="DetailTransaksiCustomer"
							class="main-nav-link link-text"
							>Detail Transaksi</a
						>
					</li>
					<li>
						<a @click="customer" class="main-nav-link link-text"
							>Profile</a
						>
					</li>
					<li>
						<a class="main-nav-link logout" @click="logout"
							>Logout</a
						>
					</li>
				</ul>
			</nav>
		</header>

		<!-- ********************* -->
		<!-- Manager -->
		<!-- ********************* -->

		<header
			class="header"
			v-if="!loginCustomer && loginManager && !loginCS && !loginAdmin"
		>
			<!-- <a @click="kembaliDashboard" class="ajr-logo">
				<img src="../Images/AJR_logo.png" alt="AJR Logo" class="logo" />
				<h3 class="heading-tertiary">Selamat Datang, Manager!</h3>
			</a> -->
			<a class="header-logo" @click="kembaliDashboard">
				<figure class="ajr-logo-header">
					<img src="../Images/AJR_logo.png" alt="AJR Logo" />
					<h3 class="heading-tertiary">Selamat Datang, Manager!</h3>
				</figure>
			</a>
			<nav class="main-nav">
				<ul class="main-nav-list">
					<li>
						<a @click="promoPegawai" class="main-nav-link link-text"
							>Promo</a
						>
					</li>
					<li>
						<a
							@click="jadwalPegawai"
							class="main-nav-link link-text"
							>Jadwal Pegawai</a
						>
					</li>
					<li>
						<a
							@click="detailJadwalPegawai"
							class="main-nav-link link-text"
							>Detail Jadwal</a
						>
					</li>
					<li>
						<a
							@click="profilePegawai"
							class="main-nav-link link-text"
							>Profile</a
						>
					</li>
					<li>
						<a class="main-nav-link logout" @click="logout"
							>Logout</a
						>
					</li>
				</ul>
			</nav>
		</header>

		<!-- ********************* -->
		<!-- Customer Service -->
		<!-- ********************* -->

		<header
			class="header"
			v-if="!loginCustomer && !loginManager && loginCS && !loginAdmin"
		>
			<!-- <a @click="kembaliDashboard" class="ajr-logo">
				<img src="../Images/AJR_logo.png" alt="AJR Logo" class="logo" />
				<h3 class="heading-tertiary">
					Selamat Datang, Customer Service!
				</h3>
			</a> -->
			<a class="header-logo" @click="kembaliDashboard">
				<figure class="ajr-logo-header">
					<img src="../Images/AJR_logo.png" alt="AJR Logo" />
					<h3 class="heading-tertiary">
						Selamat Datang, Customer Service!
					</h3>
				</figure>
			</a>
			<nav class="main-nav">
				<ul class="main-nav-list">
					<li>
						<a
							@click="customerPegawai"
							class="main-nav-link link-text"
							>Customer</a
						>
					</li>
					<li>
						<a
							@click="transaksiPegawai"
							class="main-nav-link link-text"
							>Transaksi</a
						>
					</li>
					<li>
						<a
							@click="detailTransaksiPegawai"
							class="main-nav-link link-text"
							>Detail Transaksi</a
						>
					</li>
					<li>
						<a
							@click="profilePegawai"
							class="main-nav-link link-text"
							>Profile</a
						>
					</li>
					<li>
						<a class="main-nav-link logout" @click="logout"
							>Logout</a
						>
					</li>
				</ul>
			</nav>
		</header>

		<!-- ********************* -->
		<!-- Admin -->
		<!-- ********************* -->

		<header
			class="header"
			v-if="!loginCustomer && !loginManager && !loginCS && loginAdmin"
		>
			<!-- <a @click="kembaliDashboard" class="ajr-logo">
				<img src="../Images/AJR_logo.png" alt="AJR Logo" class="logo" />
				<h3 class="heading-tertiary">Selamat Datang, Admin!</h3>
			</a> -->
			<a class="header-logo" @click="kembaliDashboard">
				<figure class="ajr-logo-header">
					<img src="../Images/AJR_logo.png" alt="AJR Logo" />
					<h3 class="heading-tertiary">Selamat Datang, Admin!</h3>
				</figure>
			</a>
			<nav class="main-nav">
				<ul class="main-nav-list">
					<li>
						<a
							@click="pemilikMobilPegawai"
							class="main-nav-link link-text"
							>Pemilik Mobil</a
						>
					</li>
					<li>
						<a
							@click="asetMobilPegawai"
							class="main-nav-link link-text"
							>Aset Mobil</a
						>
					</li>
					<li>
						<a @click="pegawai" class="main-nav-link link-text"
							>Pegawai</a
						>
					</li>
					<li>
						<a
							@click="jabatanPegawai"
							class="main-nav-link link-text"
							>Jabatan Pegawai</a
						>
					</li>
					<li>
						<a
							@click="driverPegawai"
							class="main-nav-link link-text"
							>Driver</a
						>
					</li>
					<li>
						<a
							@click="profilePegawai"
							class="main-nav-link link-text"
							>Profile</a
						>
					</li>
					<li>
						<a class="main-nav-link logout" @click="logout"
							>Logout</a
						>
					</li>
				</ul>
			</nav>
		</header>

		<div>
			<router-view></router-view>
		</div>
	</div>
</template>

<style scoped>
@import "../css/dashboardLayout.css";
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
