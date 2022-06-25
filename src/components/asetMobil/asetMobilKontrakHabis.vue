<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">
            Aset Mobil
        </h3>
        <h5 class="text-h5" font-weight-medium mb-5 style="margin-top: 16px">
            Kontrak akan Habis
        </h5>

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
            <template v-slot:[`item.foto`]="{ item }">
                <v-img
                    :src="$baseUrl + '/storage/' + item.foto_mobil"
                    height="100px"
                    width="200px"
                    style="
                        object-fit: cover;
                        border-radius: 10%;
                        padding: 25px 0;
                    "
                />
            </template>
        </v-data-table>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
            >{{ error_message }}
        </v-snackbar>
    </v-main>
</template>

<script>
export default {
    name: "AsetMobilKontrakHabis",
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
                    text: "Periode Kontrak Akhir",
                    value: "periode_kontrak_akhir_mobil",
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
            pemilik: [],
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
        promoCustomer() {
            this.$router.push({
                name: "PromoCustomer",
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

        //read data reviews
        readData() {
            var url = this.$api + "/cariKontrak";
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

        // readDataPemilik() {
        //     var url = this.$api + "/pemilik-mobil";
        //     this.$http
        //         .get(url, {
        //             // headers: {
        //             //     Authorization: "Bearer " + localStorage.getItem("token"),
        //             // },
        //         })
        //         .then((response) => {
        //             this.pemiliks = response.data.data;
        //         });
        // },
        // readDataPemilikNull() {
        //     var url = this.$api + "/namaPemilik";
        //     this.$http
        //         .get(url, {
        //             // headers: {
        //             //     Authorization: "Bearer " + localStorage.getItem("token"),
        //             // },
        //         })
        //         .then((response) => {
        //             this.pemiliks = response.data.data;
        //         });
        // },

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
        // this.readDataPemilik();
        // this.readDataPemilikNull();
    },
};
</script>
