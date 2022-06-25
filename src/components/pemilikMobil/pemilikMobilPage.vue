<template>
	<v-main class="list">
		<h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">
			Pemilik Mobil
		</h3>

		<!-- <v-card> -->
		<v-card-title>
			<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="Search"
				single-line
				hide-details
			>
			</v-text-field>
			<v-spacer></v-spacer>
			<v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
		</v-card-title>
		<!-- </v-card> -->

		<v-data-table
			:headers="headers"
			:items="pemiliks"
			:search="search"
			:single-expand="singleExpand"
			:expanded.sync="expanded"
			item-key="task"
			show-expand
			class="elevation-1"
		>
			<template v-slot:[`item.actions`]="{ item }" class="col-sm">
				<v-card color="#FFFFFF" dark style="margin: 30px" outlined>
					<v-card-actions>
						<v-list-item class="grow">
							<v-btn
								color="primary"
								small
								class="mr-2"
								@click="editHandler(item)"
							>
								<v-icon class="mr-1" color="white">
									mdi-pencil
								</v-icon>
							</v-btn>
							<v-btn
								color="error"
								small
								@click="deleteHandler(item)"
							>
								<v-icon class="mr-1" color="white">
									mdi-delete
								</v-icon>
							</v-btn>
						</v-list-item>
					</v-card-actions>
				</v-card>
			</template>
		</v-data-table>

		<v-dialog
			v-model="dialog"
			persistent
			width="1000px"
			content-class="elevation-0"
		>
			<v-card>
				<v-card-title>
					<span class="headline">{{ formTitle }} Pemilik Mobil</span>
				</v-card-title>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-card-text>
						<v-container>
							<v-text-field
								v-model="form.nama_pemilik_mobil"
								required
								filled
								label="Masukkan Nama Lengkap"
							>
							</v-text-field>
							<v-textarea
								v-model="form.alamat_pemilik_mobil"
								required
								filled
								label="Masukkan Alamat"
							>
							</v-textarea>
							<v-text-field
								filled
								v-model="form.nomor_telepon_pemilik_mobil"
								required
								label="Masukkan Nomor Telepon"
								type="number"
								counter="13"
							>
							</v-text-field>
							<v-text-field
								filled
								v-model="form.no_ktp_pemilik_mobil"
								required
								label="Masukkan Nomor KTP"
								type="number"
								counter="16"
							>
							</v-text-field>
							<v-text-field
								filled
								v-model="form.periode_kontrak_mulai_mobil"
								required
								label="Masukkan Periode Kontrak Mulai"
								type="date"
							>
							</v-text-field>
							<v-text-field
								filled
								v-model="form.periode_kontrak_akhir_mobil"
								required
								label="Masukkan Periode Kontrak Akhir"
								type="date"
							>
							</v-text-field>
							<v-text-field
								filled
								v-model="form.tanggal_terakhir_servis_mobil"
								required
								label="Masukkan Tanggal Terakhir Servis"
								type="date"
							>
							</v-text-field>
						</v-container>
					</v-card-text>

					<v-card-action>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="cancel"
							>Cancel</v-btn
						>
						<v-btn color="blue darken-1" text @click="setForm"
							>Send</v-btn
						>
					</v-card-action>
				</v-form>
			</v-card>
		</v-dialog>

		<v-dialog v-model="dialogConfirm" persistent width="400px">
			<v-card>
				<v-card-title>
					<span class="headline">Warning!</span>
				</v-card-title>
				<v-card-text>
					Anda Yakin ingin menghapus pemilik mobil ini?
				</v-card-text>
				<v-card-action>
					<v-spacer></v-spacer>
					<v-btn
						color="blue darken-1"
						text
						@click="dialogConfirm = false"
						>Cancel</v-btn
					>
					<v-btn color="blue darken-1" text @click="deleteData"
						>Delete</v-btn
					>
				</v-card-action>
			</v-card>
		</v-dialog>

		<v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
			>{{ error_message }}
		</v-snackbar>
	</v-main>
</template>

