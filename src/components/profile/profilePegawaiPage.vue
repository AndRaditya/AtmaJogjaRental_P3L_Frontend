<template>
	<section class="profile-pegawai-section">
		<div class="profile-pegawai-container">
			<h1 class="heading-primary">Profile Pegawai</h1>
			<div class="profile-card">
				<div class="profile-form">
					<v-form v-model="valid" ref="form">
						<v-text-field
							v-model="form.nama_pegawai"
							filled
							label="Nama Pegawai"
							:rules="namaRules"
						>
						</v-text-field>
						<v-text-field
							v-model="form.email_pegawai"
							filled
							label="Email"
							:rules="emailRules"
						>
						</v-text-field>
						<v-text-field
							v-model="form.nomor_telepon_pegawai"
							filled
							label="Nomor Telepon"
							type="number"
							counter="13"
							:rules="noTelpRules"
						>
						</v-text-field>
						<v-textarea
							v-model="form.alamat_pegawai"
							filled
							label="Alamat Customer"
							:rules="alamatRules"
						>
						</v-textarea>
						<v-text-field
							v-model="form.tanggal_lahir_pegawai"
							filled
							label="Masukkan Tanggal Lahir"
							type="date"
							:rules="tanggalLahirRules"
						>
						</v-text-field>
						<v-select
							filled
							v-model="form.jenis_kelamin_pegawai"
							:items="['Laki-laki', 'Perempuan']"
							label="Jenis Kelamin"
							:rules="jenisKelaminRules"
						>
						</v-select>
						<v-file-input
							filled
							prepend-icon="mdi-camera"
							label="Upload Foto Pegawai"
							id="filePegawai"
							ref="fileFotoPegawai"
						>
						</v-file-input>
						<v-text-field
							v-model="form.password_pegawai"
							:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
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
			<div class="profile-photo">
				<div class="flex-foto">
					<h2 class="heading-foto">FOTO PROFILE</h2>
					<v-img
						class="foto-pegawai"
						:src="
							previewImagePegawai == ''
								? $baseUrl + '/storage/' + foto_pegawai
								: previewImagePegawai
						"
					>
					</v-img>
				</div>
			</div>
		</div>

		<v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
			error_message
		}}</v-snackbar>
	</section>
</template>

<style>
@import url(../css/profilePegawaiPage.css);
</style>

<script>
export default {
	name: 'ProfilePegawai',
	data() {
		return {
			load: false,
			snackbar: false,
			error_message: '',
			color: '',
			search: null,
			dialog: false,
			dialogEdit: false,
			dialogConfirm: false,
			show1: false,
			pegawai: new FormData(),
			pegawais: [],
			deleteId: '',
			foto_pegawai: '',
			previewImagePegawai: '',

			form: {
				nama_pegawai: null,
				email_pegawai: null,
				nomor_telepon_pegawai: null,
				alamat_pegawai: null,
				tanggal_lahir_pegawai: null,
				jenis_kelamin_pegawai: null,
				password_pegawai: null,
				foto_pegawai: null,
			},

			editId: localStorage.getItem('id_pegawai'),

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
			rules: {
				required: (value) => !!value || 'Required.',
			},
		};
	},
	methods: {
		onPreviewimage(e) {
			this.previewImagePegawai = URL.createObjectURL(e);
		},

		//read data
		readData() {
			this.form.nama_pegawai = localStorage.getItem('nama_pegawai');
			this.form.email_pegawai = localStorage.getItem('email_login');
			this.form.nomor_telepon_pegawai = localStorage.getItem(
				'nomor_telepon_pegawai'
			);
			this.form.alamat_pegawai = localStorage.getItem('alamat_pegawai');
			this.form.tanggal_lahir_pegawai = localStorage.getItem(
				'tanggal_lahir_pegawai'
			);
			this.form.jenis_kelamin_pegawai = localStorage.getItem(
				'jenis_kelamin_pegawai'
			);
			this.form.foto_pegawai = localStorage.getItem('foto_pegawai');
		},
		fotoHandler() {
			var url = this.$api + '/pegawai/' + this.editId;
			this.$http.get(url, {}).then((response) => {
				this.foto_pegawai = response.data.data.foto_pegawai;
			});
		},

		//update data
		update() {
			// let newData = {
			//     nama_pegawai: this.nama_pegawai,
			//     email_pegawai: this.email_pegawai,
			//     nomor_telepon_pegawai: this.nomor_telepon_pegawai,
			//     alamat_pegawai: this.alamat_pegawai,
			//     tanggal_lahir_pegawai: this.tanggal_lahir_pegawai,
			//     jenis_kelamin_pegawai: this.jenis_kelamin_pegawai,
			//     password_pegawai: this.password_pegawai,
			//     no_ktp_customer: this.no_ktp_customer,
			//     password_customer: this.password_customer
			// };
			var data = new FormData(),
				uploadFoto = document.getElementById('filePegawai'),
				dataFileFoto = uploadFoto.files[0];

			data.append('nama_pegawai', this.form.nama_pegawai);
			data.append('email_pegawai', this.form.email_pegawai);
			data.append(
				'nomor_telepon_pegawai',
				this.form.nomor_telepon_pegawai
			);
			data.append('alamat_pegawai', this.form.alamat_pegawai);
			data.append(
				'jenis_kelamin_pegawai',
				this.form.jenis_kelamin_pegawai
			);
			data.append(
				'tanggal_lahir_pegawai',
				this.form.tanggal_lahir_pegawai
			);
			data.append('password_pegawai', this.form.password_pegawai ?? '');

			if (dataFileFoto) {
				data.append('foto_pegawai', dataFileFoto);
			}
			var url = this.$api + '/pegawai/' + this.editId;
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
					this.setUserLocalActive();
					// this.resetForm();
					// this.inputType = 'Tambah';
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
			localStorage.setItem('nama_pegawai', this.form.nama_pegawai);
			localStorage.setItem('email_pegawai', this.form.email_pegawai);
			localStorage.setItem(
				'nomor_telepon_pegawai',
				this.form.nomor_telepon_pegawai
			);
			localStorage.setItem('alamat_pegawai', this.form.alamat_pegawai);
			localStorage.setItem(
				'tanggal_lahir_pegawai',
				this.form.tanggal_lahir_pegawai
			);
			localStorage.setItem(
				'jenis_kelamin_pegawai',
				this.form.jenis_kelamin_pegawai
			);
			// localStorage.setItem('foto_pegawai', this.form.foto_pegawai);
			// localStorage.setItem('password_pegawai', this.password_pegawai);
		},

		setFormUserActive() {
			this.nama_pegawai = localStorage.getItem('nama_pegawai');
			this.email_pegawai = localStorage.getItem('email_pegawai');
			this.nomor_telepon_pegawai = localStorage.getItem(
				'nomor_telepon_pegawai'
			);
			this.alamat_pegawai = localStorage.getItem('alamat_pegawai');
			this.tanggal_lahir_pegawai = localStorage.getItem(
				'tanggal_lahir_pegawai'
			);
			this.jenis_kelamin_pegawai = localStorage.getItem(
				'jenis_kelamin_pegawai'
			);
			// this.foto_pegawai = localStorage.getItem('foto_pegawai');
			this.password_pegawai = localStorage.getItem('password_pegawai');
		},
		resetForm() {
			(this.nama_pegawai = null),
				(this.email_pegawai = null),
				(this.nomor_telepon_pegawai = null),
				(this.alamat_pegawai = null),
				(this.tanggal_lahir_pegawai = null),
				(this.jenis_kelamin_pegawai = null),
				(this.foto_pegawai = null),
				(this.password_pegawai = null);
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
