<template>
	<section class="profile-customer-section">
		<div class="profile-customer-container">
			<div class="heading">
				<h1 class="heading-primary">Profile</h1>
				<hr />
			</div>
			<div class="profile-card">
				<div class="profile-form">
					<v-form v-model="valid" ref="form">
						<v-text-field
							v-model="id_customer"
							filled
							disabled
							label="ID Customer"
						>
						</v-text-field>
						<v-text-field
							v-model="nama_customer"
							required
							filled
							label="Nama Customer"
							:rules="namaRules"
						>
						</v-text-field>
						<v-text-field
							v-model="email_customer"
							required
							filled
							label="Email"
							:rules="emailRules"
						>
						</v-text-field>
						<v-text-field
							v-model="nomor_telepon_customer"
							required
							filled
							label="Nomor Telepon"
							type="number"
							counter="13"
							:rules="noTelpRules"
						>
						</v-text-field>
						<v-textarea
							v-model="alamat_customer"
							required
							filled
							label="Alamat Customer"
							:rules="alamatRules"
						>
						</v-textarea>
						<v-text-field
							v-model="tanggal_lahir_customer"
							required
							filled
							label="Masukkan Tanggal Lahir"
							type="date"
							:rules="tanggalLahirRules"
						>
						</v-text-field>
						<v-select
							filled
							v-model="jenis_kelamin_customer"
							:items="['Laki-laki', 'Perempuan']"
							label="Jenis Kelamin"
							required
							:rules="jenisKelaminRules"
						>
						</v-select>
						<v-text-field
							v-model="no_ktp_customer"
							required
							filled
							label="Nomor KTP"
							type="number"
							counter="16"
							:rules="noKTPRules"
						>
						</v-text-field>
						<v-text-field
							v-model="no_sim_customer"
							required
							filled
							label="Nomor SIM"
							type="number"
							counter="16"
						>
						</v-text-field>
						<div class="text-field">
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
						<div class="text-field">
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
						<v-text-field
							v-model="password_customer"
							:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
							:rules="passwordRules"
							:type="show1 ? 'text' : 'password'"
							name="input-10-1"
							counter
							@click:append="show1 = !show1"
							label="Masukkan Password"
							filled
						>
						</v-text-field
					></v-form>
					<div class="register-button">
						<a class="btn btn--full" @click="update">Edit Data</a>
					</div>
				</div>
			</div>
			<div class="customer-document-container">
				<div class="ktp-container flex-foto">
					<h2 class="heading-foto">FOTO KTP</h2>
					<v-img
						width="40rem"
						:src="
							previewImageKTP == ''
								? $baseUrl + '/storage/' + foto_ktp_customer
								: previewImageKTP
						"
						id="previewImageSuratJasmani"
						class="mb-5 ml-4 mt-4"
					>
					</v-img>
				</div>
				<div class="sim-container flex-foto">
					<h2 class="heading-foto">FOTO SIM</h2>
					<v-img
						width="40rem"
						:src="
							previewImageSIM == ''
								? $baseUrl + '/storage/' + foto_sim_customer
								: previewImageSIM
						"
						id="previewImageSuratJasmani"
						class="mb-5 ml-4 mt-4"
					>
					</v-img>
				</div>
				<div class="card-container">
					<div class="card-wrapper" id="generatedIdCard">
						<div class="user-card">
							<span class="user-photo">
								<i class="fa fa-user"></i>
								<img
									src="../Images/Logo_Customer.png"
									style="
										width: 400px;
										height: 350px;
										padding-left: 16px;
									"
								/>
							</span>
						</div>
						<div class="general-information text-right">
							<div class="card-element card-name">
								<span class="card-inputAtas" id="cardName">{{
									nama_customer
								}}</span>
							</div>
							<div class="card-element customer-id">
								<span class="card-inputAtas"> CUSTOMER </span>
							</div>
							<div class="card-element customer-id">
								<span
									class="card-inputAtas"
									id="cardIdCustomer"
									>{{ id_customer }}</span
								>
							</div>

							<div
								class="card-element customer-phone"
								style="margin-top: 36px"
							>
								<span class="card-title">Mobile: </span>
								<span
									class="card-input"
									id="cardPhoneCustomer"
									>{{ nomor_telepon_customer }}</span
								>
							</div>
							<div class="card-element customer-address">
								<span class="card-title">Address: </span>
								<span
									class="card-input"
									id="cardPhoneCustomer"
									>{{ alamat_customer }}</span
								>
							</div>
							<div class="card-element customer-email">
								<span class="card-title">Email: </span>
								<span
									class="card-input"
									id="cardPhoneCustomer"
									>{{ email_customer }}</span
								>
							</div>
						</div>
					</div>
				</div>

				<div class="container-button">
					<button class="btn-generate" @click="generateCard()">
						Download Kartu Customer
					</button>
				</div>
			</div>
		</div>

		<v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
			error_message
		}}</v-snackbar>
	</section>
