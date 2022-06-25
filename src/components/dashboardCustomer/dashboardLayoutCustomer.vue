<template>
	<div class="index">
		<nav
			class="navbar navbar-expand-lg navbar-light bg-light shadow p-4 mb-5 bg-white navbaredit"
			id="navbarTop"
		>
			<div class="container-fluid">
				<div class="col-sm-2">
					<a
						@click="kembaliDashboard"
						style="
							text-decoration: none;
							display: flex;
							justify-content: start;
						"
					>
						<img
							src="../Images/AJR_logo.png"
							style="width: 80px; height: 80px"
							align="left"
						/>
						<h2
							style="
								color: black;
								margin-top: 12px;
								margin-left: 10px;
								display: flex;
								width: 1000px;
								font-size: 24px;
								font-weight: bold;
							"
						>
							Atma Jogja Rental
						</h2>
					</a>
				</div>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav" style="margin: 0 0 0 auto">
						<li class="nav-item" style="margin-left: 16px">
							<a class="nav-link" @click="promoCustomer">Promo</a>
						</li>
						<li class="nav-item" style="margin-left: 16px">
							<a class="nav-link" @click="driverCustomer"
								>Driver</a
							>
						</li>
						<li class="nav-item" style="margin-left: 16px">
							<a class="nav-link" @click="asetMobilCustomer"
								>Mobil</a
							>
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
			</div>
		</nav>

		<div class="fullheight pa-5" style="padding: 0px">
			<router-view></router-view>
		</div>
	</div>
</template>

<style scoped>
@import "../css/navbarIndex.css";
</style>

<script>
export default {
	name: "DashboardCustomer",
	data() {
		return {
			items: [
				{
					title: "DashboardCustomer",
					to: "/dashboard",
				},
				{
					title: "PromoCustomer",
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
					title: "DetailTransaksi",
					to: "/detail-transaksi",
				},
				// {title: "Course", to: "/course"},
			],
		};
	},
	methods: {
		promo() {
			this.$router.push({
				name: "PromoCustomer",
			});
		},
		customer() {
			this.$router.push({
				name: "Customer",
			});
		},
		asetMobil() {
			this.$router.push({
				name: "AsetMobilCustomer",
			});
		},

		driver() {
			this.$router.push({
				name: "DriverCustomer",
			});
		},
		transaksi() {
			this.$router.push({
				name: "transaksiCustomer",
			});
		},
		DetailTransaksi() {
			this.$router.push({
				name: "DetailTransaksiCustomer",
			});
		},
		kembaliDashboard() {
			this.$router.push({
				name: "DashboardCustomer",
			});
		},
		logout() {
			// localStorage.removeItem('id');
			localStorage.removeItem("id_customer_increment");
			localStorage.removeItem("nama_customer");
			localStorage.removeItem("email_customer");
			localStorage.removeItem("nomor_telepon_customer");
			localStorage.removeItem("alamat_customer");
			localStorage.removeItem("tanggal_lahir_customer");
			localStorage.removeItem("jenis_kelamin_customer");
			localStorage.removeItem("no_sim_customer");
			localStorage.removeItem("no_ktp_customer");
			localStorage.removeItem("password_customer");
			// location.reload();
			this.$router.push({
				name: "Index",
			});
		},
	},
};
</script>
