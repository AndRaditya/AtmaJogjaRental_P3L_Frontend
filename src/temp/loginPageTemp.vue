<template>
	<main>
		<v-container
			fluid
			fill-height
			class="posisinya"
			style="margin-top: 100px"
		>
			<v-layout flex align-center justify-center>
				<v-flex xs12 sm6 elevation-6>
					<v-card>
						<h1
							style="
								font-family: Anton, sans-serif;
								padding-top: 30px;
							"
						>
							Masuk
						</h1>
						<img
							src="../Images/login.jpeg"
							style="width: 150px; font-size: 35px !important"
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
												>E-Mail</strong
											>
										</p>
										<v-text-field
											v-model="email_login"
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
												>Password</strong
											>
										</p>
										<v-text-field
											filled
											v-model="password_login"
											:append-icon="
												show1
													? 'mdi-eye'
													: 'mdi-eye-off'
											"
											:rules="[rules.required]"
											:type="show1 ? 'text' : 'password'"
											name="input-10-1"
											counter
											@click:append="show1 = !show1"
											label="Masukkan Password"
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
												>Role</strong
											>
										</p>
										<v-select
											filled
											v-model="opsi_login"
											:items="['Customer', 'Pegawai']"
											label="Silahkan Pilih Role Anda"
											required
											prepend-icon="mdi-account"
										>
										</v-select>
									</div>
									<v-layout justify-center>
										<v-btn
											class="btn btn-primary d-block w-100 white--text"
											@click="submit"
											style="
												background: #ff7d00;
												margin-right: 8px;
											"
										>
											Masuk
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
											>Belum punya akun?</span
										>
										<a
											class="text-start d-table-cell forgot"
											@click="register"
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
												Daftar Disini!</span
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
						>{{ error_message }}</v-snackbar
					>
				</v-flex>
			</v-layout>
		</v-container>
	</main>
</template>

<style scoped></style>

<script>
export default {
	name: "Login",
	data() {
		return {
			load: false,
			show1: false,
			snackbar: false,
			error_message: "",
			color: "",
			valid: false,
			password_login: "",
			passwordRules: [(v) => !!v || "Password tidak boleh kosong"],
			email_login: "",
			emailRules: [(v) => !!v || "E-Mail tidak boleh kosong"],
			opsi_login: null,
			rules: {
				required: (value) => !!value || "Required.",
				// min: v => v.length >= 8 || 'Min 8 characters',
				// emailMatch: () => (`The email and password you entered don't match`),
			},
		};
	},
	// mounted(){
	//         this.showVerified();
	//     },
	methods: {
		submit() {
			if (this.$refs.form.validate()) {
				//cek validasi data yang terkirim
				this.load = true;
				this.$http
					.post(this.$api + "/login", {
						email_login: this.email_login,
						password_login: this.password_login,
						opsi_login: this.opsi_login,
					})
					.then((response) => {
						this.error_message = response.data.message;
						if (this.opsi_login === "Customer") {
							//simpan data id usere yang diinput
							localStorage.setItem(
								"id_customer_increment",
								response.data.data.id_customer_increment
							);
							localStorage.setItem(
								"nama_customer",
								response.data.data.nama_customer
							);
							localStorage.setItem(
								"email_login",
								response.data.data.email_customer
							);
							localStorage.setItem(
								"nomor_telepon_customer",
								response.data.data.nomor_telepon_customer
							);
							localStorage.setItem(
								"alamat_customer",
								response.data.data.alamat_customer
							);
							localStorage.setItem(
								"tanggal_lahir_customer",
								response.data.data.tanggal_lahir_customer
							);
							localStorage.setItem(
								"jenis_kelamin_customer",
								response.data.data.jenis_kelamin_customer
							);
							localStorage.setItem(
								"no_sim_customer",
								response.data.data.no_sim_customer
							);
							localStorage.setItem(
								"no_ktp_customer",
								response.data.data.no_ktp_customer
							);
							localStorage.setItem(
								"id_customer",
								response.data.data.id_customer
							);
							localStorage.setItem(
								"password_customer",
								response.data.data.password_customer
							);
						} else if (this.opsi_login === "Pegawai") {
							localStorage.setItem(
								"id_pegawai",
								response.data.data.id_pegawai
							);
							localStorage.setItem(
								"nama_pegawai",
								response.data.data.nama_pegawai
							);
							localStorage.setItem(
								"email_login",
								response.data.data.email_pegawai
							);
							localStorage.setItem(
								"nomor_telepon_pegawai",
								response.data.data.nomor_telepon_pegawai
							);
							localStorage.setItem(
								"alamat_pegawai",
								response.data.data.alamat_pegawai
							);
							localStorage.setItem(
								"tanggal_lahir_pegawai",
								response.data.data.tanggal_lahir_pegawai
							);
							localStorage.setItem(
								"jenis_kelamin_pegawai",
								response.data.data.jenis_kelamin_pegawai
							);
							localStorage.setItem(
								"foto_pegawai",
								response.data.data.foto_pegawai
							);
							localStorage.setItem(
								"password_pegawai",
								response.data.data.password_pegawai
							);
							localStorage.setItem(
								"id_jabatan",
								response.data.data.id_jabatan
							);
						} else if (this.opsi_login === "Driver") {
							localStorage.setItem(
								"id_driver_increment",
								response.data.id_driver_increment
							);
						}
						this.color = "green";
						this.snackbar = true;
						this.load = false;
						this.clear();
						this.$router.push({
							name: "Dashboard",
						});
					})
					.catch((error) => {
						this.error_message = error.response.data.message;
						// this.error_message = response.data.message;
						this.color = "red";
						this.snackbar = true;
						// localStorage.removeItem('token');
						this.load = false;
					});
			}
		},
		// showVerified() {
		//     if (this.$route.query.verified == 'success') {
		//         this.success = true;
		//         this.router.push(
		//             '/login'
		//         );
		//     }
		// },
		clear() {
			this.$refs.form.reset();
		},
		register() {
			this.$router.push({
				name: "Register",
			});
		},
	},
};
</script>