</template>

<style>
@import url(../css/profileCustomerPage.css);
</style>

<script>
import html2canvas from 'html2canvas';
export default {
	name: 'ProfileCustomer',
	data() {
		return {
			load: false,
			snackbar: false,
			error_message: '',
			color: '',
			previewImageSIM: '',
			previewImageKTP: '',
			foto_sim_customer: '',
			foto_ktp_customer: '',

			search: null,
			dialog: false,
			dialogEdit: false,
			dialogConfirm: false,
			show1: false,

			id_customer: localStorage.getItem('id_customer'),
			nama_customer: localStorage.getItem('nama_customer'),
			email_customer: localStorage.getItem('email_login'),
			nomor_telepon_customer: localStorage.getItem(
				'nomor_telepon_customer'
			),
			alamat_customer: localStorage.getItem('alamat_customer'),
			tanggal_lahir_customer: localStorage.getItem(
				'tanggal_lahir_customer'
			),
			jenis_kelamin_customer: localStorage.getItem(
				'jenis_kelamin_customer'
			),
			no_ktp_customer: localStorage.getItem('no_ktp_customer'),
			no_sim_customer: localStorage.getItem('no_sim_customer'),

			customer: new FormData(),
			customers: [],
			deleteId: '',
			editId: localStorage.getItem('id_customer_increment'),

			namaRules: [(v) => !!v || 'Nama tidak boleh kosong'],
			emailRules: [(v) => !!v || 'Email tidak boleh kosong'],
			noTelpRules: [(v) => !!v || 'Nomor Telepon tidak boleh kosong'],
			alamatRules: [(v) => !!v || 'Alamat tidak boleh kosong'],
			tanggalLahirRules: [
				(v) => !!v || 'Tanggal Lahir tidak boleh kosong',
			],
			jenisKelaminRules: [
				(v) => !!v || 'Jenis Kelamin tidak boleh kosong',
			],
			noKTPRules: [(v) => !!v || 'Nomor KTP tidak boleh kosong'],
			passwordRules: [(v) => !!v || 'Password tidak boleh kosong'],
			rules: {
				required: (value) => !!value || 'Required.',
			},
			// form: {
			// 	foto_ktp_customer: null,
			// },
		};
	},
	methods: {
		onPreviewimage(e) {
			this.previewImageSIM = URL.createObjectURL(e);
			this.previewImageKTP = URL.createObjectURL(e);
		},
		async generateCard() {
			console.log('Button clicked');
			const canvas = await html2canvas(
				document.getElementById('generatedIdCard')
			);
			canvas.style.display = 'none';
			document.body.appendChild(canvas);
			const image = canvas
				.toDataURL('image/png')
				.replace('image/png', 'image/octet-stream');
			const a = document.createElement('a');
			a.setAttribute('download', `KartuCustomer.png`);
			a.setAttribute('href', image);
			a.click();
		},
		//read data
		readData() {
			var url = this.$api + '/customer/' + this.editId;
			this.$http
				.get(url, {
					// headers: {
					//     'Authorization': 'Bearer ' + localStorage.getItem('id_customer_increment')
					// }
				})
				.then((response) => {
					this.users = response.data.data;
				});
		},
		fotoHandler() {
			var url = this.$api + '/customer/' + this.editId;
			this.$http.get(url, {}).then((response) => {
				this.foto_ktp_customer = response.data.data.foto_ktp_customer;
				this.foto_sim_customer = response.data.data.foto_sim_customer;
			});
		},

		//update data
		update() {
			// let newData = {
			// 	nama_customer: this.nama_customer,
			// 	nomor_telepon_customer: this.nomor_telepon_customer,
			// 	alamat_customer: this.alamat_customer,
			// 	email_customer: this.email_customer,
			// 	tanggal_lahir_customer: this.tanggal_lahir_customer,
			// 	jenis_kelamin_customer: this.jenis_kelamin_customer,
			// 	no_ktp_customer: this.no_ktp_customer,
			// 	password_customer: this.password_customer,
			// };
			var data = new FormData();
			data.append('nama_customer', this.nama_customer);
			data.append('nomor_telepon_customer', this.nomor_telepon_customer);
			data.append('alamat_customer', this.alamat_customer);
			data.append('email_customer', this.email_customer);
			data.append('tanggal_lahir_customer', this.tanggal_lahir_customer);
			data.append('jenis_kelamin_customer', this.jenis_kelamin_customer);
			data.append('no_ktp_customer', this.no_ktp_customer);
			data.append('no_sim_customer', this.no_sim_customer ?? '');
			data.append('password_customer', this.password_customer ?? '');

			var uploadKTPCustomer = document.getElementById('fileKTPCustomer'),
				dataFileKTPCustomer = uploadKTPCustomer.files[0];
			if (dataFileKTPCustomer) {
				data.append('foto_ktp_customer', dataFileKTPCustomer);
			}

			var uploadSIMCustomer = document.getElementById('fileSIMCustomer'),
				dataFileSIMCustomer = uploadSIMCustomer.files[0];
			if (dataFileSIMCustomer) {
				data.append('foto_sim_customer', dataFileSIMCustomer);
			}

			var url = this.$api + '/updateCustomerSendiri/' + this.editId;
			this.load = true;
			this.$http
				.post(url, data, {
					// headers: {
					//     'Authorization': 'Bearer ' + localStorage.getItem('token')
					// }
				})
				.then((response) => {
					this.error_message = response.data.message;
					this.color = 'green';
					this.snackbar = true;
					this.load = false;
					this.close();
					this.readData();
					this.fotoHandler();
					location.reload();
					// this.resetForm();
					this.inputType = 'Tambah';
				})
				.catch((error) => {
					this.error_message = error.response.data.message;
					this.color = 'red';
					this.snackbar = true;
					this.load = false;
				});
		},

		close() {
			this.setUserLocalActive();
			this.setFormUserActive();
			this.fotoHandler();
			this.dialog = false;
		},

		setUserLocalActive() {
			localStorage.setItem('id_customer', this.id_customer);
			localStorage.setItem('nama_customer', this.nama_customer);
			localStorage.setItem('email_customer', this.email_customer);
			localStorage.setItem(
				'nomor_telepon_customer',
				this.nomor_telepon_customer
			);
			localStorage.setItem('alamat_customer', this.alamat_customer);
			localStorage.setItem(
				'tanggal_lahir_customer',
				this.tanggal_lahir_customer
			);
			localStorage.setItem(
				'jenis_kelamin_customer',
				this.jenis_kelamin_customer
			);
			localStorage.setItem('no_sim_customer', this.no_sim_customer);
			localStorage.setItem('no_ktp_customer', this.no_ktp_customer);
			localStorage.setItem('password_customer', this.password_customer);
		},

		setFormUserActive() {
			this.id_customer = localStorage.getItem('id_customer');
			this.nama_customer = localStorage.getItem('nama_customer');
			this.email_customer = localStorage.getItem('email_login');
			this.nomor_telepon_customer = localStorage.getItem(
				'nomor_telepon_customer'
			);
			this.alamat_customer = localStorage.getItem('alamat_customer');
			this.tanggal_lahir_customer = localStorage.getItem(
				'tanggal_lahir_customer'
			);
			this.jenis_kelamin_customer = localStorage.getItem(
				'jenis_kelamin_customer'
			);
			this.no_sim_customer = localStorage.getItem('no_sim_customer');
			this.no_ktp_customer = localStorage.getItem('no_ktp_customer');
			this.password_customer = localStorage.getItem('password_customer');
		},
		resetForm() {
			(this.nama_customer = null),
				(this.email_customer = null),
				(this.nomor_telepon_customer = null),
				(this.alamat_customer = null),
				(this.tanggal_lahir_customer = null),
				(this.jenis_kelamin_customer = null),
				(this.no_sim_customer = null),
				(this.no_ktp_customer = null),
				(this.password_customer = null);
		},
	},
	computed: {
		formTitle() {
			return this.inputType;
		},
	},
	mounted() {
		this.readData();
		this.fotoHandler();
	},
};
</script>
