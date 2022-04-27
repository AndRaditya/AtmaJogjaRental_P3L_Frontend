<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Customer</h3>

        <!-- <v-card> -->
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <!-- <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn> -->
        </v-card-title>
        <!-- </v-card> -->


        <v-data-table :headers="headers" :items="customers" :search="search" :single-expand="singleExpand"
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
                    <span class="headline">{{ formTitle }} Customer</span>
                </v-card-title>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-text>
                        <v-container>
                            <v-text-field v-model="form.nama_customer" required filled label="Masukkan Nama Customer">
                            </v-text-field>
                            <v-text-field v-model="form.nomor_telepon_customer" required filled
                                label="Masukkan Nomor Telepon" type="number" counter="13">
                            </v-text-field>
                            <v-textarea v-model="form.alamat_customer" required filled label="Masukkan Alamat Customer">
                            </v-textarea>
                            <v-text-field v-model="form.email_customer" required filled label="Masukkan Email">
                            </v-text-field>
                            <v-text-field v-model="form.tanggal_lahir_customer" required filled
                                label="Masukkan Tanggal Lahir" type="date">
                            </v-text-field>
                            <v-select filled v-model="form.jenis_kelamin_customer" :items="['Laki-laki', 'Perempuan']"
                                label="Masukkan Jenis Kelamin" required>
                            </v-select>
                            <v-text-field v-model="form.no_sim_customer" filled label="Masukkan Nomor SIM" type="number"
                                counter>
                            </v-text-field>
                            <v-text-field v-model="form.no_ktp_customer" required filled label="Masukkan Nomor KTP"
                                type="number" counter="16">
                            </v-text-field>
                            <v-select icon="mdi-clear" clearable filled v-model="form.status_dokumen"
                                :items="['Menunggu verifikasi oleh Customer Service', 'Sudah Terverifikasi']"
                                label="Masukkan Status Dokumen" required>
                            </v-select>
                            <v-text-field v-model="form.password_customer"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
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
                <v-card-text> Anda Yakin ingin menghapus jadwal ini? </v-card-text>
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
        name: "CustomerPegawai",
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
                        text: "No",
                        align: "start",
                        sortable: true,
                        value: "id_customer_increment",
                    },
                    {
                        text: "ID Customer",
                        value: "id_customer",
                    },
                    {
                        text: "Nama Customer",
                        value: "nama_customer",
                    },
                    {
                        text: "Nomor Telepon",
                        value: "nomor_telepon_customer",
                    },
                    {
                        text: "Alamat",
                        value: "alamat_customer",
                    },
                    {
                        text: "Jenis Kelamin",
                        value: "jenis_kelamin_customer",
                    },
                    {
                        text: "Email",
                        value: "email_customer",
                    },
                    {
                        text: "Nomor SIM",
                        value: "no_sim_customer",
                    },
                    {
                        text: "Nomor KTP",
                        value: "no_ktp_customer",
                    },
                    {
                        text: "Status Dokumen",
                        value: "status_dokumen",
                    },
                    {
                        text: "",
                        value: "actions"
                    },

                ],
                customer: new FormData,
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
                    password_customer: null,
                    status_dokumen: null
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
            //read data reviews
            readData() {
                var url = this.$api + "/customer";
                this.$http
                    .get(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.customers = response.data.data;
                    });
            },
            //ubah data review
            update() {
                let newData = {
                    nama_customer: this.form.nama_customer,
                    nomor_telepon_customer: this.form.nomor_telepon_customer,
                    alamat_customer: this.form.alamat_customer,
                    email_customer: this.form.email_customer,
                    tanggal_lahir_customer: this.form.tanggal_lahir_customer,
                    jenis_kelamin_customer: this.form.jenis_kelamin_customer,
                    no_sim_customer: this.form.no_sim_customer,
                    no_ktp_customer: this.form.no_ktp_customer,
                    status_dokumen: this.form.status_dokumen,
                    password_customer: this.form.password_customer
                };

                var url = this.$api + "/customer/" + this.editId;
                this.load = true;
                this.$http
                    .put(url, newData, {
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
                var url = this.$api + "/customer/" + this.deleteId;
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
            editHandler(customer) {
                this.inputType = "Ubah";
                this.editId = customer.id_customer_increment;
                this.form.nama_customer = customer.nama_customer;
                this.form.nomor_telepon_customer = customer.nomor_telepon_customer;
                this.form.alamat_customer = customer.alamat_customer;
                this.form.email_customer = customer.email_customer;
                this.form.jenis_kelamin_customer = customer.jenis_kelamin_customer;
                this.form.tanggal_lahir_customer = customer.tanggal_lahir_customer;
                this.form.no_sim_customer = customer.no_sim_customer;
                this.form.no_ktp_customer = customer.no_ktp_customer;
                this.form.status_dokumen = customer.status_dokumen;
                // this.form.password_customer = customer.password_customer;
                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.id_customer_increment;
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
                    nama_customer: null,
                    nomor_telepon_customer: null,
                    alamat_customer: null,
                    email_customer: null,
                    jenis_kelamin_customer: null,
                    tanggal_lahir_customer: null,
                    no_sim_customer: null,
                    no_ktp_customer: null,
                    password_customer: null,
                    status_dokumen: null
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
        },
    };
</script>