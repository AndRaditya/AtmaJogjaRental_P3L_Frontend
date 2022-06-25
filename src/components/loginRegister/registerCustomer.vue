<template>
	<section class="register-section">
		<div class="register-container">
			<div class="register-box">
				<div class="register-card">
					<div class="register-text-box">
						<h2 class="heading-secondary">Silahkan Register</h2>
						<v-form
							v-model="valid"
							ref="form"
							class="form-register"
						>
							<div class="column-grid">
								<div class="text-field column-left">
									<p class="text-start">Nama Lengkap</p>
									<v-text-field
										v-model="form.nama_customer"
										:rules="namaCustomerRules"
										required
										filled
										label="Masukkan Nama Lengkap"
									>
									</v-text-field>
								</div>
								<div class="text-field column-right">
									<p class="text-start">E-Mail</p>
									<v-text-field
										v-model="form.email_customer"
										:rules="emailRules"
										required
										filled
										label="Masukkan E-Mail"
									>
									</v-text-field>
								</div>
								<div class="text-field column-left">
									<p class="text-start">Nomor Telepon</p>
									<v-text-field
										filled
										v-model="form.nomor_telepon_customer"
										:rules="noTelpRules"
										required
										label="Masukkan Nomor Telepon"
										counter="13"
									>
									</v-text-field>
								</div>
								<div class="text-field column-right">
									<p class="text-start">Jenis Kelamin</p>
									<v-select
										filled
										v-model="form.jenis_kelamin_customer"
										:items="['Laki-laki', 'Perempuan']"
										label="Masukkan Jenis Kelamin"
										required
									>
									</v-select>
								</div>
								<div class="text-field column-left">
									<p class="text-start">Nomor KTP</p>
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
								<div class="text-field column-right">
									<p class="text-start">Nomor SIM</p>
									<v-text-field
										filled
										v-model="form.no_sim_customer"
										label="Masukkan Nomor SIM"
										counter
									>
									</v-text-field>
								</div>
								<div class="text-field column-left">
									<p class="text-start">Upload KTP</p>
									<v-file-input
										filled
										prepend-icon="mdi-camera"
										label="Upload KTP"
										id="fileKTPCustomer"
										ref="fileFotoKTPCustomer"
									>
									</v-file-input>
								</div>
								<div class="text-field column-right">
									<p class="text-start">Upload SIM</p>
									<v-file-input
										filled
										prepend-icon="mdi-camera"
										label="Upload SIM"
										id="fileSIMCustomer"
										ref="fileFotoSIMCustomer"
									>
									</v-file-input>
								</div>
								<div class="text-field column-justify">
									<p class="text-start">Tanggal Lahir</p>
									<v-text-field
										dense
										filled
										v-model="form.tanggal_lahir_customer"
										required
										type="date"
									>
									</v-text-field>
								</div>
								<div class="text-field column-justify">
									<p class="text-start">Alamat</p>
									<v-textarea
										filled
										v-model="form.alamat_customer"
										:rules="alamatRules"
										required
										label="Masukkan Alamat"
									>
									</v-textarea>
								</div>
							</div>
						</v-form>
					</div>
					<div class="register-button">
						<a class="btn btn--full" @click="submit">Register</a>
						<p class="register-text">Sudah punya akun?</p>
						<a class="btn btn--outline" @click="login">Login</a>
					</div>
				</div>
			</div>
			<v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
				>{{ error_message }}
			</v-snackbar>
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
@import '../css/registerStyle.css';
@import '../css/footerStyle.css';
</style>

<script>
export default {
	name: 'Register',
	data() {
		return {
			load: false,
			snackbar: false,
			error_message: '',
			color: '',
			valid: false,
			nama_customer: '',
			namaCustomerRules: [
				(v) => !!v || 'Nama Lengkap tidak boleh kosong',
			],
			email_customer: '',
			emailRules: [(v) => !!v || 'E-Mail tidak boleh kosong'],
			nomor_telepon_customer: '',
			noTelpRules: [(v) => !!v || 'Nomor Telepon tidak boleh kosong'],
			alamat_customer: '',
			alamatRules: [(v) => !!v || 'Alamat tidak boleh kosong'],
			no_ktp_customer: '',
			noKTPRules: [(v) => !!v || 'Nomor KTP tidak boleh kosong'],
			no_sim_customer: '',

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
				foto_sim_customer: null,
				foto_ktp_customer: null,
				password_customer: null,
			},
		};
	},
	methods: {
		submit() {
			this.customer.append('nama_customer', this.form.nama_customer);
			this.customer.append(
				'nomor_telepon_customer',
				this.form.nomor_telepon_customer
			);
			this.customer.append('alamat_customer', this.form.alamat_customer);
			this.customer.append('email_customer', this.form.email_customer);
			this.customer.append(
				'jenis_kelamin_customer',
				this.form.jenis_kelamin_customer
			);
			this.customer.append(
				'tanggal_lahir_customer',
				this.form.tanggal_lahir_customer
			);
			this.customer.append('no_sim_customer', this.form.no_sim_customer);
			this.customer.append('no_ktp_customer', this.form.no_ktp_customer);

			var uploadKTPCustomer = document.getElementById('fileKTPCustomer'),
				dataFileKTPCustomer = uploadKTPCustomer.files[0];
			this.customer.append('foto_ktp_customer', dataFileKTPCustomer);

			var uploadSIMCustomer = document.getElementById('fileSIMCustomer'),
				dataFileSIMCustomer = uploadSIMCustomer.files[0];
			if (dataFileSIMCustomer) {
				this.customer.append('foto_sim_customer', dataFileSIMCustomer);
			}

			var url = this.$api + '/customer';
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
					this.color = 'green';
					this.snackbar = true;
					this.load = false;
					this.clear();
					this.$router.push({
						name: 'Login',
					});
				})
				.catch((error) => {
					this.error_message = error.response.data.message;
					this.color = 'red';
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
				foto_sim_customer: null,
				foto_ktp_customer: null,
				password_customer: null,
			};
		},
		clear() {
			this.$refs.form.resetForm();
		},
		login() {
			this.$router.push({
				name: 'Login',
			});
		},
	},
};
</script>
