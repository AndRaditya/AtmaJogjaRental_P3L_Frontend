<template>
	<section class="login-section">
		<div class="login-container">
			<div class="login-box">
				<div class="login-card">
					<div class="login-text-box">
						<h2 class="heading-secondary">Silahkan Masuk</h2>

						<v-form v-model="valid" ref="form">
							<div class="text-field">
								<p class="text-start">E-Mail</p>
								<v-text-field
									v-model="email_login"
									:rules="emailRules"
									required
									filled
									label="Masukkan E-Mail"
								>
								</v-text-field>
							</div>
							<div class="text-field">
								<p class="text-start">Password</p>
								<v-text-field
									filled
									v-model="password_login"
									:append-icon="
										show1 ? 'mdi-eye' : 'mdi-eye-off'
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
							<div class="text-field">
								<p class="text-start">Role</p>
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
						</v-form>
					</div>

					<div class="login-button">
						<a class="btn btn--full" @click="submit">Login</a>
						<p class="login-text">Belum punya akun?</p>
						<a class="btn btn--outline" @click="register"
							>Register</a
						>
					</div>
				</div>
			</div>
			<v-snackbar
				v-model="snackbar"
				:color="color"
				timeout="2000"
				bottom
				>{{ error_message }}</v-snackbar
			>
		</div>
		<footer class="footer-container">
			<div class="footer">
				<div class="logo-col">
					<div class="logo-container padding">
						<a href="#" class="footer-logo">
							<figure class="ajr-logo-footer">
								<img
									src="../Images/AJR_logo.png"
									alt="AJR Logo"
								/>
							</figure>
						</a>
						<h3 class="heading-tertiary logo-name">
							Atma Jogja Rental
						</h3>
					</div>
					<ul class="social-links padding">
						<li>
							<a class="footer-link" href="#">
								<ion-icon
									class="social-icon"
									name="logo-instagram"
								></ion-icon>
							</a>
						</li>
						<li>
							<a class="footer-link" href="#">
								<ion-icon
									class="social-icon"
									name="logo-facebook"
								></ion-icon>
							</a>
						</li>
						<li>
							<a class="footer-link" href="#">
								<ion-icon
									class="social-icon"
									name="logo-twitter"
								></ion-icon>
							</a>
						</li>
					</ul>

					<p class="copyright padding">
						Copyright &copy;
						<span class="year">2022</span> by Atma Jogja Rental Inc.
						All rights reserved
					</p>
				</div>
				<div class="address-col">
					<h2 class="heading-seconday contact-us padding">
						Contact Us
					</h2>
					<div class="contacts">
						<p class="address">Gedung Thomas Aquinas</p>
						<p class="address">
							<span>Jalan Babarsari 44 Yogyakarta</span>
						</p>
						<a href="tel:0274487711" class="footer-link margin-top"
							>(0274) 487711</a
						>
						<a href="email:humas@uajy.ac.id" class="footer-link"
							>humas@uajy.ac.id</a
						>
					</div>
				</div>
			</div>
		</footer>
	</section>
</template>

<style>
@import '../css/loginStyle.css';
@import '../css/footerStyle.css';
</style>

<script>
export default {
	name: 'Login',
	data() {
		return {
			load: false,
			show1: false,
			snackbar: false,
			error_message: '',
			color: '',
			valid: false,
			password_login: '',
			passwordRules: [(v) => !!v || 'Password tidak boleh kosong'],
			email_login: '',
			emailRules: [(v) => !!v || 'E-Mail tidak boleh kosong'],
			opsi_login: null,
			rules: {
				required: (value) => !!value || 'Required.',
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
					.post(this.$api + '/login', {
						email_login: this.email_login,
						password_login: this.password_login,
						opsi_login: this.opsi_login,
					})
					.then((response) => {
						this.error_message = response.data.message;
						if (this.opsi_login === 'Customer') {
							//simpan data id usere yang diinput
							localStorage.setItem(
								'id_customer_increment',
								response.data.data.id_customer_increment
							);
							localStorage.setItem(
								'nama_customer',
								response.data.data.nama_customer
							);
							localStorage.setItem(
								'email_login',
								response.data.data.email_customer
							);
							localStorage.setItem(
								'nomor_telepon_customer',
								response.data.data.nomor_telepon_customer
							);
							localStorage.setItem(
								'alamat_customer',
								response.data.data.alamat_customer
							);
							localStorage.setItem(
								'tanggal_lahir_customer',
								response.data.data.tanggal_lahir_customer
							);
							localStorage.setItem(
								'jenis_kelamin_customer',
								response.data.data.jenis_kelamin_customer
							);
							localStorage.setItem(
								'no_sim_customer',
								response.data.data.no_sim_customer
							);
							localStorage.setItem(
								'no_ktp_customer',
								response.data.data.no_ktp_customer
							);
							localStorage.setItem(
								'foto_ktp_customer',
								response.data.data.foto_ktp_customer
							);
							localStorage.setItem(
								'foto_sim_customer',
								response.data.data.foto_sim_customer
							);
							localStorage.setItem(
								'id_customer',
								response.data.data.id_customer
							);
							localStorage.setItem(
								'password_customer',
								response.data.data.password_customer
							);
						} else if (this.opsi_login === 'Pegawai') {
							localStorage.setItem(
								'id_pegawai',
								response.data.data.id_pegawai
							);
							localStorage.setItem(
								'nama_pegawai',
								response.data.data.nama_pegawai
							);
							localStorage.setItem(
								'email_login',
								response.data.data.email_pegawai
							);
							localStorage.setItem(
								'nomor_telepon_pegawai',
								response.data.data.nomor_telepon_pegawai
							);
							localStorage.setItem(
								'alamat_pegawai',
								response.data.data.alamat_pegawai
							);
							localStorage.setItem(
								'tanggal_lahir_pegawai',
								response.data.data.tanggal_lahir_pegawai
							);
							localStorage.setItem(
								'jenis_kelamin_pegawai',
								response.data.data.jenis_kelamin_pegawai
							);
							localStorage.setItem(
								'foto_pegawai',
								response.data.data.foto_pegawai
							);
							localStorage.setItem(
								'password_pegawai',
								response.data.data.password_pegawai
							);
							localStorage.setItem(
								'id_jabatan',
								response.data.data.id_jabatan
							);
						} else if (this.opsi_login === 'Driver') {
							localStorage.setItem(
								'id_driver_increment',
								response.data.id_driver_increment
							);
						}
						this.color = 'green';
						this.snackbar = true;
						this.load = false;
						this.clear();
						this.$router.push({
							name: 'Dashboard',
						});
					})
					.catch((error) => {
						this.error_message = error.response.data.message;
						// this.error_message = response.data.message;
						this.color = 'red';
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
				name: 'Register',
			});
		},
	},
};
</script>