<script>
export default {
	name: 'PemilikMobilPegawai',
	data() {
		return {
			inputType: 'Tambah',
			load: false,
			snackbar: false,
			error_message: '',
			color: '',
			search: null,
			dialog: false,
			dialogConfirm: false,
			fail: false,
			expanded: [],
			singleExpand: false,

			headers: [
				{
					text: 'ID Pemilik Mobil',
					align: 'start',
					sortable: true,
					value: 'id_pemilik_mobil',
				},
				{
					text: 'Nama Pemilik',
					value: 'nama_pemilik_mobil',
				},
				{
					text: 'Alamat Pemilik',
					value: 'alamat_pemilik_mobil',
				},
				{
					text: 'Nomor KTP',
					value: 'no_ktp_pemilik_mobil',
				},
				{
					text: 'Nomor Telepon Pemilik',
					value: 'nomor_telepon_pemilik_mobil',
				},
				{
					text: 'Periode Kontrak Mulai',
					value: 'periode_kontrak_mulai_mobil',
				},
				{
					text: 'Periode Kontrak Akhir',
					value: 'periode_kontrak_akhir_mobil',
				},
				{
					text: 'Tanggal Terakhir Servis',
					value: 'tanggal_terakhir_servis_mobil',
				},
				{
					text: '',
					value: 'actions',
				},
			],
			pemilik: new FormData(),
			pemiliks: [],
			form: {
				nama_pemilik_mobil: null,
				alamat_pemilik_mobil: null,
				nomor_telepon_pemilik_mobil: null,
				no_ktp_pemilik_mobil: null,
				periode_kontrak_mulai_mobil: null,
				periode_kontrak_akhir_mobil: null,
				tanggal_terakhir_servis_mobil: null,
			},
			deleteId: '',
			editId: '',
		};
	},

	methods: {
		setForm() {
			this.$refs.form.validate();
			if (this.inputType !== 'Tambah') {
				this.update();
			} else {
				this.save();
			}
		},
		//read data reviews
		readData() {
			var url = this.$api + '/pemilik-mobil';
			this.$http
				.get(url, {
					// headers: {
					//     Authorization: "Bearer " + localStorage.getItem("token"),
					// },
				})
				.then((response) => {
					this.pemiliks = response.data.data;
				});
		},
		readDataNamaPemilik() {
			var url = this.$api + '/namaPemilik';
			this.$http
				.get(url, {
					// headers: {
					//     Authorization: "Bearer " + localStorage.getItem("token"),
					// },
				})
				.then((response) => {
					this.pemiliks = response.data.data;
				});
		},
		save() {
			{
				this.pemilik.append(
					'nama_pemilik_mobil',
					this.form.nama_pemilik_mobil
				);
				this.pemilik.append(
					'alamat_pemilik_mobil',
					this.form.alamat_pemilik_mobil
				);
				this.pemilik.append(
					'nomor_telepon_pemilik_mobil',
					this.form.nomor_telepon_pemilik_mobil
				);
				this.pemilik.append(
					'no_ktp_pemilik_mobil',
					this.form.no_ktp_pemilik_mobil
				);
				this.pemilik.append(
					'periode_kontrak_mulai_mobil',
					this.form.periode_kontrak_mulai_mobil
				);
				this.pemilik.append(
					'periode_kontrak_akhir_mobil',
					this.form.periode_kontrak_akhir_mobil
				);
				this.pemilik.append(
					'tanggal_terakhir_servis_mobil',
					this.form.tanggal_terakhir_servis_mobil
				);

				var url = this.$api + '/pemilik-mobil';
				this.load = true;
				this.$http
					.post(url, this.pemilik, {
						// headers: {
						//     Authorization: "Bearer " + localStorage.getItem("token"),
						// },
					})
					.then((response) => {
						this.error_message = response.data.message;
						this.color = 'green';
						this.snackbar = true;
						this.load = true;
						this.close();
						this.readDataNamaPemilik(); // baca data
						this.resetForm();
					})
					.catch((error) => {
						this.error_message = error.response.data.message;
						this.color = 'red';
						this.snackbar = true;
						this.load = false;
					});
			}
		},
		//ubah data review
		update() {
			let newData = {
				nama_pemilik_mobil: this.form.nama_pemilik_mobil,
				alamat_pemilik_mobil: this.form.alamat_pemilik_mobil,
				nomor_telepon_pemilik_mobil:
					this.form.nomor_telepon_pemilik_mobil,
				no_ktp_pemilik_mobil: this.form.no_ktp_pemilik_mobil,
				periode_kontrak_mulai_mobil:
					this.form.periode_kontrak_mulai_mobil,
				periode_kontrak_akhir_mobil:
					this.form.periode_kontrak_akhir_mobil,
				tanggal_terakhir_servis_mobil:
					this.form.tanggal_terakhir_servis_mobil,
			};

			var url = this.$api + '/pemilik-mobil/' + this.editId;
			this.load = true;
			this.$http
				.post(url, newData, {
					// headers: {
					//     Authorization: "Bearer " + localStorage.getItem("token"),
					// },
				})
				.then((response) => {
					this.error_message = response.data.message;
					this.color = 'green';
					this.snackbar = true;
					this.load = false;
					this.close();
					this.readDataNamaPemilik(); // baca data
					this.resetForm();
					this.inputType = 'Tambah';
				})
				.catch((error) => {
					this.error_message = error.response.data.message;
					this.color = 'red';
					this.snackbar = true;
					this.load = false;
				});
		},
		//hapus data produk
		deleteData() {
			//menghapus data
			var url = this.$api + '/pemilik-mobil/' + this.deleteId;
			this.load = true;
			this.$http
				.delete(url, {
					// headers: {
					//     Authorization: "Bearer " + localStorage.getItem("token"),
					// },
				})
				.then((response) => {
					this.error_message = response.data.message;
					this.color = 'green';
					this.snackbar = true;
					this.load = false;
					this.close();
					this.readDataNamaPemilik(); // baca data
					this.resetForm();
					this.inputType = 'Tambah';
				})
				.catch((error) => {
					this.error_message = error.response.data.message;
					this.color = 'red';
					this.snackbar = true;
					this.load = false;
				});
		},
		editHandler(pemilik) {
			this.inputType = 'Ubah';
			this.editId = pemilik.id_pemilik_mobil;
			this.form.nama_pemilik_mobil = pemilik.nama_pemilik_mobil;
			this.form.alamat_pemilik_mobil = pemilik.alamat_pemilik_mobil;
			this.form.nomor_telepon_pemilik_mobil =
				pemilik.nomor_telepon_pemilik_mobil;
			this.form.no_ktp_pemilik_mobil = pemilik.no_ktp_pemilik_mobil;
			this.form.periode_kontrak_mulai_mobil =
				pemilik.periode_kontrak_mulai_mobil;
			this.form.periode_kontrak_akhir_mobil =
				pemilik.periode_kontrak_akhir_mobil;
			this.form.tanggal_terakhir_servis_mobil =
				pemilik.tanggal_terakhir_servis_mobil;
			this.dialog = true;
		},
		deleteHandler(item) {
			this.deleteId = item.id_pemilik_mobil;
			this.dialogConfirm = true;
		},
		close() {
			this.dialog = false;
			this.inputType = 'Tambah';
			this.dialogConfirm = false;
			this.readDataNamaPemilik();
		},
		cancel() {
			this.resetForm();
			this.readDataNamaPemilik();
			this.dialog = false;
			this.dialogConfirm = false;
			this.inputType = 'Tambah';
		},
		resetForm() {
			this.form = {
				nama_pemilik_mobil: null,
				alamat_pemilik_mobil: null,
				nomor_telepon_pemilik_mobil: null,
				no_ktp_pemilik_mobil: null,
				periode_kontrak_mulai_mobil: null,
				periode_kontrak_akhir_mobil: null,
				tanggal_terakhir_servis_mobil: null,
			};
		},
	},
	computed: {
		formTitle() {
			return this.inputType;
		},
	},
	mounted() {
		// this.readData();
		this.readDataNamaPemilik();
	},
};
</script>
