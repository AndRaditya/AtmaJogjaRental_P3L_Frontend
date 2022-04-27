<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Jabatan Pegawai</h3>

        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
        </v-card-title>

        <v-data-table :headers="headers" :items="jabatans" :search="search" :single-expand="singleExpand"
            :expanded.sync="expanded" item-key="task" show-expand class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }" class="col-sm">
                <v-card color="#FFFFFF" dark  style="margin: 30px" outlined>
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
                    <span class="headline">{{ formTitle }} Jabatan Pegawai</span>
                </v-card-title>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-text>
                        <v-container>
                            <v-text-field v-model="form.nama_jabatan" required filled
                                label="Masukkan Nama Jabatan">
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
                <v-card-text> Anda Yakin ingin menghapus jabatan ini? </v-card-text>
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
        name: "JabatanPegawai",
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
                        text: "ID Jabatan Pegawai",
                        align: "start",
                        sortable: true,
                        value: "id_jabatan",
                    },
                    {
                        text: "Nama Jabatan",
                        value: "nama_jabatan",
                    },
                    {
                        text: "",
                        value: "actions"
                    },
                ],
                jabatan: new FormData,
                jabatans: [],
                form: {
                    nama_jabatan: null
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
            save() {
                {
                    this.jabatan.append("nama_jabatan", this.form.nama_jabatan);

                    var url = this.$api + "/jabatan-pegawai";
                    this.load = true;
                    this.$http
                        .post(url, this.jabatan, {
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
            //ubah data review
            update() {
                let newData = {
                    nama_jabatan: this.form.nama_jabatan
                };

                var url = this.$api + "/jabatan-pegawai/" + this.editId;
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
                var url = this.$api + "/jabatan-pegawai/" + this.deleteId;
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
            editHandler(jabatan) {
                this.inputType = "Ubah";
                this.editId = jabatan.id_jabatan;
                this.form.nama_jabatan = jabatan.nama_jabatan;
                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.id_jabatan;
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
                    nama_jabatan: null
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