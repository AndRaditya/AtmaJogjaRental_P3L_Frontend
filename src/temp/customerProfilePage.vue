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
                                    <v-text-field label="ID Customer" v-model="id_customer" required
                                        disabled>
                                    </v-text-field>
                                    <v-text-field label="Nama" v-model="nama_customer" :rules="nameRules" required
                                        disabled>
                                    </v-text-field>
                                    <v-text-field label="Email" v-model="email_customer" :rules="emailRules" required
                                        disabled>
                                    </v-text-field>
                                    <v-text-field label="Nomor Telepon" v-model="nomor_telepon_customer"
                                        :rules="noTelpRules" required>
                                    </v-text-field>
                                    <v-text-field label="Alamat" v-model="alamat_customer" :rules="noTelpRules"
                                        required>
                                    </v-text-field>
                                    <v-text-field label="Tanggal Lahir" v-model="tanggal_lahir_customer"
                                        :rules="tglRules" required type="date">
                                    </v-text-field>
                                    <v-text-field label="Nomor SIM" v-model="no_sim_customer">
                                    </v-text-field>
                                    <v-text-field label="Nomor KTP" v-model="no_ktp_customer" :rules="noKTPRules" required>
                                    </v-text-field>
                                    <v-text-field label="Password" v-model="password_customer"
                                        :rules="passwordRules" required type="password">
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
        name: "Profile",
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

                id_customer: localStorage.getItem('id_customer'),
                nama_customer: localStorage.getItem('nama_customer'),
                email_customer: localStorage.getItem('email_customer'),
                nomor_telepon_customer: localStorage.getItem('nomor_telepon_customer'),
                alamat_customer: localStorage.getItem('alamat_customer'),
                tanggal_lahir_customer: localStorage.getItem('tanggal_lahir_customer'),
                no_sim_customer: localStorage.getItem('no_sim_customer'),
                no_ktp_customer: localStorage.getItem('no_ktp_customer'),
                password_customer: localStorage.getItem('password_customer'),

                customer: new FormData,
                customers: [],
                deleteId: '',
                editId: localStorage.getItem('id_customer_increment'),

                nameRules: [
                    (v) => !!v || 'Nama tidak boleh kosong',
                ],
                emailRules: [
                    (v) => !!v || 'Email tidak boleh kosong',
                ],
                noTelpRules: [
                    (v) => !!v || 'Nomor Telepon tidak boleh kosong',
                ],
                tglRules: [
                    (v) => !!v || 'Tanggal Lahir tidak boleh kosong',
                ],
                noKTPRules: [
                    (v) => !!v || 'Nomor KTP tidak boleh kosong',
                ],
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong',
                ]
            };
        },
        methods: {
            //read data
            readData() {
                var url = this.$api + '/user';
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.users = response.data.data;
                })
            },

            //update data
            update() {
                let newData = {
                    namaLengkap: this.namaLengkap,
                    email: this.email,
                    username: this.username,
                    noTelp: this.noTelp
                };
                var url = this.$api + '/user/' + this.editId;
                this.load = true;
                this.$http.put(url, newData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
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
                localStorage.setItem('namaLengkap', this.namaLengkap);
                localStorage.setItem('email', this.email);
                localStorage.setItem('username', this.username);
                localStorage.setItem('noTelp', this.noTelp);
            },

            setFormUserActive() {
                this.namaLengkap = localStorage.getItem('namaLengkap');
                this.email = localStorage.getItem('email');
                this.username = localStorage.getItem('username');
                this.noTelp = localStorage.getItem('noTelp');
            },
            resetForm() {
                this.namaLengkap = null,
                    this.email = null,
                    this.username = null,
                    this.noTelp = null
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