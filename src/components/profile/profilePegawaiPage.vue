<template>
    <v-main class="list" style="margin-top: 20px">

        <h3 class="text-h3 font-weight-medium mb-5" style="margin-top: 150px">Profile</h3>
        <v-container fluid fill-height class="posisinya" style="margin-top: -50px">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field v-model="nama_pegawai" required filled label="Nama Pegawai"
                                        :rules="namaRules">
                                    </v-text-field>
                                    <v-text-field v-model="email_pegawai" required filled label="Email"
                                        :rules="emailRules">
                                    </v-text-field>
                                    <v-text-field v-model="nomor_telepon_pegawai" required filled label="Nomor Telepon"
                                        type="number" counter="13" :rules="noTelpRules">
                                    </v-text-field>
                                    <v-textarea v-model="alamat_pegawai" required filled label="Alamat Customer"
                                        :rules="alamatRules">
                                    </v-textarea>
                                    <v-text-field v-model="tanggal_lahir_pegawai" required filled
                                        label="Masukkan Tanggal Lahir" type="date" :rules="tanggalLahirRules">
                                    </v-text-field>
                                    <v-select filled v-model="jenis_kelamin_pegawai"
                                        :items="['Laki-laki', 'Perempuan']" label="Jenis Kelamin" required
                                        :rules="jenisKelaminRules">
                                    </v-select>
                                    <v-file-input filled prepend-icon="mdi-camera" label="Upload Foto Pegawai" id="filePegawai"
                                        ref="fileFotoPegawai">
                                    </v-file-input>
                                    <v-text-field v-model="password_pegawai" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[rules.required]" :type="show1 ? 'text' : 'password'"
                                            name="input-10-1" counter
                                            @click:append="show1 = !show1" label="Masukkan Password" filled>
                                    </v-text-field>

                                    <v-layout>
                                        <v-layout justify-end>
                                            <v-btn class="mr-2" @click="update" color="success"
                                                :class=" { 'grey darken-1 white--text' : valid, disabled: !valid }">
                                                Edit Data </v-btn>
                                            <!-- <v-btn @click="resetForm" class="red darken-3 white--text">Clear</v-btn> -->
                                        </v-layout>
                                    </v-layout>
                                </v-form>
                            </div>

                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<style>
    @import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");

    .grey--text {
        font-family: "Jolly Lodger";
    }

    .posisinya {
        left: 0;
        right: 0;
    }
</style>

<script>
    export default {
        name: "ProfilePegawai",
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

                nama_pegawai: localStorage.getItem('nama_pegawai'),
                email_pegawai: localStorage.getItem('email_pegawai'),
                nomor_telepon_pegawai: localStorage.getItem('nomor_telepon_pegawai'),
                alamat_pegawai: localStorage.getItem('alamat_pegawai'),
                tanggal_lahir_pegawai: localStorage.getItem('tanggal_lahir_pegawai'),
                jenis_kelamin_pegawai: localStorage.getItem('jenis_kelamin_pegawai'),
                foto_pegawai: localStorage.getItem('foto_pegawai'),

                pegawai: new FormData,
                pegawais: [],
                deleteId: '',
                editId: localStorage.getItem('id_pegawai'),

                namaRules: [
                    (v) => !!v || 'Nama tidak boleh kosong',
                ],
                emailRules: [
                    (v) => !!v || 'Email tidak boleh kosong',
                ],
                noTelpRules: [
                    (v) => !!v || 'Nomor Telepon tidak boleh kosong',
                ],
                alamatRules: [
                    (v) => !!v || 'Alamat tidak boleh kosong',
                ],
                tanggalLahirRules: [
                    (v) => !!v || 'Tanggal Lahir tidak boleh kosong',
                ],
                jenisKelaminRules: [
                    (v) => !!v || 'Jenis Kelamin tidak boleh kosong',
                ],
                rules: {
                    required: value => !!value || 'Required.',
                },
            };
        },
        methods: {
            //read data
            readData() {
                var url = this.$api + '/pegawai/' + this.editId;
                this.$http.get(url, {
                    // headers: {
                    //     'Authorization': 'Bearer ' + localStorage.getItem('id_customer_increment')
                    // }
                }).then(response => {
                    this.users = response.data.data;
                })
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

                data.pegawai.append("nama_pegawai", this.form.nama_pegawai);
                data.pegawai.append("email_pegawai", this.form.email_pegawai);
                data.pegawai.append("nomor_telepon_pegawai", this.form.nomor_telepon_pegawai);
                data.pegawai.append("alamat_pegawai", this.form.alamat_pegawai);
                data.pegawai.append("tanggal_lahir_pegawai", this.form.tanggal_lahir_pegawai);
                data.pegawai.append("jenis_kelamin_pegawai", this.form.jenis_kelamin_pegawai);
                data.pegawai.append("password_pegawai", this.form.password_pegawai);
                if (dataFileFoto) {
                    data.append('foto_pegawai', dataFileFoto);
                }

                var url = this.$api + '/updateCustomerSendiri/' + this.editId;
                this.load = true;
                this.$http.post(url, data, {
                    // headers: {
                    //     'Authorization': 'Bearer ' + localStorage.getItem('token')
                    // }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.close();
                    this.readData();
                    // this.resetForm();
                    this.inputType = 'Tambah';
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = 'red';
                    this.snackbar = true;
                    this.load = false;
                });
            },

            close() {
                this.setUserLocalActive();
                this.setFormUserActive();
                this.dialog = false;
            },

            setUserLocalActive() {
                localStorage.setItem('nama_pegawai', this.nama_pegawai);
                localStorage.setItem('email_pegawai', this.email_pegawai);
                localStorage.setItem('nomor_telepon_pegawai', this.nomor_telepon_pegawai);
                localStorage.setItem('alamat_pegawai', this.alamat_pegawai);
                localStorage.setItem('tanggal_lahir_pegawai', this.tanggal_lahir_pegawai);
                localStorage.setItem('jenis_kelamin_pegawai', this.jenis_kelamin_pegawai);
                localStorage.setItem('foto_pegawai', this.foto_pegawai);
                localStorage.setItem('password_pegawai', this.password_pegawai);
            },

            setFormUserActive() {
                this.nama_pegawai = localStorage.getItem('nama_pegawai');
                this.email_pegawai = localStorage.getItem('email_pegawai');
                this.nomor_telepon_pegawai = localStorage.getItem('nomor_telepon_pegawai');
                this.alamat_pegawai = localStorage.getItem('alamat_pegawai');
                this.tanggal_lahir_pegawai = localStorage.getItem('tanggal_lahir_pegawai');
                this.jenis_kelamin_pegawai = localStorage.getItem('jenis_kelamin_pegawai');
                this.foto_pegawai = localStorage.getItem('foto_pegawai');
                this.password_pegawai = localStorage.getItem('password_pegawai');
            },
            resetForm() {
                this.nama_pegawai = null,
                this.email_pegawai = null,
                this.nomor_telepon_pegawai = null,
                this.alamat_pegawai = null,
                this.tanggal_lahir_pegawai = null,
                this.jenis_kelamin_pegawai = null,
                this.foto_pegawai = null,
                this.password_pegawai = null
            },
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readData();
        },
    };
</script>