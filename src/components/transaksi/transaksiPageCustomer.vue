<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Transaksi</h3>

        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
        </v-card-title>

        <v-data-table :headers="headers" :items="transaksis" :search="search" :single-expand="singleExpand"
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
                    <span class="headline">{{ formTitle }} Transaksi</span>
                </v-card-title>
                <v-form ref="form" lazy-validation>
                    <v-card-text>
                        <v-container>
                            <v-text-field v-model="form.tanggal_transaksi" required filled
                                label="Masukkan Tanggal Transaksi" type="date">
                            </v-text-field>
                            <!-- 
                            <v-select :items="customers" v-model="form.id_customer_increment" required filled
                                label="Masukkan Nama Customer" item-value="id_customer_increment"
                                item-text="id_customer - nama_customer">
                            </v-select> -->

                            <v-select icon="mdi-clear" clearable :items="customers" v-model="form.id_customer_increment"
                                required filled label="Masukkan Nama Customer" item-value="id_customer_increment"> //
                                Don't forget your props
                                <template slot="selection" slot-scope="data">
                                    <!-- HTML that describe how select should render selected items -->
                                    {{ data.item.id_customer }} - {{ data.item.nama_customer }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    <!-- HTML that describe how select should render items when the select is open -->
                                    {{ data.item.id_customer }} - {{ data.item.nama_customer }}
                                </template>
                            </v-select>

                            <v-select icon="mdi-clear" clearable filled v-model="form.metode_pembayaran"
                                :items="['Transfer', 'Cash']" label="Masukkan Metode Pembayaran" required>
                            </v-select>

                            <!-- <v-select :items="promos" v-model="form.id_promo" required filled
                                label="Masukkan Kode Promo" item-value="id_promo"
                                item-text="kode_promo - diskon - status_promo">
                            </v-select> -->

                            <v-select icon="mdi-clear" clearable :items="promos" v-model="form.id_promo" required filled
                                label="Masukkan Kode Promo" item-value="id_promo"> // Don't forget your props
                                <template slot="selection" slot-scope="data">
                                    <!-- HTML that describe how select should render selected items -->
                                    {{ data.item.kode_promo }} - {{ data.item.diskon }}% - {{ data.item.status_promo }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    <!-- HTML that describe how select should render items when the select is open -->
                                    {{ data.item.kode_promo }} - {{ data.item.diskon }}% - {{ data.item.status_promo }}
                                </template>
                            </v-select>

                            <v-select icon="mdi-clear" clearable :items="pegawais" v-model="form.id_pegawai" required
                                filled label="Masukkan Nama Pegawai yang melayani" item-value="id_pegawai"
                                item-text="nama_pegawai">
                            </v-select>

                            <v-file-input filled prepend-icon="mdi-camera" label="Upload Bukti Transfer" id="fileBukti"
                                ref="fileBuktiTransfer">
                            </v-file-input>
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
                <v-card-text> Anda Yakin ingin menghapus transaksi ini? </v-card-text>
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
        name: "transaksiCustomer",
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

                headers: [{
                        text: "No",
                        align: "start",
                        sortable: true,
                        value: "id_transaksi_increment",
                    },
                    {
                        text: "ID Transaksi",
                        value: "id_transaksi_mobil",
                    },
                    {
                        text: "Tanggal Transaksi",
                        value: "tanggal_transaksi",
                    },
                    {
                        text: "Nama Customer",
                        value: "nama_customer"
                    },
                    {
                        text: "Metode Pembayaran",
                        value: "metode_pembayaran"
                    },
                    {
                        text: "Status Transaksi",
                        value: "status_transaksi"
                    },
                    {
                        text: "Promo",
                        value: "kode_promo"
                    },
                    {
                        text: "Pegawai",
                        value: "nama_pegawai"
                    },
                    {
                        text: "",
                        value: "actions"
                    },
                ],
                transaksi: new FormData,
                transaksis: [],
                promos: [],
                customers: [],
                pegawais: [],
                form: {
                    tanggal_transaksi: null,
                    id_customer_increment: null,
                    metode_pembayaran: null,
                    id_promo: null,
                    id_pegawai: null,
                    bukti_transfer: null
                },
                deleteId: "",
                editId: "",
                customerId: localStorage.getItem('id_customer_increment'),
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
                    this.transaksi.append("tanggal_transaksi", this.form.tanggal_transaksi);
                    this.transaksi.append("id_customer_increment", this.form.id_customer_increment);
                    this.transaksi.append("metode_pembayaran", this.form.metode_pembayaran);
                    if (this.form.id_promo > 0) {
                        this.transaksi.append("id_promo", this.form.id_promo);
                    } else {
                        this.transaksi.append("id_promo", 8);
                    }
                    this.transaksi.append("id_pegawai", this.form.id_pegawai);
                    var uploadFoto = document.getElementById('fileBukti'),
                        dataFileFoto = uploadFoto.files[0];
                    this.transaksi.append('bukti_transfer', dataFileFoto);

                    var url = this.$api + "/transaksi";
                    this.load = true;
                    this.$http
                        .post(url, this.transaksi, {
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
                var url = this.$api + "/transaksi";
                this.$http
                    .get(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.transaksis = response.data.data;
                    });
            },
            readDataPromo() {
                var url = this.$api + "/statusPromo";
                this.$http
                    .get(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.promos = response.data.data;
                    });
            },
            readDataCustomer() {
                var url = this.$api + '/customer/' + this.customerId;
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
            readDataPegawai() {
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
            update() {
                var data = new FormData(),
                    uploadFoto = document.getElementById('fileBukti'),
                    dataFileFoto = uploadFoto.files[0];

                data.append("tanggal_transaksi", this.form.tanggal_transaksi);
                data.append("id_customer_increment", this.form.id_customer_increment);
                data.append("metode_pembayaran", this.form.metode_pembayaran);
                if (this.form.id_promo > 0) {
                    data.append("id_promo", this.form.id_promo);
                } else {
                    data.append("id_promo", 8);
                }
                data.append("id_pegawai", this.form.id_pegawai);
                if (dataFileFoto) {
                    data.append('foto_pegawai', dataFileFoto);
                }

                var url = this.$api + "/transaksi/" + this.editId;
                this.load = true;
                this.$http
                    .post(url, data, {
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
                var url = this.$api + "/transaksi/" + this.deleteId;
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
            editHandler(transaksi) {
                this.inputType = "Ubah";
                this.editId = transaksi.id_transaksi_increment;
                this.form.tanggal_transaksi = transaksi.tanggal_transaksi;
                this.form.id_customer_increment = transaksi.id_customer_increment;
                this.form.metode_pembayaran = transaksi.metode_pembayaran;
                this.form.id_promo = transaksi.id_promo;
                this.form.id_pegawai = transaksi.id_pegawai;
                this.form.bukti_transfer = transaksi.bukti_transfer;

                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.id_transaksi_increment;
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
            // clearPromo(){
            //     this.openModal(this.form.id_promo);
            //     this.form.id_promo = 0;
            // },
            resetForm() {
                this.form = {
                    tanggal_transaksi: null,
                    id_customer_increment: null,
                    metode_pembayaran: null,
                    id_promo: null,
                    id_pegawai: null,
                    bukti_transfer: null
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
            this.readDataPromo();
            this.readDataCustomer();
            this.readDataPegawai();
        },
    };
</script>