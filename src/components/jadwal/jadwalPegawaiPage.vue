<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Jadwal Pegawai</h3>

        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
        </v-card-title>

        <v-data-table :headers="headers" :items="jadwals" :search="search" :single-expand="singleExpand"
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
                    <span class="headline">{{ formTitle }} Jadwal Pegawai</span>
                </v-card-title>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-text>
                        <v-container>
                            <!-- <v-text-field v-model="form.id_jadwal" required filled
                                label="Masukkan ID Jadwal (Hari - Sesi)">
                            </v-text-field> -->
                            <v-select filled v-model="form.hari_shift" :items="['Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']"
                                label="Masukkan Waktu Shift" required>
                            </v-select>
                            <v-select filled v-model="form.waktu_shift" :items="['08:00:00', '15:00:00']"
                                label="Masukkan Waktu Shift" required>
                            </v-select>
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
        name: "JadwalPegawai",
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
                        value: "id_jadwal_increment",
                    },
                    {
                        text: "ID Jadwal",
                        value: "id_jadwal",
                    },
                    {
                        text: "Hari Shift",
                        value: "hari_shift",
                    },
                    {
                        text: "Waktu Shift",
                        value: "waktu_shift",
                    },
                    {
                        text: "",
                        value: "actions"
                    },
                ],
                jadwal: new FormData,
                jadwals: [],
                form: {
                    id_jadwal: null,
                    hari_shift: null,
                    waktu_shift: null
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
            save() {
                {
                    // this.jadwal.append("id_jadwal", this.form.id_jadwal);
                    this.jadwal.append("hari_shift", this.form.hari_shift);
                    this.jadwal.append("waktu_shift", this.form.waktu_shift);

                    var url = this.$api + "/jadwal-pegawai";
                    this.load = true;
                    this.$http
                        .post(url, this.jadwal, {
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
                    // id_jadwal: this.form.id_jadwal,
                    hari_shift: this.form.hari_shift,
                    waktu_shift: this.form.waktu_shift,
                };

                var url = this.$api + "/jadwal-pegawai/" + this.editId;
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
                var url = this.$api + "/jadwal-pegawai/" + this.deleteId;
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
            editHandler(jadwal) {
                this.inputType = "Ubah";
                this.editId = jadwal.id_jadwal_increment;
                // this.form.id_jadwal = jadwal.id_jadwal;
                this.form.hari_shift = jadwal.hari_shift;
                this.form.waktu_shift = jadwal.waktu_shift;
                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.id_jadwal_increment;
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
                    id_jadwal: null,
                    hari_shift: null,
                    waktu_shift: null
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