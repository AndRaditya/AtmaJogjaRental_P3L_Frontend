<template>
	<v-main class="list" style="margin-top: 900px">
		<v-container fluid fill-height class="posisinya">
			<v-layout flex align-center justify-center>
				<v-flex sm12 sm4>
					<v-card style="elevation">
						<h1
							style="
								padding-top: 50px;
								font-family: Anton, sans-serif;
								font-size: 35px !important;
							"
						>
							Daftar Sekarang
						</h1>
						<h2
							style="
								padding-top: 14px;
								font-family: Anton, sans-serif;
								font-size: 30px !important;
							"
						>
							Customer
						</h2>

						<img
							src="../Images/register.png"
							style="
								width: 130px;
								height: 130px;
								margin-bottom: 25px;
							"
						/>
						<v-card-text class="pt-4">
							<div>
								<v-form v-model="valid" ref="form">
									<div class="mb3">
										<p
											class="text-start"
											style="margin-bottom: 5px"
										>
											<strong
												style="
													font-size: 15px !important;
												"
												>Nama Lengkap</strong
											>
										</p>
										<v-text-field
											v-model="form.nama_customer"
											:rules="namaCustomerRules"
											required
											filled
											label="Masukkan Nama Lengkap"
										></v-text-field>
									</div>

									<div class="mb3">
										<p
											class="text-start"
											style="margin-bottom: 5px"
										>
											<strong
												style="
													font-size: 15px !important;
												"
												>E-Mail</strong
											>
										</p>
										<v-text-field
											v-model="form.email_customer"
											:rules="emailRules"
											required
											filled
											label="Masukkan E-Mail"
										>
										</v-text-field>
									</div>

									<div class="mb3">
										<p
											class="text-start"
											style="margin-bottom: 5px"
										>
											<strong
												style="
													font-size: 15px !important;
												"
												>Nomor Telepon</strong
											>
										</p>
										<v-text-field
											filled
											v-model="
												form.nomor_telepon_customer
											"
											:rules="noTelpRules"
											required
											label="Masukkan Nomor Telepon"
											counter="13"
										>
										</v-text-field>
									</div>

									<div class="mb3">
										<p
											class="text-start"
											style="margin-bottom: 5px"
										>
											<strong
												style="
													font-size: 15px !important;
												"
												>Alamat</strong
											>
										</p>
										<v-textarea
											dense
											filled
											v-model="form.alamat_customer"
											:rules="alamatRules"
											required
											label="Masukkan Alamat"
										>
										</v-textarea>
									</div>

									<div class="mb3">
										<p
											class="text-start"
											style="margin-bottom: 5px"
										>
											<strong
												style="
													font-size: 15px !important;
												"
												>Tanggal Lahir</strong
											>
										</p>
										<v-text-field
											dense
											filled
											v-model="
												form.tanggal_lahir_customer
											"
											required
											type="date"
										>
										</v-text-field>
									</div>

									<div class="mb3">
										<p
											class="text-start"
											style="margin-bottom: 5px"
										>
											<strong
												style="
													font-size: 15px !important;
												"
												>Jenis Kelamin</strong
											>
										</p>
										<v-select
											filled
											v-model="
												form.jenis_kelamin_customer
											"
											:items="['Laki-laki', 'Perempuan']"
											label="Masukkan Jenis Kelamin"
											required
										>
										</v-select>
									</div>

									<div class="mb3">
										<p
											class="text-start"
											style="margin-bottom: 5px"
										>
											<strong
												style="
													font-size: 15px !important;
												"
												>Nomor KTP</strong
											>
										</p>
										<v-text-field
											filled
											v-model="form.no_ktp_customer"
											:rules="noKTPRules"
											required
											label="Masukkan Nomor KTP"
											counter="16"
										>
										</v-text-field>
									</div>

									<div class="mb3">
										<p
											class="text-start"
											style="margin-bottom: 5px"
										>
											<strong
												style="
													font-size: 15px !important;
												"
												>Nomor SIM</strong
											>
										</p>
										<v-text-field
											filled
											v-model="form.no_sim_customer"
											label="Masukkan Nomor SIM"
										>
										</v-text-field>
									</div>

									<v-layout justify-center>
										<v-btn
											class="btn btn-primary d-block w-100 white--text"
											@click="submit"
											style="
												background: #ff7d00;
												margin-right: 8px;
											"
											name="register"
										>
											Daftar
										</v-btn>
									</v-layout>

									<v-layout
										justify-center
										style="margin-top: 20px"
									>
										<v-btn
											@click="clear"
											class="grey darken-3 white--text"
											>Clear</v-btn
										>
									</v-layout>

									<v-layout
										justify-center
										style="margin-top: 20px"
									>
										<span
											class="d-table-cell"
											style="font-size: 12px"
											>Sudah punya akun?</span
										>
										<a
											class="text-start d-table-cell forgot"
											@click="login"
											style="
												width: 111px;
												color: var(--bs-blue);
											"
										>
											<span
												style="
													text-decoration: underline;
													margin: 4px;
												"
											>
												Login Disini!</span
											>
										</a>
									</v-layout>
								</v-form>
							</div>
						</v-card-text>
					</v-card>

					<v-snackbar
						v-model="snackbar"
						:color="color"
						timeout="2000"
						bottom
						>{{ error_message }}
					</v-snackbar>
				</v-flex>
			</v-layout>
		</v-container>
	</v-main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");

