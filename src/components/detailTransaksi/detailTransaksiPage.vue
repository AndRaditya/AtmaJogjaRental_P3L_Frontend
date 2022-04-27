<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Detail Transaksi</h3>

        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
        </v-card-title>

        <v-data-table :headers="headers" :items="detail_transaksis" :search="search" :single-expand="singleExpand"
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
                    <span class="headline">{{ formTitle }} Detail Transaksi</span>
                </v-card-title>
                <v-form ref="form" lazy-validation>
                    <v-card-text>
                        <v-container>

                            <v-select icon="mdi-clear" clearable :items="transaksis" v-model="form.id_transaksi_increment" required filled
                                label="Masukkan Transaksi" item-value="id_transaksi_increment"> 
                                // Don't forget your props
                                <template slot="selection" slot-scope="data">
                                    <!-- HTML that describe how select should render selected items -->
                                    {{ data.item.tanggal_transaksi }} - {{ data.item.id_transaksi_mobil }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    <!-- HTML that describe how select should render items when the select is open -->
                                    {{ data.item.tanggal_transaksi }} - {{ data.item.id_transaksi_mobil }}
                                </template>
                            </v-select>

                            <v-select icon="mdi-clear" clearable :items="drivers" v-model="form.id_driver_increment" required filled
                                label="Masukkan Driver" item-value="id_driver_increment"> // Don't forget your props
                                <template slot="selection" slot-scope="data">
                                    <!-- HTML that describe how select should render selected items -->
                                    {{ data.item.id_driver }} - {{ data.item.nama_driver }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    <!-- HTML that describe how select should render items when the select is open -->
                                    {{ data.item.id_driver }} - {{ data.item.nama_driver }}
                                </template>
                            </v-select>

                            <v-select icon="mdi-clear" clearable :items="aset_mobils" v-model="form.id_aset_mobil" required filled
                                label="Masukkan Mobil" item-value="id_aset_mobil"> // Don't forget your props
                                <template slot="selection" slot-scope="data">
                                    <!-- HTML that describe how select should render selected items -->
                                    {{ data.item.plat_nomor_mobil }} - {{ data.item.nama_mobil }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    <!-- HTML that describe how select should render items when the select is open -->
                                    {{ data.item.plat_nomor_mobil }} - {{ data.item.nama_mobil }}
                                </template>
                            </v-select>

                            <v-text-field v-model="form.tanggal_waktu_mulaiSewa" required filled
                                label="Masukkan Tanggal Waktu Mulai Sewa" type="datetime-local">
                            </v-text-field>

                            <v-text-field v-model="form.tanggal_waktu_selesaiSewa" required filled
                                label="Masukkan Tanggal Waktu Selesai Sewa" type="datetime-local">
                            </v-text-field>

                            <v-text-field v-model="form.tanggal_pengembalian" required filled
                                label="Masukkan Tanggal Waktu Pengembalian" type="datetime-local">
                            </v-text-field>

                            <v-select icon="mdi-clear" clearable filled v-model="form.rating_driver" :items="['5', '4', '3', '2', '1']"
                                label="Masukkan Rating Driver" required>
                            </v-select>

                            <!-- <v-select :items="promos" v-model="form.id_promo" required filled
                                label="Masukkan Kode Promo" item-value="id_promo"
                                item-text="kode_promo - diskon - status_promo">
                            </v-select> -->
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
                <v-card-text> Anda Yakin ingin menghapus detail transaksi ini? </v-card-text>
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
        name: "DetailTransaksiPegawai",
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
                        value: "id_detailTrs_increment",
                    },
                    {
                        text: "ID Transaksi",
                        value: "id_transaksi_mobil",
                    },
                    {
                        text: "ID Detail Transaksi",
                        value: "id_detail_transaksi_mobil",
                    },
                    {
                        text: "Tanggal Transaksi",
                        value: "tanggal_transaksi",
                    },
                    {
                        text: "Nama Driver",
                        value: "nama_driver",
                    },
                    {
                        text: "Plat Nomor",
                        value: "plat_nomor_mobil",
                    },
                    {
                        text: "Nama Mobil",
                        value: "nama_mobil",
                    },
                    {
                        text: "Jenis Transaksi",
                        value: "jenis_transaksi"
                    },
                    {
                        text: "Tanggal Mulai",
                        value: "tanggal_waktu_mulaiSewa"
                    },
                    {
                        text: "Tanggal Selesai",
                        value: "tanggal_waktu_selesaiSewa"
                    },
                    {
                        text: "Tanggal Pengembalian",
                        value: "tanggal_pengembalian"
                    },
                    {
                        text: "Rating Driver",
                        value: "rating_driver"
                    },
                    {
                        text: "Denda",
                        value: "denda"
                    },
                    {
                        text: "Total Pembayaran",
                        value: "jumlah_pembayaran"
                    },
                    {
                        text: "",
                        value: "actions"
                    },
                ],
                detail_transaksi: new FormData,
                detail_transaksis: [],
                aset_mobils: [],
                drivers: [],
                transaksis: [],
                form: {
                    id_transaksi_increment: null,
                    id_driver_increment: null,
                    id_aset_mobil: null,
                    tanggal_waktu_mulaiSewa: null,
                    tanggal_waktu_selesaiSewa: null,
                    tanggal_pengembalian: null,
                    rating_driver: null
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
                    this.detail_transaksi.append("id_transaksi_increment", this.form.id_transaksi_increment);
                    if(this.form.id_driver_increment > 0){
                        this.detail_transaksi.append("id_driver_increment", this.form.id_driver_increment);
                    }else{
                        this.detail_transaksi.append("id_driver_increment", 7);
                    }
                    
                    this.detail_transaksi.append("id_aset_mobil", this.form.id_aset_mobil);
                    this.detail_transaksi.append("tanggal_waktu_mulaiSewa", this.form.tanggal_waktu_mulaiSewa);
                    this.detail_transaksi.append("tanggal_waktu_selesaiSewa", this.form.tanggal_waktu_selesaiSewa);
                    this.detail_transaksi.append("tanggal_pengembalian", this.form.tanggal_pengembalian);
                    if(this.form.rating_driver > 0){
                        this.detail_transaksi.append("rating_driver", this.form.rating_driver);
                    }else
                    {
                        this.detail_transaksi.append("rating_driver", []);
                    }
                   
                    var url = this.$api + "/detail-transaksi";
                    this.load = true;
                    this.$http
                        .post(url, this.detail_transaksi, {
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
                var url = this.$api + "/detail-transaksi";
                this.$http
                    .get(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.detail_transaksis = response.data.data;
                    });
            },
            readDataDriverKosong() {
                var url = this.$api + "/cariDriverSibuk";
                this.$http
                    .get(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.drivers = response.data.data;
                    });
            },
            readDataAsetMobil() {
                var url = this.$api + "/aset-mobil";
                this.$http
                    .get(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.aset_mobils = response.data.data;
                    });
            },
            readDataDriver() {
                var url = this.$api + "/driver";
                this.$http
                    .get(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.drivers = response.data.data;
                    });
            },
            readDataTransaksi() {
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
            update() {
                // var data = new FormData();

                // data.detail_transaksi.append("tanggal_transaksi", this.form.tanggal_transaksi);
                // data.detail_transaksi.append("id_customer_increment", this.form.id_customer_increment);
                // data.detail_transaksi.append("status_dokumen", this.form.status_dokumen);
                // data.transaksi.append("metode_pembayaran", this.form.metode_pembayaran);
                // data.transaksi.append("id_promo", this.form.id_promo);
                // data.transaksi.append("id_pegawai", this.form.id_pegawai);
                
                // if(this.form.id_driver_increment === 7){
                //     data.append("id_driver_increment", 7);
                // }else{
                //     data.append("id_driver_increment", this.form.id_driver_increment);   
                // }
                // data.append("id_transaksi_increment", this.form.id_transaksi_increment);
                // data.append("id_aset_mobil", this.form.id_aset_mobil);
                // data.append("tanggal_waktu_mulaiSewa", this.form.tanggal_waktu_mulaiSewa);
                // data.append("tanggal_waktu_selesaiSewa", this.form.tanggal_waktu_selesaiSewa);
                // data.append("tanggal_pengembalian", this.form.tanggal_pengembalian);
                // data.append("rating_driver", this.form.rating_driver);
            
                let newData = {
                    id_transaksi_increment: this.form.id_transaksi_increment,
                    id_driver_increment: this.form.id_driver_increment,
                    id_aset_mobil: this.form.id_aset_mobil,
                    tanggal_waktu_mulaiSewa: this.form.tanggal_waktu_mulaiSewa,
                    tanggal_waktu_selesaiSewa: this.form.tanggal_waktu_selesaiSewa,
                    tanggal_pengembalian: this.form.tanggal_pengembalian,
                    rating_driver: this.form.rating_driver
                };

                var url = this.$api + "/detail-transaksi/" + this.editId;
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
                var url = this.$api + "/detail-transaksi/" + this.deleteId;
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
            editHandler(detail_transaksi) {
                this.inputType = "Ubah";
                this.editId = detail_transaksi.id_detailTrs_increment;
                this.form.id_transaksi_increment = detail_transaksi.id_transaksi_increment;
                this.form.id_driver_increment = detail_transaksi.id_driver_increment;
                this.form.id_aset_mobil = detail_transaksi.id_aset_mobil;
                this.form.tanggal_waktu_mulaiSewa = detail_transaksi.tanggal_waktu_mulaiSewa;
                this.form.tanggal_waktu_selesaiSewa = detail_transaksi.tanggal_waktu_selesaiSewa;
                this.form.tanggal_pengembalian = detail_transaksi.tanggal_pengembalian;
                this.form.rating_driver = detail_transaksi.rating_driver;

                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.id_detailTrs_increment;
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
                    id_transaksi_increment: null,
                    id_driver_increment: null,
                    id_aset_mobil: null,
                    tanggal_waktu_mulaiSewa: null,
                    tanggal_waktu_selesaiSewa: null,
                    tanggal_pengembalian: null,
                    rating_driver: null
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
            this.readDataAsetMobil();
            // this.readDataDriver();
            this.readDataTransaksi();
            this.readDataDriverKosong();
        },
    };
</script>