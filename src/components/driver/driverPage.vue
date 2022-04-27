<template>
    <v-main class="list">
        <h3 class="text-h3" font-weight-medium mb-5 style="margin-top: 150px">Driver</h3>

        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="success" dark @click="dialog = true"> Tambah</v-btn>
        </v-card-title>

        <v-data-table :headers="headers" :items="drivers" :search="search" :single-expand="singleExpand"
            :expanded.sync="expanded" item-key="task" show-expand class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }" class="col-sm">
                <v-card color="#FFFFFF" dark max-width="850" style="margin: 30px" shaped outlined>
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

        <v-dialog v-model="dialog" persistent width="1000px" content-class="elevation-0"
            style="overflow-y: auto; max-height: calc(100vh - 210px);">
            <v-card style="margin-top: 200px">
                <v-card-title>
                    <span class="headline">{{ formTitle }} Driver</span>
                </v-card-title>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-text>
                        <v-container>
                            <v-text-field v-model="form.nama_driver" required filled label="Masukkan Nama Lengkap">
                            </v-text-field>
                            <v-text-field v-model="form.email_driver" required filled label="Masukkan E-Mail"
                                type="email">
                            </v-text-field>
                            <v-text-field filled v-model="form.nomor_telepon_driver" required
                                label="Masukkan Nomor Telepon" type="number" counter="13">
                            </v-text-field>
                            <v-textarea filled v-model="form.alamat_driver" required label="Masukkan Alamat">
                            </v-textarea>
                            <v-text-field filled v-model="form.tanggal_lahir_driver" required
                                label="Masukkan Tanggal Lahir" type="date">
                            </v-text-field>
                            <!-- <v-text-field filled v-model="form.jenis_kelamin_driver" required
                                label="Masukkan Jenis Kelamin">
                            </v-text-field> -->
                            <v-select filled v-model="form.jenis_kelamin_driver" :items="['Laki-laki', 'Perempuan']"
                                label="Masukkan Jenis Kelamin" required>
                            </v-select>

                            <v-file-input filled prepend-icon="mdi-camera" label="Upload Foto Driver" id="fileDriver"
                                ref="fileFotoDriver">
                            </v-file-input>

                            <!-- <v-text-field filled v-model="form.bahasa_driver" label="Masukkan Bahasa Driver" required>
                            </v-text-field> -->
                            <v-select filled v-model="form.bahasa_driver" :items="['Indonesia', 'Indonesia, English']"
                                label="Masukkan Bahasa Driver" required>
                            </v-select>

                            <v-select filled v-model="form.status_driver" :items="['Tersedia', 'Sibuk']"
                                label="Masukkan Status Driver" required>
                            </v-select>

                            <v-text-field prefix="Rp" filled v-model="form.tarif_driver_harian"
                                label="Masukkan Tarif Driver" required type="number">
                            </v-text-field>

                            <v-file-input filled prepend-icon="mdi-camera" label="Upload Foto SIM" id="fileSIMDriver"
                                ref="tampilSIMDriver">
                            </v-file-input>
                            <v-file-input filled prepend-icon="mdi-camera" label="Upload Surat Bebas Napza"
                                id="fileSuratNapzaDriver" ref="tampilNapzaDriver">
                            </v-file-input>
                            <v-file-input filled prepend-icon="mdi-camera" label="Upload Surat Kesehatan Jiwa"
                                id="fileSuratJiwaDriver" ref="tampilSuratJiwaDriver">
                            </v-file-input>
                            <v-file-input filled prepend-icon="mdi-camera" label="Upload Surat Kesehatan Jasmani"
                                id="fileSuratJasmaniDriver" ref="tampilSuratJasmaniDriver">
                            </v-file-input>
                            <v-file-input filled prepend-icon="mdi-camera"
                                label="Upload Surat Keterangan Catatan Kepolisian (SKCK) " id="fileSKCKDriver"
                                ref="tampilSKCKDriver">
                            </v-file-input>

                            <v-text-field v-model="form.password_driver" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]"
                                :type="show1 ? 'text' : 'password'" name="input-10-1" counter
                                @click:append="show1 = !show1" label="Masukkan Password" filled>
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
                <v-card-text> Anda Yakin ingin menghapus driver ini? </v-card-text>
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
        name: "DriverPegawai",
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
                show1: false,
                rules: {
                    required: value => !!value || 'Required.',
                },

                headers: [{
                        text: "ID Driver",
                        align: "start",
                        sortable: true,
                        value: "id_driver",
                    },
                    {
                        text: "Nama Driver",
                        value: "nama_driver",
                    },
                    {
                        text: "Email Driver",
                        value: "email_driver"
                    },
                    {
                        text: "Nomor Telepon Driver",
                        value: "nomor_telepon_driver"
                    },
                    {
                        text: "Alamat Driver",
                        value: "alamat_driver"
                    },
                    {
                        text: "Tanggal Lahir Driver",
                        value: "tanggal_lahir_driver"
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
                var url = this.$api + "/cariDriver";
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
            save() {
                {
                    this.driver.append("nama_driver", this.form.nama_driver);
                    this.driver.append("email_driver", this.form.email_driver);
                    this.driver.append("nomor_telepon_driver", this.form.nomor_telepon_driver);
                    this.driver.append("alamat_driver", this.form.alamat_driver);
                    this.driver.append("tanggal_lahir_driver", this.form.tanggal_lahir_driver);
                    this.driver.append("jenis_kelamin_driver", this.form.jenis_kelamin_driver);
                    this.driver.append("bahasa_driver", this.form.bahasa_driver);
                    this.driver.append("status_driver", this.form.status_driver);
                    var uploadFoto = document.getElementById('fileDriver'),
                        dataFileFoto = uploadFoto.files[0];
                    this.driver.append('foto_driver', dataFileFoto);
                    this.driver.append("tarif_driver_harian", this.form.tarif_driver_harian);
                    this.driver.append("password_driver", this.form.password_driver);

                    var uploadSIMDriver = document.getElementById('fileSIMDriver'),
                        dataFileSIM = uploadSIMDriver.files[0];
                    this.driver.append('foto_sim', dataFileSIM);

                    var uploadSuratNapza = document.getElementById('fileSuratNapzaDriver'),
                        dataFileSuratNapza = uploadSuratNapza.files[0];
                    this.driver.append('surat_napza', dataFileSuratNapza);

                    var uploadSuratJiwa = document.getElementById('fileSuratJiwaDriver'),
                        dataFileSuratJiwa = uploadSuratJiwa.files[0];
                    this.driver.append('surat_kesehatan_jiwa', dataFileSuratJiwa);

                    var uploadSuratJasmani = document.getElementById('fileSuratJasmaniDriver'),
                        dataFileSuratJasmani = uploadSuratJasmani.files[0];
                    this.driver.append('surat_kesehatan_jasmani', dataFileSuratJasmani);

                    var uploadSKCK = document.getElementById('fileSKCKDriver'),
                        dataFileSKCK = uploadSKCK.files[0];
                    this.driver.append('skck', dataFileSKCK);

                    var url = this.$api + "/driver";
                    this.load = true;
                    this.$http
                        .post(url, this.driver, {
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
                            this.readDataDriverKosong(); // baca data
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
                // else{
                //     foto = '';
                // }
                // var uploadFoto = document.getElementById('fileDriver'),
                //     dataFileFoto = uploadFoto.files[0];

                // if (dataFileFoto) {
                //     foto = dataFileFoto;
                //     // data.append("foto_driver",dataFileFoto);
                // }

                // let newData = {
                //     nama_driver: this.form.nama_driver,
                //     email_driver: this.form.email_driver,
                //     nomor_telepon_driver: this.form.nomor_telepon_driver,
                //     alamat_driver: this.form.alamat_driver,
                //     tanggal_lahir_driver: this.form.tanggal_lahir_driver,
                //     jenis_kelamin_driver: this.form.jenis_kelamin_driver,
                //     bahasa_driver: this.form.bahasa_driver,
                //     tarif_driver_harian: this.form.tarif_driver_harian,
                //     password_driver: this.form.password_driver,
                //     foto_driver: uploadFoto.files[0],
                // };

                var data = new FormData();
                data.append("nama_driver", this.form.nama_driver);
                data.append("email_driver", this.form.email_driver);
                data.append("nomor_telepon_driver", this.form.nomor_telepon_driver);
                data.append("alamat_driver", this.form.alamat_driver);
                data.append("tanggal_lahir_driver", this.form.tanggal_lahir_driver);
                data.append("jenis_kelamin_driver", this.form.jenis_kelamin_driver);
                data.append("bahasa_driver", this.form.bahasa_driver);
                data.append("status_driver", this.form.status_driver);
                data.append("tarif_driver_harian", this.form.tarif_driver_harian);
                data.append("password_driver", this.form.password_driver);
                var uploadFoto = document.getElementById('fileDriver'),
                    dataFileFoto = uploadFoto.files[0];
                if (dataFileFoto) {
                    data.append("foto_driver", dataFileFoto);
                }

                var uploadSIMDriver = document.getElementById('fileSIMDriver'),
                    dataFileSIM = uploadSIMDriver.files[0];
                if (dataFileSIM) {
                   data.append("foto_sim", dataFileSIM);
                }

                var uploadSuratNapza = document.getElementById('fileSuratNapzaDriver'),
                    dataFileSuratNapza = uploadSuratNapza.files[0];
                if (dataFileSuratNapza) {
                    data.append("surat_napza", dataFileSuratNapza);
                }

                var uploadSuratJiwa = document.getElementById('fileSuratJiwaDriver'),
                    dataFileSuratJiwa = uploadSuratJiwa.files[0];
                if (dataFileSuratJiwa) {
                    data.append("surat_kesehatan_jiwa", dataFileSuratJiwa);
                }

                var uploadSuratJasmani = document.getElementById('fileSuratJasmaniDriver'),
                    dataFileSuratJasmani = uploadSuratJasmani.files[0];
                if (dataFileSuratJasmani) {
                    data.append("surat_kesehatan_jasmani", dataFileSuratJasmani);
                }
                
                var uploadSKCK = document.getElementById('fileSKCKDriver'),
                    dataFileSKCK = uploadSKCK.files[0];
                if (dataFileSKCK) {
                    data.append("skck", dataFileSKCK);
                }

                var url = this.$api + "/driver/" + this.editId;
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
                        this.readDataDriverKosong(); // baca data
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
                var url = this.$api + "/driver/" + this.deleteId;
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
                        this.readDataDriverKosong(); // baca data
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
            editHandler(driver) {
                this.inputType = "Ubah";
                this.editId = driver.id_driver_increment;
                this.form.nama_driver = driver.nama_driver;
                this.form.email_driver = driver.email_driver;
                this.form.nomor_telepon_driver = driver.nomor_telepon_driver;
                this.form.alamat_driver = driver.alamat_driver;
                this.form.status_driver = driver.status_driver;
                this.form.tanggal_lahir_driver = driver.tanggal_lahir_driver;
                this.form.jenis_kelamin_driver = driver.jenis_kelamin_driver;
                this.form.bahasa_driver = driver.bahasa_driver;
                this.form.foto_driver = driver.foto_driver;
                this.form.tarif_driver_harian = driver.tarif_driver_harian;
                // this.form.password_driver = driver.password_driver;
                this.dialog = true;
            },
            deleteHandler(item) {
                this.editId = item.id_driver_increment;
                this.dialogConfirm = true;
            },
            close() {
                this.dialog = false;
                this.inputType = "Tambah";
                this.dialogConfirm = false;
                this.readDataDriverKosong();
            },
            cancel() {
                this.resetForm();
                this.readDataDriverKosong();
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