<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Promo</h3>

        <!-- <v-card> -->
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
            </v-card-title>
        <!-- </v-card> -->


        <v-data-table :headers="headers" :items="promos" :search="search" :single-expand="singleExpand"
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
            <v-card style="margin-top: 150px">
                <v-card-title>
                    <span class="headline">{{ formTitle }} Promo</span>
                </v-card-title>
                <v-form ref="form" lazy-validation>
                    <v-card-text>
                        <v-container>
                            <v-text-field v-model="form.kode_promo" required filled label="Masukkan Kode Promo">
                            </v-text-field>
                            <v-text-field v-model="form.jenis_promo" required filled label="Masukkan Jenis Promo">
                            </v-text-field>
                            <v-textarea filled v-model="form.keterangan_promo" require
                                label="Masukkan Keterangan Promo">
                            </v-textarea>
                            <v-text-field prefix="%" filled v-model="form.diskon" required label="Masukkan Diskon" type="number">
                            </v-text-field>
                            <v-select filled v-model="form.status_promo" :items="['Aktif', 'Tidak Aktif']"
                                label="Masukkan Status Promo" required>
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
                <v-card-text> Anda Yakin ingin menghapus promo ini? </v-card-text>
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
        name: "PromoPegawai",
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
                        text: "ID Promo",
                        align: "start",
                        sortable: true,
                        value: "id_promo",
                    },
                    {
                        text: "Kode Promo",
                        value: "kode_promo",
                    },
                    {
                        text: "Jenis Promo",
                        value: "jenis_promo"
                    },
                    {
                        text: "Keterangan Promo",
                        value: "keterangan_promo"
                    },
                    {
                        text: "Diskon",
                        value: "diskon"
                    },
                    {
                        text: "Status Promo",
                        value: "status_promo"
                    },
                    {
                        text: "",
                        value: "actions"
                    },
                ],
                promo: new FormData,
                promos: [],
                form: {
                    kode_promo: null,
                    jenis_promo: null,
                    keterangan_promo: null,
                    diskon: null,
                    status_promo: null
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
                    this.promo.append("kode_promo", this.form.kode_promo);
                    this.promo.append("jenis_promo", this.form.jenis_promo);
                    this.promo.append("keterangan_promo", this.form.keterangan_promo);
                    this.promo.append("diskon", this.form.diskon);
                    this.promo.append("status_promo", this.form.status_promo);

                    var url = this.$api + "/promo";
                    this.load = true;
                    this.$http
                        .post(url, this.promo, {
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
                var url = this.$api + "/promo";
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
            // readDataPromo() {
            //     var url = this.$api + "/statusPromo";
            //     this.$http
            //         .get(url, {
            //             // headers: {
            //             //     Authorization: "Bearer " + localStorage.getItem("token"),
            //             // },
            //         })
            //         .then((response) => {
            //             this.promos = response.data.data;
            //         });
            // },
            readDataPromoAll() {
                var url = this.$api + "/statusPromoAll";
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
            //ubah data review
            update() {
                let newData = {
                    kode_promo: this.form.kode_promo,
                    jenis_promo: this.form.jenis_promo,
                    keterangan_promo: this.form.keterangan_promo,
                    diskon: this.form.diskon,
                    status_promo: this.form.status_promo
                };

                var url = this.$api + "/promo/" + this.editId;
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
                        this.readDataPromoAll(); // baca data
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
                var url = this.$api + "/promo/" + this.deleteId;
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
                        this.readDataPromoAll(); // baca data
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
            editHandler(promo) {
                this.inputType = "Ubah";
                this.editId = promo.id_promo;
                this.form.kode_promo = promo.kode_promo;
                this.form.jenis_promo = promo.jenis_promo;
                this.form.keterangan_promo = promo.keterangan_promo;
                this.form.diskon = promo.diskon;
                this.form.status_promo = promo.status_promo;
                this.dialog = true;
            },
            deleteHandler(item) {
                this.deleteId = item.id_promo;
                this.dialogConfirm = true;
            },
            close() {
                this.dialog = false;
                this.inputType = "Tambah";
                this.dialogConfirm = false;
                this.readDataPromoAll();
            },
            cancel() {
                this.resetForm();
                this.readDataPromoAll();
                this.dialog = false;
                this.dialogConfirm = false;
                this.inputType = "Tambah";
            },
            resetForm() {
                this.form = {
                    kode_promo: null,
                    jenis_promo: null,
                    keterangan_promo: null,
                    diskon: null,
                    status_promo: null
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
            // this.readDataPromo();
            this.readDataPromoAll();
            
        },
    };

      // save() {
            //     if (this.$refs.form.validate()) {
            //         //cek validasi data yang terkirim
            //         this.load = true;
            //         this.$http.post(this.$api + '/promo', {
            //             kode_promo: this.kode_promo,
            //             jenis_promo: this.jenis_promo,
            //             keterangan_promo: this.keterangan_promo,
            //             diskon: this.diskon,
            //             status_promo: this.status_promo
            //         }).then(response => {
            //             //simpan data id usere yang diinput
            //             this.error_message = response.data.message;
            //             this.color = "green";
            //             this.snackbar = true;
            //             this.load = false;
            //             this.clear();
            //             this.$router.push({
            //                 name: 'Index',
            //             });
            //         }).catch(error => {
            //             this.error_message = error.response.data.message;
            //             this.color = "red";
            //             this.snackbar = true;
            //             this.load = false;
            //         })
            //     }
            // },
</script>
