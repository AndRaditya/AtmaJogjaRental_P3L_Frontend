<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Driver</h3>

        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
        </v-card-title>

        <v-data-table :headers="headers" :items="drivers" :search="search" :single-expand="singleExpand"
            :expanded.sync="expanded" item-key="task" show-expand class="elevation-1">
        </v-data-table>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}
        </v-snackbar>
    </v-main>
</template>


<script>
    export default {
        name: "DriverCustomer",
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
                        text: "Nama Driver",
                        value: "nama_driver",
                    },
                    {
                        text: "Jenis Kelamin Driver",
                        value: "jenis_kelamin_driver"
                    },
                    {
                        text: "Bahasa Driver",
                        value: "bahasa_driver"
                    },
                    {
                        text: "Status Driver",
                        value: "status_driver"
                    },
                    {
                        text: "Tarif Driver Harian",
                        value: "tarif_driver_harian"
                    },
                    {
                        text: "",
                        value: "actions"
                    },
                ],
                driver: new FormData(),
                drivers: [],
                form: {
                    nama_driver: null,
                    email_driver: null,
                    nomor_telepon_driver: null,
                    alamat_driver: null,
                    tanggal_lahir_driver: null,
                    jenis_kelamin_driver: null,
                    foto_driver: null,
                    bahasa_driver: null,
                    tarif_driver_harian: null,
                    password_driver: null,
                    status_driver: null,
                    foto_sim: null,
                    surat_napza: null,
                    surat_kesehatan_jiwa: null,
                    surat_kesehatan_jasmani: null,
                    skck: null
                },
                deleteId: "",
                editId: "",
            };
        },

        methods: {
            //read data reviews
            readData() {
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
                    nama_driver: null,
                    email_driver: null,
                    nomor_telepon_driver: null,
                    alamat_driver: null,
                    tanggal_lahir_driver: null,
                    jenis_kelamin_driver: null,
                    foto_driver: null,
                    bahasa_driver: null,
                    tarif_driver_harian: null,
                    password_driver: null,
                    status_driver: null
                };
            },
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            // this.readData();
            this.readDataDriverKosong();
        },
    };
</script>