.posisinya {
	position: absolute;
	margin-top: 20px;
	left: 0;
	right: 0;
}
</style>

<script>
export default {
	name: "Register",
	data() {
		return {
			load: false,
			snackbar: false,
			error_message: "",
			color: "",
			valid: false,
			nama_customer: "",
			namaCustomerRules: [
				(v) => !!v || "Nama Lengkap tidak boleh kosong",
			],
			email_customer: "",
			emailRules: [(v) => !!v || "E-Mail tidak boleh kosong"],
			nomor_telepon_customer: "",
			noTelpRules: [(v) => !!v || "Nomor Telepon tidak boleh kosong"],
			alamat_customer: "",
			alamatRules: [(v) => !!v || "Alamat tidak boleh kosong"],
			no_ktp_customer: "",
			noKTPRules: [(v) => !!v || "Nomor KTP tidak boleh kosong"],
			no_sim_customer: "",

			customer: new FormData(),
			customers: [],
			form: {
				nama_customer: null,
				nomor_telepon_customer: null,
				alamat_customer: null,
				email_customer: null,
				jenis_kelamin_customer: null,
				tanggal_lahir_customer: null,
				no_sim_customer: null,
				no_ktp_customer: null,
				password_customer: null,
			},
		};
	},
	methods: {
		submit() {
			this.customer.append("nama_customer", this.form.nama_customer);
			this.customer.append(
				"nomor_telepon_customer",
				this.form.nomor_telepon_customer
			);
			this.customer.append("alamat_customer", this.form.alamat_customer);
			this.customer.append("email_customer", this.form.email_customer);
			this.customer.append(
				"jenis_kelamin_customer",
				this.form.jenis_kelamin_customer
			);
			this.customer.append(
				"tanggal_lahir_customer",
				this.form.tanggal_lahir_customer
			);
			this.customer.append("no_sim_customer", this.form.no_sim_customer);
			this.customer.append("no_ktp_customer", this.form.no_ktp_customer);

			var url = this.$api + "/customer";
			this.load = true;
			this.$http
				.post(url, this.customer, {
					// headers: {
					//     Authorization: "Bearer " + localStorage.getItem("token"),
					// },
				})
				.then((response) => {
					// this.error_message = response.data.message;
					// this.color = "green";
					// this.snackbar = true;
					// this.load = true;
					// this.close();
					// this.readData(); // baca data
					// this.resetForm();
					// this.$router.push({
					//     name: 'Index',
					// });
					this.error_message = response.data.message;
					this.color = "green";
					this.snackbar = true;
					this.load = false;
					this.clear();
					this.$router.push({
						name: "Login",
					});
				})
				.catch((error) => {
					this.error_message = error.response.data.message;
					this.color = "red";
					this.snackbar = true;
					this.load = false;
				});
		},
		resetForm() {
			this.form = {
				nama_customer: null,
				nomor_telepon_customer: null,
				alamat_customer: null,
				email_customer: null,
				jenis_kelamin_customer: null,
				tanggal_lahir_customer: null,
				no_sim_customer: null,
				no_ktp_customer: null,
				password_customer: null,
			};
		},
		clear() {
			this.$refs.form.resetForm();
		},
		login() {
			this.$router.push({
				name: "Login",
			});
		},
	},
};
</script>
