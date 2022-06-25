<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">
            Aset Mobil
        </h3>

        <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
            <v-btn
                color="warning"
                dark
                @click="asetMobilKontrak"
                style="margin-left: 6px"
            >
                Kontrak Akan Habis</v-btn
            >
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="aset_mobils"
            :search="search"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="task"
            show-expand
            class="elevation-1"
        >
            <template v-slot:[`item.actions`]="{ item }" class="col-sm">
                <v-card color="#FFFFFF" dark style="margin: 30px" outlined>
                    <v-card-actions>
                        <v-list-item class="grow">
                            <v-btn
                                color="primary"
                                small
                                class="mr-2"
                                @click="editHandler(item)"
                            >
                                <v-icon class="mr-1" color="white">
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                            <v-btn
                                color="error"
                                small
                                @click="deleteHandler(item)"
                            >
                                <v-icon class="mr-1" color="white">
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </v-list-item>
                    </v-card-actions>
                </v-card>
            </template>
            <template v-slot:[`item.foto`]="{ item }">
                <v-img
                    :src="$baseUrl + '/storage/' + item.foto_mobil"
                    height="100px"
                    width="150px"
                    style="
                        object-fit: cover;
                        border-radius: 10%;
                        padding: 25px 0;
                    "
                />
            </template>
        </v-data-table>

        <v-dialog
            v-model="dialog"
            persistent
            width="1000px"
            content-class="elevation-0"
        >
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Aset Mobil</span>
                </v-card-title>
                <v-form ref="form" lazy-validation>
                    <v-card-text>
                        <v-container>
                            <v-text-field
                                v-model="form.plat_nomor_mobil"
                                required
                                filled
                                label="Masukkan Plat Nomor"
                            >
                            </v-text-field>

                            <v-select
                                icon="mdi-clear"
                                clearable
                                :items="pemiliks"
                                v-model="form.id_pemilik_mobil"
                                required
                                filled
                                label="Masukkan Nama Pemilik"
                                item-value="id_pemilik_mobil"
                                item-text="nama_pemilik_mobil"
                            >
                            </v-select>

                            <v-text-field
                                v-model="form.nama_mobil"
                                required
                                filled
                                label="Masukkan Nama Mobil"
                            >
                            </v-text-field>
                            <v-select
                                icon="mdi-clear"
                                clearable
                                filled
                                v-model="form.tipe_mobil"
                                :items="['Sedan', 'City Car', 'SUV', 'MPV']"
                                label="Masukkan Tipe Mobil"
                                required
                            >
                            </v-select>
                            <v-select
                                icon="mdi-clear"
                                clearable
                                filled
                                v-model="form.jenis_transmisi_mobil"
                                :items="['AT', 'MT', 'CVT']"
                                label="Masukkan Jenis Transmisi"
                                required
                            >
                            </v-select>
                            <v-select
                                icon="mdi-clear"
                                clearable
                                filled
                                v-model="form.jenis_bahanbakar_mobil"
                                :items="['Pertamax', 'Pertalite']"
                                label="Masukkan Jenis Bahan Bakar"
                                required
                            >
                            </v-select>
                            <v-text-field
                                filled
                                prefix="L"
                                v-model="form.volume_bahanbakar_mobil"
                                require
                                label="Masukkan Volume Bahan Bakar"
                                type="number"
                            >
                            </v-text-field>
                            <v-text-field
                                filled
                                v-model="form.warna_mobil"
                                required
                                label="Masukkan Warna Mobil"
                            >
                            </v-text-field>
                            <v-text-field
                                filled
                                v-model="form.kapasitas_penumpang_mobil"
                                required
                                label="Masukkan Kapasitas Penumpang"
                                type="number"
                            >
                            </v-text-field>
                            <v-text-field
                                filled
                                v-model="form.fasilitas_mobil"
                                required
                                label="Masukkan Fasilitas Mobil"
                            >
                            </v-text-field>
                            <v-text-field
                                filled
                                v-model="form.nomor_stnk_mobil"
                                required
                                label="Masukkan Nomor STNK Mobil"
                                counter
                            >
                            </v-text-field>
                            <v-text-field
                                prefix="Rp"
                                filled
                                v-model="form.harga_sewa_mobil"
                                required
                                label="Masukkan Harga Sewa Mobil"
                                type="number"
                            >
                            </v-text-field>
                            <v-text-field
                                prefix="L"
                                filled
                                v-model="form.volume_bagasi_mobil"
                                required
                                label="Masukkan Volume Bagasi Mobil"
                                type="number"
                            >
                            </v-text-field>
                            <v-select
                                icon="mdi-clear"
                                clearable
                                filled
                                v-model="form.status_mobil"
                                :items="['Tersedia', 'Sibuk']"
                                label="Masukkan Status Mobil"
                                required
                            >
                            </v-select>
                            <v-file-input
                                filled
                                prepend-icon="mdi-camera"
                                label="Upload Foto Mobil "
                                id="fileFotoMobil"
                                ref="tampilFotoMobil"
                            >
                            </v-file-input>
                        </v-container>
                    </v-card-text>

                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel"
                            >Cancel</v-btn
                        >
                        <v-btn color="blue darken-1" text @click="setForm"
                            >Send</v-btn
                        >
                    </v-card-action>
                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>
                <v-card-text>
                    Anda Yakin ingin menghapus aset mobil ini?
                </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogConfirm = false"
                        >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteData"
                        >Delete</v-btn
                    >
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
            >{{ error_message }}
        </v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "AsetMobilPegawai",
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

            headers: [
                {
                    text: "ID Aset Mobil",
                    align: "start",
                    sortable: true,
                    value: "id_aset_mobil",
                },
                {
                    text: "Plat Nomor",
                    value: "plat_nomor_mobil",
                },
                {
                    text: "Nama Pemilik",
                    value: "nama_pemilik_mobil",
                },
                {
                    text: "Nama Mobil",
                    value: "nama_mobil",
                },
                {
                    text: "Jenis Transmisi",
                    value: "jenis_transmisi_mobil",
                },
                {
                    text: "Jenis Bahan Bakar",
                    value: "jenis_bahanbakar_mobil",
                },
                {
                    text: "Volume Bahan Bakar",
                    value: "volume_bahanbakar_mobil",
                },
                {
                    text: "Warna Mobil",
                    value: "warna_mobil",
                },
                {
                    text: "Kapasitas Penumpang",
                    value: "kapasitas_penumpang_mobil",
                },
                {
                    text: "Fasilitas Mobil",
                    value: "fasilitas_mobil",
                },
                {
                    text: "Nomor STNK Mobil",
                    value: "nomor_stnk_mobil",
                },
                {
                    text: "Harga Sewa Mobil",
                    value: "harga_sewa_mobil",
                },
                {
                    text: "Volume Bagasi Mobil",
                    value: "volume_bagasi_mobil",
                },
                {
                    text: "Status Mobil",
                    value: "status_mobil",
                },
                {
                    text: "Foto Mobil",
                    value: "foto",
                },
                {
                    text: "",
                    value: "actions",
                },
            ],
            aset_mobil: new FormData(),
            aset_mobils: [],
            pemiliks: [],
            form: {
                plat_nomor_mobil: null,
                id_pemilik_mobil: null,
                nama_pemilik_mobil: null,
                nama_mobil: null,
                tipe_mobil: null,
                jenis_transmisi_mobil: null,
                jenis_bahanbakar_mobil: null,
                volume_bahanbakar_mobil: null,
                warna_mobil: null,
                kapasitas_penumpang_mobil: null,
                fasilitas_mobil: null,
                nomor_stnk_mobil: null,
                harga_sewa_mobil: null,
                volume_bagasi_mobil: null,
                status_mobil: null,
                foto_mobil: null,
            },
            deleteId: "",
            editId: "",
        };
    },

    methods: {
        asetMobilKontrak() {
            this.$router.push({
                name: "AsetMobilKontrakHabis",
            });
        },
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
                this.aset_mobil.append(
                    "plat_nomor_mobil",
                    this.form.plat_nomor_mobil
                );
                if (this.form.id_pemilik_mobil > 0) {
                    this.aset_mobil.append(
                        "id_pemilik_mobil",
                        this.form.id_pemilik_mobil
                    );
                } else {
                    this.aset_mobil.append("id_pemilik_mobil", 6);
                }
                this.aset_mobil.append("nama_mobil", this.form.nama_mobil);
                this.aset_mobil.append("tipe_mobil", this.form.tipe_mobil);
                this.aset_mobil.append(
                    "jenis_transmisi_mobil",
                    this.form.jenis_transmisi_mobil
                );
                this.aset_mobil.append(
                    "jenis_bahanbakar_mobil",
                    this.form.jenis_bahanbakar_mobil
                );
                this.aset_mobil.append(
                    "volume_bahanbakar_mobil",
                    this.form.volume_bahanbakar_mobil
                );
                this.aset_mobil.append("warna_mobil", this.form.warna_mobil);
                this.aset_mobil.append(
                    "kapasitas_penumpang_mobil",
                    this.form.kapasitas_penumpang_mobil
                );
                this.aset_mobil.append(
                    "fasilitas_mobil",
                    this.form.fasilitas_mobil
                );
                this.aset_mobil.append(
                    "nomor_stnk_mobil",
                    this.form.nomor_stnk_mobil
                );
                this.aset_mobil.append(
                    "harga_sewa_mobil",
                    this.form.harga_sewa_mobil
                );
                this.aset_mobil.append(
                    "volume_bagasi_mobil",
                    this.form.volume_bagasi_mobil
                );
                this.aset_mobil.append("status_mobil", this.form.status_mobil);

                var uploadFotoMobil = document.getElementById("fileFotoMobil"),
                    dataFotoMobil = uploadFotoMobil.files[0];
                this.aset_mobil.append("foto_mobil", dataFotoMobil);

                var url = this.$api + "/aset-mobil";
                this.load = true;
                this.$http
                    .post(url, this.aset_mobil, {
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

        readDataPemilik() {
            var url = this.$api + "/pemilik-mobil";
            this.$http
                .get(url, {
                    // headers: {
                    //     Authorization: "Bearer " + localStorage.getItem("token"),
                    // },
                })
                .then((response) => {
                    this.pemiliks = response.data.data;
                });
        },
        readDataPemilikNull() {
            var url = this.$api + "/namaPemilik";
            this.$http
                .get(url, {
                    // headers: {
                    //     Authorization: "Bearer " + localStorage.getItem("token"),
                    // },
                })
                .then((response) => {
                    this.pemiliks = response.data.data;
                });
        },
        //ubah data review
        update() {
            // let newData = {
            //     plat_nomor_mobil: this.form.plat_nomor_mobil,
            //     id_pemilik_mobil: this.form.id_pemilik_mobil,
            //     nama_mobil: this.form.nama_mobil,
            //     tipe_mobil: this.form.tipe_mobil,
            //     jenis_transmisi_mobil: this.form.jenis_transmisi_mobil,
            //     jenis_bahanbakar_mobil: this.form.jenis_bahanbakar_mobil,
            //     volume_bahanbakar_mobil: this.form.volume_bahanbakar_mobil,
            //     warna_mobil: this.form.warna_mobil,
            //     kapasitas_penumpang_mobil: this.form.kapasitas_penumpang_mobil,
            //     fasilitas_mobil: this.form.fasilitas_mobil,
            //     nomor_stnk_mobil: this.form.nomor_stnk_mobil,
            //     harga_sewa_mobil: this.form.harga_sewa_mobil,
            //     volume_bagasi_mobil: this.form.volume_bagasi_mobil,
            // };
            var data = new FormData();

            data.append("plat_nomor_mobil", this.form.plat_nomor_mobil);
            if (this.form.id_pemilik_mobil > 0) {
                data.append("id_pemilik_mobil", this.form.id_pemilik_mobil);
            } else {
                data.append("id_pemilik_mobil", 6);
            }
            data.append("nama_mobil", this.form.nama_mobil);
            data.append("tipe_mobil", this.form.tipe_mobil);
            data.append(
                "jenis_transmisi_mobil",
                this.form.jenis_transmisi_mobil
            );
            data.append(
                "jenis_bahanbakar_mobil",
                this.form.jenis_bahanbakar_mobil
            );
            data.append(
                "volume_bahanbakar_mobil",
                this.form.volume_bahanbakar_mobil
            );
            data.append("warna_mobil", this.form.warna_mobil);
            data.append(
                "kapasitas_penumpang_mobil",
                this.form.kapasitas_penumpang_mobil
            );
            data.append("fasilitas_mobil", this.form.fasilitas_mobil);
            data.append("nomor_stnk_mobil", this.form.nomor_stnk_mobil);
            data.append("harga_sewa_mobil", this.form.harga_sewa_mobil);
            data.append("volume_bagasi_mobil", this.form.volume_bagasi_mobil);
            data.append("status_mobil", this.form.status_mobil ?? "");

            var uploadFotoMobil = document.getElementById("fileFotoMobil"),
                dataFotoMobil = uploadFotoMobil.files[0];
            if (dataFotoMobil) {
                data.append("foto_mobil", dataFotoMobil);
            }

            var url = this.$api + "/aset-mobil/" + this.editId;
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
            var url = this.$api + "/aset-mobil/" + this.deleteId;
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
        editHandler(aset_mobil) {
            this.inputType = "Ubah";
            this.editId = aset_mobil.id_aset_mobil;
            this.form.plat_nomor_mobil = aset_mobil.plat_nomor_mobil;
            this.form.id_pemilik_mobil = aset_mobil.id_pemilik_mobil;
            this.form.nama_mobil = aset_mobil.nama_mobil;
            this.form.tipe_mobil = aset_mobil.tipe_mobil;
            this.form.jenis_transmisi_mobil = aset_mobil.jenis_transmisi_mobil;
            this.form.jenis_bahanbakar_mobil =
                aset_mobil.jenis_bahanbakar_mobil;
            this.form.volume_bahanbakar_mobil =
                aset_mobil.volume_bahanbakar_mobil;
            this.form.warna_mobil = aset_mobil.warna_mobil;
            this.form.kapasitas_penumpang_mobil =
                aset_mobil.kapasitas_penumpang_mobil;
            this.form.fasilitas_mobil = aset_mobil.fasilitas_mobil;
            this.form.nomor_stnk_mobil = aset_mobil.nomor_stnk_mobil;
            this.form.harga_sewa_mobil = aset_mobil.harga_sewa_mobil;
            this.form.volume_bagasi_mobil = aset_mobil.volume_bagasi_mobil;
            this.dialog = true;
        },
        deleteHandler(item) {
            this.deleteId = item.id_aset_mobil;
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
                plat_nomor_mobil: null,
                id_pemilik_mobil: null,
                nama_pemilik_mobil: null,
                nama_mobil: null,
                tipe_mobil: null,
                jenis_transmisi_mobil: null,
                jenis_bahanbakar_mobil: null,
                volume_bahanbakar_mobil: null,
                warna_mobil: null,
                kapasitas_penumpang_mobil: null,
                fasilitas_mobil: null,
                nomor_stnk_mobil: null,
                harga_sewa_mobil: null,
                volume_bagasi_mobil: null,
                status_mobil: null,
                foto_mobil: null,
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
        this.readDataPemilik();
        this.readDataPemilikNull();
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
