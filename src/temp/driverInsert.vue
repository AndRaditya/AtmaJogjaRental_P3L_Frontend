<template>
  <v-main class="list" style="margin-top: 550px; margin-bottom: 40px">
    <v-container fluid fill-height class="posisinya">
      <v-layout flex align-center justify-center>
        <v-flex sm12 sm4 elevation-6>
          <v-card>
            <h1
              style="
                padding-top: 50px;
                font-family: Anton, sans-serif;
                font-size: 35px !important;
              "
            >
              Registrasi Driver
            </h1>

            <img
              src="../Images/AJR_logo.png"
              style="width: 130px; height: 130px; margin-bottom: 25px"
            />
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Nama Lengkap</strong
                      >
                    </p>
                    <v-text-field
                      v-model="nama_driver"
                      :rules="namaDriverRules"
                      required
                      filled
                      label="Masukkan Nama Lengkap"
                    ></v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important">E-Mail</strong>
                    </p>
                    <v-text-field
                      v-model="email_driver"
                      :rules="emailDriverRules"
                      required
                      filled
                      label="Masukkan E-Mail"
                      type="email"
                    ></v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Nomor Telepon</strong
                      >
                    </p>
                    <v-text-field
                      filled
                      v-model="nomor_telepon_driver"
                      :rules="noTelpDriverRules"
                      required
                      label="Masukkan Nomor Telepon"
                    >
                    </v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important">Alamat</strong>
                    </p>
                    <v-text-field
                      filled
                      v-model="alamat_driver"
                      :rules="alamatDriverRules"
                      required
                      label="Masukkan Alamat"
                      height="50px"
                      full-width
                      single-line
                    >
                    </v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Tanggal Lahir</strong
                      >
                    </p>
                    <!-- <date-picker v-model="tanggal_lahir_driver" valueType="format">
                                        </date-picker> -->
                    <v-text-field
                      filled
                      v-model="tanggal_lahir_driver"
                      :rules="tglLahirDriverRules"
                      required
                      label="Masukkan Tanggal Lahir"
                      type="date"
                    >
                    </v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Jenis Kelamin</strong
                      >
                    </p>
                    <v-text-field
                      filled
                      v-model="jenis_kelamin_driver"
                      :rules="jenisKelaminDriverRules"
                      required
                      label="Masukkan Jenis Kelamin"
                    >
                    </v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Bahasa Driver</strong
                      >
                    </p>
                    <v-text-field
                      filled
                      v-model="bahasa_driver"
                      label="Masukkan Bahasa Driver"
                      :rules="bahasaDriverRules"
                      required
                    >
                    </v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Foto Driver</strong
                      >
                    </p>
                    <input type="file" @change="onFileSelected" />
                    <!-- <button @click="onUpload">Upload</button> -->
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Tarif Driver Harian</strong
                      >
                    </p>
                    <v-text-field
                      filled
                      v-model="tarif_driver_harian"
                      label="Masukkan Tarif Driver"
                      :rules="tarifDriverRules"
                      required
                    >
                    </v-text-field>
                  </div>

                  <div class="mb3">
                    <p class="text-start" style="margin-bottom: 5px">
                      <strong style="font-size: 15px !important"
                        >Password Driver</strong
                      >
                    </p>
                    <v-text-field
                      filled
                      v-model="password_driver"
                      label="Masukkan Password Driver"
                      :rules="passwordDriverRules"
                      required
                      type="password"
                    >
                    </v-text-field>
                  </div>

                  <v-layout justify-center>
                    <v-btn
                      class="btn btn-primary d-block w-100 white--text"
                      @click="submit"
                      style="background: #ff7d00; margin-right: 8px"
                      name="register"
                    >
                      Register
                    </v-btn>
                  </v-layout>

                  <v-layout justify-center style="margin-top: 20px">
                    <v-btn @click="clear" class="grey darken-3 white--text"
                      >Clear</v-btn
                    >
                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>

          <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
            >{{ error_message }}
          </v-snackbar>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Jolly%20Lodger");

.posisinya {
  position: absolute;
  margin-top: 20px;
  left: 0;
  right: 0;
}
</style>

<script>
export default {
  name: "Driver",
  data() {
    return {
      selectedFile: null,
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      nama_driver: "",
      namaDriverRules: [(v) => !!v || "Nama Lengkap tidak boleh kosong"],
      email_driver: "",
      emailDriverRules: [(v) => !!v || "E-Mail tidak boleh kosong"],
      alamat_driver: "",
      alamatDriverRules: [(v) => !!v || "Alamat tidak boleh kosong"],
      nomor_telepon_driver: "",
      noTelpDriverRules: [(v) => !!v || "Nomor Telepon tidak boleh kosong"],
      tanggal_lahir_driver: null,
      jenis_kelamin_driver: "",
      jenisKelaminDriverRules: [
        (v) => !!v || "Jenis Kelamin tidak boleh kosong",
      ],
      bahasa_driver: "",
      bahasaDriverRules: [(v) => !!v || "Bahasa tidak boleh kosong"],
      tarif_driver_harian: "",
      tarifDriverRules: [(v) => !!v || "Bahasa tidak boleh kosong"],
      password_driver: "",
      passwordDriverRules: [(v) => !!v || "Bahasa tidak boleh kosong"],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //cek validasi data yang terkirim
        this.load = true;
        this.$http
          .post(this.$api + "/driver", {
            nama_driver: this.nama_driver,
            nomor_telepon_driver: this.nomor_telepon_driver,
            alamat_driver: this.alamat_driver,
            email_driver: this.email_driver,
            jenis_kelamin_driver: this.jenis_kelamin_driver,
            bahasa_driver: this.bahasa_driver,
            foto_driver: this.foto_driver,
            tarif_driver_harian: this.tarif_driver_harian,
            password_driver: this.password_driver,
          })
          .then((response) => {
            //simpan data id usere yang diinput
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.clear();
            this.$router.push({
              name: "Index",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    login() {
      this.$router.push({
        name: "Login",
      });
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    // onUpload(){

    // }
  },
};
</script>
