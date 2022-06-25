<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">
            Brosur Mobil
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
        </v-card-title>

        <!-- <v-data-table :headers="headers" :items="aset_mobils" :search="search" :single-expand="singleExpand"
            :expanded.sync="expanded" item-key="task" show-expand class="elevation-1">
        </v-data-table> -->
        <!-- <div class="column" id="halamanUtama">
            <div class="container" v-for='(item,index) in aset_mobils' :key="index">
                <v-card id="cardContent">
                    <div class="row" id="pembungkusContent">
                        <div class="col-sm-6">
                            <v-img :src="previewImageUrl == '' ? $baseUrl+'/storage/'+item.foto_mobil : previewImageUrl"
                                style="border-radius: 5px" id="previewImage"></v-img>
                        </div>
                        <div class="col-sm-4" id="isiCard">
                            <v-text>{{item.nama_mobil}}</v-text>
                            <v-text>{{item.tipe_mobil}}</v-text>
                            <v-text>{{item.jenis_transmisi_mobil}}</v-text>
                            <v-text>{{item.jenis_bahanbakar_mobil}}</v-text>
                            <v-text>{{item.warna_mobil}}</v-text>
                            <v-text>{{item.volume_bagasi_mobil}} L</v-text>
                            <v-text>{{item.fasilitas_mobil}}</v-text>
                        </div>
                    </div>
                </v-card>
            </div>
        </div> -->

        <template>
            <div class="container">
                <v-card
                    :loading="loading"
                    class="mx-auto my-12"
                    max-width="500px"
                    v-for="(item, index) in aset_mobils"
                    :key="index"
                >
                    <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                        ></v-progress-linear>
                    </template>

                    <v-img
                        :src="
                            previewImageUrl == ''
                                ? $baseUrl + '/storage/' + item.foto_mobil
                                : previewImageUrl
                        "
                        style="border-radius: 5px"
                        id="previewImage"
                    ></v-img>

                    <v-card-title style="font-size: 24px">{{
                        item.nama_mobil
                    }}</v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <div class="col">
                            <v-text>Nama Mobil: {{ item.tipe_mobil }}</v-text>
                            <v-text
                                >Transmisi:
                                {{ item.jenis_transmisi_mobil }}</v-text
                            >
                            <v-text
                                >Bahan Bakar:
                                {{ item.jenis_bahanbakar_mobil }}</v-text
                            >
                            <v-text>Warna: {{ item.warna_mobil }}</v-text>
                            <v-text
                                >Volume Bagasi:
                                {{ item.volume_bagasi_mobil }} L</v-text
                            >
                            <v-text
                                >Fasilitas: {{ item.fasilitas_mobil }}</v-text
                            >
                            <v-text
                                >Harga Sewa: Rp.{{
                                    item.harga_sewa_mobil
                                }}</v-text
                            >
                            <v-text>Status: {{ item.status_mobil }}</v-text>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
        </template>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
            >{{ error_message }}
        </v-snackbar>
    </v-main>
</template>

<style>
.col {
    display: flex;
    flex-direction: column;
    align-items: left;
    font-size: 16px;
    padding: 6px;
}

v-text {
    padding: 4px;
}

.container {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>

<script>
export default {
    name: "AsetMobilCustomer",
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
            previewImageUrl: "",
            singleExpand: false,

            headers: [
                {
                    text: "ID Aset Mobil",
                    align: "start",
                    sortable: true,
                    value: "id_aset_mobil",
                },
                {
                    text: "Nama Mobil",
                    value: "nama_mobil",
                },
                {
                    text: "Tipe Mobil",
                    value: "tipe_mobil",
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
                    text: "Harga Sewa Mobil",
                    value: "harga_sewa_mobil",
                },
                {
                    text: "Volume Bagasi Mobil",
                    value: "volume_bagasi_mobil",
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
                foto_mobil: null,
                status_mobil: null,
            },
            deleteId: "",
            editId: "",
        };
    },

    methods: {
        onPreviewimage(e) {
            this.previewImageUrl = URL.createObjectURL(e);
        },
        //read data reviews
        readData() {
            var url = this.$api + "/mobilTersedia";
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
        this.readDataPemilikNull();
    },
};
</script>
