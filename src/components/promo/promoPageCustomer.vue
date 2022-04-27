<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Promo</h3>

        <!-- <v-card> -->
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
                <!-- <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn> -->
            </v-card-title>
        <!-- </v-card> -->


        <v-data-table :headers="headers" :items="promos" :search="search" :single-expand="singleExpand"
            :expanded.sync="expanded" item-key="task" show-expand class="elevation-1">
            <!-- <template v-slot:[`item.actions`]="{ item }" class="col-sm">
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
            </template> -->
        </v-data-table>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}
        </v-snackbar>
    </v-main>
</template>


<script>
    export default {
        name: "PromoCustomer",
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
            // this.readData();
            // this.readDataPromo();
            this.readDataPromoAll();
            
        },
    };
</script>
