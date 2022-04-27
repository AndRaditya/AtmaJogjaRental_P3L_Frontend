<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Pegawai</h3>

        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
        </v-card-title>

        <v-data-table :headers="headers" :items="pegawais" :search="search" :single-expand="singleExpand"
            :expanded.sync="expanded" item-key="task" show-expand class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }" class="col-sm">
                <v-card color="#FFFFFF" dark style="margin: 30px" outlined>
                    <v-card-actions>
                        <v-list-item class="grow">
                            <v-btn color="primary" small class="mr-2" @click="editHandler(item)">
                                <v-icon class="mr-1" color="white"> mdi-pencil </v-icon>
                            </v-btn>
                            <v-btn color="error" small @click="deleteHandler(item)">
                                <v-icon class="mr-1" color="white"> mdi-delete </v-icon>
                            </v-btn>
                        </v-list-item>
                    </v-card-actions>
                </v-card>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" persistent width="1000px" content-class="elevation-0">
            <v-card style="margin-top: 150px">
                <v-card-title>
                    <span class="headline">{{ formTitle }} Pegawai</span>
                </v-card-title>
                <v-form ref="form" lazy-validation>
                    <v-card-text>
                        <v-container>
                            <v-text-field v-model="form.nama_pegawai" required filled label="Masukkan Nama Lengkap">
                            </v-text-field>
                            <v-text-field v-model="form.email_pegawai" required filled label="Masukkan E-Mail"
                                type="email">
                            </v-text-field>

                            <v-select :items="jabatans" v-model="form.id_jabatan" required filled
                                label="Masukkan Nama Jabatan" item-value="id_jabatan"
                                item-text="nama_jabatan">
                            </v-select>

                            <v-text-field filled v-model="form.nomor_telepon_pegawai" required
                                label="Masukkan Nomor Telepon" type="number" counter="13">
                            </v-text-field>
                            <v-textarea filled v-model="form.alamat_pegawai" required label="Masukkan Alamat">
                            </v-textarea>
                            <v-text-field filled v-model="form.tanggal_lahir_pegawai" required
                                label="Masukkan Tanggal Lahir" type="date">
                            </v-text-field>
                            <v-select filled v-model="form.jenis_kelamin_pegawai" :items="['Laki-laki', 'Perempuan']"
                                label="Masukkan Jenis Kelamin" required>
                            </v-select>

                            <v-file-input filled prepend-icon="mdi-camera" label="Upload Foto Pegawai" id="filePegawai"
                                ref="fileFotoPegawai">
                            </v-file-input>

                            <v-text-field v-model="form.password_pegawai"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]"
                                :type="show1 ? 'text' : 'password'" name="input-10-1" counter
                                @click:append="show1 = !show1" label="Masukkan Password" filled>
                            </v-text-field>
                        </v-container>
                    </v-card-text>

                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm">Send</v-btn>
                    </v-card-action>
                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>
                <v-card-text> Anda Yakin ingin menghapus pegawai ini? </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}
        </v-snackbar>
    </v-main>
</template>


