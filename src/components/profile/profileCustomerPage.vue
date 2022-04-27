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
                                    <v-text-field v-model="nama_customer" required filled label="Nama Customer"
                                        :rules="namaRules">
                                    </v-text-field>
                                    <v-text-field v-model="email_customer" required filled label="Email"
                                        :rules="emailRules">
                                    </v-text-field>
                                    <v-text-field v-model="nomor_telepon_customer" required filled label="Nomor Telepon"
                                        type="number" counter="13" :rules="noTelpRules">
                                    </v-text-field>
                                    <v-textarea v-model="alamat_customer" required filled label="Alamat Customer"
                                        :rules="alamatRules">
                                    </v-textarea>
                                    <v-text-field v-model="tanggal_lahir_customer" required filled
                                        label="Masukkan Tanggal Lahir" type="date" :rules="tanggalLahirRules">
                                    </v-text-field>
                                    <v-select filled v-model="jenis_kelamin_customer"
                                        :items="['Laki-laki', 'Perempuan']" label="Jenis Kelamin" required
                                        :rules="jenisKelaminRules">
                                    </v-select>
                                    <v-text-field v-model="no_sim_customer" filled label="Nomor SIM" type="number"
                                        counter>
                                    </v-text-field>
                                    <v-text-field v-model="no_ktp_customer" required filled label="Nomor KTP"
                                        type="number" counter="16" :rules="noKTPRules">
                                    </v-text-field>
                                    <v-text-field v-model="password_customer" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
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
        name: "ProfileCustomer",
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

                nama_customer: localStorage.getItem('nama_customer'),
                email_customer: localStorage.getItem('email_login'),
                nomor_telepon_customer: localStorage.getItem('nomor_telepon_customer'),
                alamat_customer: localStorage.getItem('alamat_customer'),
                tanggal_lahir_customer: localStorage.getItem('tanggal_lahir_customer'),
                jenis_kelamin_customer: localStorage.getItem('jenis_kelamin_customer'),
                no_sim_customer: localStorage.getItem('no_sim_customer'),
                no_ktp_customer: localStorage.getItem('no_ktp_customer'),
                // password_customer: localStorage.getItem('password_customer'),

                user: new FormData,
                users: [],
                deleteId: '',
                editId: localStorage.getItem('id_customer_increment'),

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
                noKTPRules: [
                    (v) => !!v || 'Nomor KTP tidak boleh kosong',
                ],
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong',
                ],
                rules: {
                    required: value => !!value || 'Required.',
                },
            };
        },
        methods: {
            //read data
            readData() {
                var url = this.$api + '/customer/' + this.editId;
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
                let newData = {
                    nama_customer: this.nama_customer,
                    nomor_telepon_customer: this.nomor_telepon_customer,
                    alamat_customer: this.alamat_customer,
                    email_customer: this.email_customer,
                    tanggal_lahir_customer: this.tanggal_lahir_customer,
                    jenis_kelamin_customer: this.jenis_kelamin_customer,
                    no_sim_customer: this.no_sim_customer,
                    no_ktp_customer: this.no_ktp_customer,
                    password_customer: this.password_customer
                };
                var url = this.$api + '/updateCustomerSendiri/' + this.editId;
                this.load = true;
                this.$http.post(url, newData, {
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
                localStorage.setItem('nama_customer', this.nama_customer);
                localStorage.setItem('email_customer', this.email_customer);
                localStorage.setItem('nomor_telepon_customer', this.nomor_telepon_customer);
                localStorage.setItem('alamat_customer', this.alamat_customer);
                localStorage.setItem('tanggal_lahir_customer', this.tanggal_lahir_customer);
                localStorage.setItem('jenis_kelamin_customer', this.jenis_kelamin_customer);
                localStorage.setItem('no_sim_customer', this.no_sim_customer);
                localStorage.setItem('no_ktp_customer', this.no_ktp_customer);
                localStorage.setItem('password_customer', this.password_customer);
            },

            setFormUserActive() {
                this.nama_customer = localStorage.getItem('nama_customer');
                this.email_customer = localStorage.getItem('email_login');
                this.nomor_telepon_customer = localStorage.getItem('nomor_telepon_customer');
                this.alamat_customer = localStorage.getItem('alamat_customer');
                this.tanggal_lahir_customer = localStorage.getItem('tanggal_lahir_customer');
                this.jenis_kelamin_customer = localStorage.getItem('jenis_kelamin_customer');
                this.no_sim_customer = localStorage.getItem('no_sim_customer');
                this.no_ktp_customer = localStorage.getItem('no_ktp_customer');
                this.password_customer = localStorage.getItem('password_customer');
            },
            resetForm() {
                this.nama_customer = null,
                this.email_customer = null,
                this.nomor_telepon_customer = null,
                this.alamat_customer = null,
                this.tanggal_lahir_customer = null,
                this.jenis_kelamin_customer = null,
                this.no_sim_customer = null,
                this.no_ktp_customer = null,
                this.password_customer = null
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