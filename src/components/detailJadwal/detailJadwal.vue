<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Detail Jadwal</h3>

        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
        </v-card-title>

        <v-data-table :headers="headers" :items="detail_jadwals" :search="search" :single-expand="singleExpand"
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
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Detail Jadwal</span>
                </v-card-title>
                <v-form ref="form" lazy-validation>
                    <v-card-text>
                        <v-container>
                            <v-select :items="pegawais" v-model="form.id_pegawai" required filled
                                label="Masukkan Nama Pegawai" item-value="id_pegawai"
                                item-text="nama_pegawai">
                            </v-select>

                            <v-select :items="jadwals" v-model="form.id_jadwal_increment" required filled
                                label="Masukkan ID Jadwal" item-value="id_jadwal_increment"
                                item-text="id_jadwal">
                            </v-select>

                            <v-text-field v-model="form.keterangan_jadwal" required filled label="Masukkan Keterangan Jadwal">
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
                <v-card-text> Anda Yakin ingin menghapus detail jadwal ini? </v-card-text>
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
        name: "DetailJadwalPegawai",
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
                        text: "No Detail Jadwal",
                        align: "start",
                        sortable: true,
                        value: "id_detail_jadwal",
                    },
                    {
                        text: "Nama Pegawai",
                        value: "nama_pegawai",
                    },
                    {
                        text: "ID Jadwal",
                        value: "id_jadwal"
                    },
                    {
                        text: "",
                        value: "actions"
                    },
                ],
                detail_jadwal: new FormData,
                detail_jadwals: [],
                pegawais: [],
                jadwals: [],
                form: {
                    id_pegawai: null,
                    nama_pegawai: null,
                    id_jadwal_increment: null,
                    id_jadwal: null,
                    keterangan_jadwal: null
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
                    this.detail_jadwal.append("id_pegawai", this.form.id_pegawai);
                    this.detail_jadwal.append("id_jadwal_increment", this.form.id_jadwal_increment);
                    this.detail_jadwal.append("keterangan_jadwal", this.form.keterangan_jadwal);

                    var url = this.$api + "/detail-jadwal";
                    this.load = true;
                    this.$http
                        .post(url, this.detail_jadwal, {
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
                var url = this.$api + "/detail-jadwal";
                this.$http
                    .get(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.detail_jadwals = response.data.data;
                    });
            },

            readDataJadwal() {
                var url = this.$api + "/jadwal-pegawai";
                this.$http
                    .get(url, {
                        // headers: {
                        //     Authorization: "Bearer " + localStorage.getItem("token"),
                        // },
                    })
                    .then((response) => {
                        this.jadwals = response.data.data;
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

            //ubah data review
            update() {
                let newData = {
                    keterangan_jadwal: this.form.keterangan_jadwal,
                };

                var url = this.$api + "/detail-jadwal/" + this.editId;
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
                var url = this.$api + "/detail-jadwal/" + this.deleteId;
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
            editHandler(detail_jadwal) {
                this.inputType = "Ubah";
                this.editId = detail_jadwal.id_detail_jadwal;
                this.form.id_jadwal_increment = detail_jadwal.id_jadwal_increment;
                this.form.id_pegawai = detail_jadwal.id_pegawai;
                this.form.keterangan_jadwal = detail_jadwal.keterangan_jadwal;
                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.id_detail_jadwal;
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
                    id_pegawai: null,
                    nama_pegawai: null,
                    id_jadwal_increment: null,
                    id_jadwal: null,
                    keterangan_jadwal: null
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
            this.readDataJadwal();
            this.readDataPegawai();
        },
    };
</script>