<script>
    export default {
        name: "Pegawai",
        data() {
            return {
                inputType: "Tambah",
                load: false,
                snackbar: false,
                error_message: "",
                color: "",
                search: null,
                dialog: false,
                dialogConfirm: false,
                fail: false,
                expanded: [],
                singleExpand: false,
                show1: false,
                rules: {
                    required: value => !!value || 'Required.',
                },

                headers: [{
                        text: "ID Pegawai",
                        align: "start",
                        sortable: true,
                        value: "id_pegawai",
                    },
                    {
                        text: "Nama Pegawai",
                        value: "nama_pegawai",
                    },
                                        {
                        text: "Jabatan",
                        value: "nama_jabatan",
                    },
                    {
                        text: "Email Pegawai",
                        value: "email_pegawai"
                    },
                    {
                        text: "Nomor Telepon",
                        value: "nomor_telepon_pegawai"
                    },
                    {
                        text: "Alamat",
                        value: "alamat_pegawai"
                    },
                    {
                        text: "Tanggal Lahir",
                        value: "tanggal_lahir_pegawai"
                    },
                    {
                        text: "Jenis Kelamin",
                        value: "jenis_kelamin_pegawai"
                    },
                    // {
                    //     text: "Fasilitas Mobil",
                    //     value: "fasilitas_mobil"
                    // },
                    {
                        text: "",
                        value: "actions"
                    },
                ],
                pegawai: new FormData,
                pegawais: [],
                jabatans: [],
                form: {
                    nama_pegawai: null,
                    id_jabatan: null,
                    email_pegawai: null,
                    nomor_telepon_pegawai: null,
                    alamat_pegawai: null,
                    tanggal_lahir_pegawai: null,
                    jenis_kelamin_pegawai: null,
                    password_pegawai: null,
                    foto_pegawai: null
                },
                deleteId: "",
                editId: "",
            };
        },

        methods: {
            setForm() {
                this.$refs.form.validate();
                if (this.inputType !== "Tambah") {
                    this.update();
                } else {
                    this.save();
                }
            },
            save() {
                {
                    this.pegawai.append("nama_pegawai", this.form.nama_pegawai);
                    this.pegawai.append("id_jabatan", this.form.id_jabatan);
                    this.pegawai.append("email_pegawai", this.form.email_pegawai);
                    this.pegawai.append("nomor_telepon_pegawai", this.form.nomor_telepon_pegawai);
                    this.pegawai.append("alamat_pegawai", this.form.alamat_pegawai);
                    this.pegawai.append("tanggal_lahir_pegawai", this.form.tanggal_lahir_pegawai);
                    this.pegawai.append("jenis_kelamin_pegawai", this.form.jenis_kelamin_pegawai);
                    this.pegawai.append("password_pegawai", this.form.password_pegawai);
                    var uploadFoto = document.getElementById('filePegawai'),
                        dataFileFoto = uploadFoto.files[0];
                    this.pegawai.append('foto_pegawai', dataFileFoto);

                    var url = this.$api + "/pegawai";
                    this.load = true;
                    this.$http
                        .post(url, this.pegawai, {
                            // headers: {
                            //     Authorization: "Bearer " + localStorage.getItem("token"),
                            // },
                        })
                        .then((response) => {
                            this.error_message = response.data.message;
                            this.color = "green";
                            this.snackbar = true;
                            this.load = true;
                            this.close();
                            this.readData(); // baca data
                            this.resetForm();
                        })
                        .catch((error) => {
                            this.error_message = error.response.data.message;
                            this.color = "red";
                            this.snackbar = true;
                            this.load = false;
                        });
                }
            },
            //read data reviews
            readData() {
                var url = this.$api + "/pegawai";
                this.$http
                    .get(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.pegawais = response.data.data;
                    });
            },

            readDataJabatan() {
                var url = this.$api + "/jabatan-pegawai";
                this.$http
                    .get(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.jabatans = response.data.data;
                    });
            },
            //ubah data review
            update() {
                // let newData = {
                //     nama_pegawai: this.form.nama_pegawai,
                //     // id_pemilik_mobil: this.form.id_pemilik_mobil,
                //     nomor_telepon_pegawai: this.form.nomor_telepon_pegawai,
                //     alamat_pegawai: this.form.tanggal_lahir_pegawai,
                //     jenis_kelamin_pegawai: this.form.jenis_kelamin_pegawai,
                //     password_pegawai: this.form.password_pegawai,
                // };

                var data = new FormData(),
                    uploadFoto = document.getElementById('filePegawai'),
                    dataFileFoto = uploadFoto.files[0];

                data.pegawai.append("nama_pegawai", this.form.nama_pegawai);
                data.pegawai.append("email_pegawai", this.form.email_pegawai);
                data.pegawai.append("nomor_telepon_pegawai", this.form.nomor_telepon_pegawai);
                data.pegawai.append("alamat_pegawai", this.form.alamat_pegawai);
                data.pegawai.append("jenis_kelamin_pegawai", this.form.jenis_kelamin_pegawai);
                data.pegawai.append("password_pegawai", this.form.password_pegawai);
                if (dataFileFoto) {
                    data.append('foto_pegawai', dataFileFoto);
                }

                var url = this.$api + "/pegawai/" + this.editId;
                this.load = true;
                this.$http
                    .put(url, data, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.close();
                        this.readData(); // baca data
                        this.resetForm();
                        this.inputType = "Tambah";
                    })
                    .catch((error) => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    });
            },
            //hapus data produk
            deleteData() {
                //menghapus data
                var url = this.$api + "/pegawai/" + this.deleteId;
                this.load = true;
                this.$http
                    .delete(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.close();
                        this.readData(); // baca data
                        this.resetForm();
                        this.inputType = "Tambah";
                    })
                    .catch((error) => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    });
            },
            editHandler(pegawai) {
                this.inputType = "Ubah";
                this.editId = pegawai.id_pegawai;
                this.form.nama_pegawai = pegawai.nama_pegawai;
                this.form.id_jabatan = pegawai.id_jabatan;
                this.form.email_pegawai = pegawai.email_pegawai;
                this.form.nomor_telepon_pegawai = pegawai.nomor_telepon_pegawai;
                this.form.alamat_pegawai = pegawai.alamat_pegawai;
                this.form.tanggal_lahir_pegawai = pegawai.tanggal_lahir_pegawai;
                this.form.jenis_kelamin_pegawai = pegawai.jenis_kelamin_pegawai;
                this.form.password_pegawai = pegawai.password_pegawai;
                this.form.foto_pegawai = pegawai.foto_pegawai;

                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.id_pegawai;
                this.dialogConfirm = true;
            },
            close() {
                this.dialog = false;
                this.inputType = "Tambah";
                this.dialogConfirm = false;
                this.readData();
            },
            cancel() {
                this.resetForm();
                this.readData();
                this.dialog = false;
                this.dialogConfirm = false;
                this.inputType = "Tambah";
            },
            resetForm() {
                this.form = {
                    nama_pegawai: null,
                    id_jabatan: null,
                    email_pegawai: null,
                    nomor_telepon_pegawai: null,
                    alamat_pegawai: null,
                    tanggal_lahir_pegawai: null,
                    jenis_kelamin_pegawai: null,
                    password_pegawai: null,
                    foto_pegawai: null
                };
            },
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readData();
            this.readDataJabatan();
        },
    };
</script>